"use client"

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Row, Col, Typography, Input, Table as AntTable, Tag, Button, Spin, Empty, Modal, Tabs, message } from 'antd';
import { 
  Database, Table as TableIcon, Key, Link2, Search, FileText, Layers, 
  RefreshCw, Code2, Users, ShoppingBag, Building2, Boxes, Cpu, GitFork, 
  ChevronRight, Copy, Check, ArrowRight, Network, ArrowLeft, Sparkles, Bot,
  Truck, Video, Megaphone, Wallet, Wrench, Share2, HeartHandshake, Smartphone, Server, ShieldCheck, TrendingUp
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const { Title, Text } = Typography;

interface ColumnDef {
  name: string;
  type: string;
  key?: string; // 'PK' | 'FK' | ''
  nullable: boolean;
  desc: string;
}

interface TableSchema {
  id: string;
  name: string;
  domain: string;
  domainLabel: string;
  purpose: string;
  relations: string[];
  columns: ColumnDef[];
}

const SCHEMA_CATALOG: TableSchema[] = [
  // 1. SALES DOMAIN
  {
    id: 'orders',
    name: 'orders',
    domain: 'sales',
    domainLabel: 'POS & Sales Domain',
    purpose: 'Master tabel transaksi utama dari POS Kasir maupun pesanan aplikasi mobile.',
    relations: ['branches.id (FK)', 'members.member_code (FK)', 'order_items.order_id (1:N)', 'esb_payments_ledger.order_id (1:1)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Internal unique row identifier' },
      { name: 'order_id', type: 'varchar(50)', key: 'UK', nullable: false, desc: 'Nomor struk transaksi unik POS' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Referensi cabang tempat transaksi terjadi' },
      { name: 'member_code', type: 'varchar(50)', key: 'FK', nullable: true, desc: 'Kode member pembeli (jika pelanggan terdaftar)' },
      { name: 'order_type_name', type: 'varchar(50)', nullable: false, desc: 'Tipe pesanan (Dine In, Takeaway, Drive Thru, Online)' },
      { name: 'subtotal', type: 'numeric(15,2)', nullable: false, desc: 'Total harga sebelum diskon & pajak' },
      { name: 'total_discount', type: 'numeric(15,2)', nullable: false, desc: 'Total potongan harga kupon / promo' },
      { name: 'total_payment', type: 'numeric(15,2)', nullable: false, desc: 'Nilai akhir yang dibayar konsumen' },
      { name: 'payment_method', type: 'varchar(50)', nullable: false, desc: 'Metode bayar (QRIS, Debit, Cash, E-Wallet)' },
      { name: 'payment_status', type: 'varchar(30)', nullable: false, desc: 'Status pembayaran (Paid, Pending, Refunded)' },
      { name: 'status', type: 'varchar(30)', nullable: false, desc: 'Status dapur (Completed, Preparing, Cancelled)' },
      { name: 'transaction_date', type: 'timestamptz', nullable: false, desc: 'Waktu aktual terjadinya transaksi' },
    ]
  },
  {
    id: 'order_items',
    name: 'order_items',
    domain: 'sales',
    domainLabel: 'POS & Sales Domain',
    purpose: 'Rincian item produk yang dibeli dalam satu nomor struk pesanan.',
    relations: ['orders.order_id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Internal item identifier' },
      { name: 'order_id', type: 'varchar(50)', key: 'FK', nullable: false, desc: 'Nomor struk induk pesanan' },
      { name: 'menu_name', type: 'varchar(100)', nullable: false, desc: 'Nama menu kopi / minuman / roti' },
      { name: 'menu_price', type: 'numeric(15,2)', nullable: false, desc: 'Harga satuan item saat dipesan' },
      { name: 'menu_qty', type: 'int4', nullable: false, desc: 'Jumlah porsi pesanan' },
      { name: 'menu_subtotal', type: 'numeric(15,2)', nullable: false, desc: 'Total harga per baris menu (price * qty)' },
    ]
  },
  {
    id: 'esb_payments_ledger',
    name: 'esb_payments_ledger',
    domain: 'sales',
    domainLabel: 'POS & Sales Domain',
    purpose: 'Buku besar pencatatan settlement gerbang pembayaran & rekonsiliasi bank.',
    relations: ['orders.order_id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Unique ledger ID' },
      { name: 'order_id', type: 'varchar(50)', key: 'FK', nullable: false, desc: 'Nomor struk terkait' },
      { name: 'gateway_ref', type: 'varchar(100)', nullable: true, desc: 'Nomor referensi dari Midtrans/Xendit/QRIS' },
      { name: 'amount_settled', type: 'numeric(15,2)', nullable: false, desc: 'Nilai bersih yang masuk ke rekening perusahaan' },
      { name: 'mdr_fee', type: 'numeric(15,2)', nullable: false, desc: 'Potongan biaya MDR bank / payment gateway' },
      { name: 'settled_at', type: 'timestamptz', nullable: true, desc: 'Waktu pencairan dana ke bank' },
    ]
  },
  {
    id: 'esb_voids_refunds',
    name: 'esb_voids_refunds',
    domain: 'sales',
    domainLabel: 'POS & Sales Domain',
    purpose: 'Audit log pembatalan transaksi (void) dan pengembalian uang (refund).',
    relations: ['orders.order_id (FK)', 'esb_shifts.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Refund record identifier' },
      { name: 'order_id', type: 'varchar(50)', key: 'FK', nullable: false, desc: 'Nomor struk yang dibatalkan' },
      { name: 'authorized_by', type: 'varchar(100)', nullable: false, desc: 'Supervisor yang menyetujui void/refund' },
      { name: 'reason', type: 'text', nullable: false, desc: 'Alasan pembatalan (salah input, barang habis, keluhan)' },
      { name: 'refund_amount', type: 'numeric(15,2)', nullable: false, desc: 'Total dana yang dikembalikan' },
      { name: 'created_at', type: 'timestamptz', nullable: false, desc: 'Waktu pencatatan void' },
    ]
  },
  {
    id: 'esb_taxes_and_service',
    name: 'esb_taxes_and_service',
    domain: 'sales',
    domainLabel: 'POS & Sales Domain',
    purpose: 'Akumulasi pungutan Pajak Restoran (PB1 10%) dan Service Charge per pesanan.',
    relations: ['orders.order_id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Tax ledger ID' },
      { name: 'order_id', type: 'varchar(50)', key: 'FK', nullable: false, desc: 'Nomor struk pesanan' },
      { name: 'pb1_amount', type: 'numeric(15,2)', nullable: false, desc: 'Pajak restoran 10% untuk Pemda' },
      { name: 'service_charge', type: 'numeric(15,2)', nullable: false, desc: 'Biaya layanan (jika berlaku)' },
      { name: 'recorded_at', type: 'timestamptz', nullable: false, desc: 'Waktu kalkulasi pajak' },
    ]
  },

  // 2. CUSTOMER DOMAIN
  {
    id: 'members',
    name: 'members',
    domain: 'customer',
    domainLabel: 'Customer & Loyalty Domain',
    purpose: 'Database profil konsumen, tingkatan keanggotaan (Tier), dan saldo poin.',
    relations: ['orders.member_code (1:N)', 'esb_point_transactions.member_code (1:N)', 'customer_complaints.member_id (1:N)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Unique member UUID' },
      { name: 'member_code', type: 'varchar(50)', key: 'UK', nullable: false, desc: 'Kode barcode member Kopi Calf' },
      { name: 'member_name', type: 'varchar(100)', nullable: false, desc: 'Nama lengkap pelanggan' },
      { name: 'phone', type: 'varchar(25)', nullable: false, desc: 'Nomor WhatsApp terdaftar' },
      { name: 'member_tier', type: 'varchar(30)', nullable: false, desc: 'Tingkatan loyalitas (Silver, Gold, Calf VIP)' },
      { name: 'member_points', type: 'int4', nullable: false, desc: 'Saldo poin yang bisa ditukar kupon' },
      { name: 'total_spent', type: 'numeric(15,2)', nullable: false, desc: 'Customer Lifetime Value (LTV / total belanja)' },
      { name: 'total_transactions', type: 'int4', nullable: false, desc: 'Frekuensi kunjungan beli' },
      { name: 'registered_date', type: 'timestamptz', nullable: false, desc: 'Tanggal bergabung menjadi member' },
    ]
  },
  {
    id: 'esb_point_transactions',
    name: 'esb_point_transactions',
    domain: 'customer',
    domainLabel: 'Customer & Loyalty Domain',
    purpose: 'Catatan mutasi penambahan (earning) maupun pengurangan (redeem) poin loyalitas.',
    relations: ['members.member_code (FK)', 'orders.order_id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Mutation ID' },
      { name: 'member_code', type: 'varchar(50)', key: 'FK', nullable: false, desc: 'Kode member terkait' },
      { name: 'order_id', type: 'varchar(50)', key: 'FK', nullable: true, desc: 'Nomor struk yang menghasilkan poin' },
      { name: 'point_change', type: 'int4', nullable: false, desc: 'Nilai poin (+ atau -)' },
      { name: 'description', type: 'varchar(200)', nullable: false, desc: 'Keterangan (e.g. Pembelian struk #123 atau Tukar Kopi Gratis)' },
      { name: 'created_at', type: 'timestamptz', nullable: false, desc: 'Waktu mutasi poin' },
    ]
  },
  {
    id: 'esb_vouchers',
    name: 'esb_vouchers',
    domain: 'customer',
    domainLabel: 'Customer & Loyalty Domain',
    purpose: 'Master data kupon diskon digital dan syarat ketentuan penggunaannya.',
    relations: ['orders.order_id (N:1)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Voucher UUID' },
      { name: 'voucher_code', type: 'varchar(50)', key: 'UK', nullable: false, desc: 'Kode promo (e.g. CALFKITAGIL)' },
      { name: 'discount_type', type: 'varchar(30)', nullable: false, desc: 'Tipe diskon (Percentage atau Fixed Amount)' },
      { name: 'discount_value', type: 'numeric(15,2)', nullable: false, desc: 'Besaran potongan diskon' },
      { name: 'min_purchase', type: 'numeric(15,2)', nullable: false, desc: 'Syarat minimal belanja' },
      { name: 'valid_until', type: 'timestamptz', nullable: false, desc: 'Masa kadaluarsa voucher' },
    ]
  },
  {
    id: 'esb_referrals',
    name: 'esb_referrals',
    domain: 'customer',
    domainLabel: 'Customer & Loyalty Domain',
    purpose: 'Pelacakan program ajak teman (Referral) dan klaim bonus akuisisi member.',
    relations: ['members.member_code (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Referral log ID' },
      { name: 'referrer_code', type: 'varchar(50)', key: 'FK', nullable: false, desc: 'Kode member pengajak' },
      { name: 'referred_phone', type: 'varchar(25)', nullable: false, desc: 'Nomor telepon teman yang diajak' },
      { name: 'status', type: 'varchar(30)', nullable: false, desc: 'Status klaim (Pending, Qualified, Rewarded)' },
      { name: 'created_at', type: 'timestamptz', nullable: false, desc: 'Waktu undangan dikirim' },
    ]
  },
  {
    id: 'customer_complaints',
    name: 'customer_complaints',
    domain: 'customer',
    domainLabel: 'Customer & Loyalty Domain',
    purpose: 'Pusat penampungan keluhan konsumen dari outlet, WhatsApp, maupun ulasan.',
    relations: ['branches.id (FK)', 'members.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Complaint ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Cabang yang dikeluhkan' },
      { name: 'member_id', type: 'uuid', key: 'FK', nullable: true, desc: 'Pelanggan pelapor' },
      { name: 'issue_category', type: 'varchar(50)', nullable: false, desc: 'Kategori (Rasa Kopi, Pelayanan Lama, Kebersihan)' },
      { name: 'complaint_text', type: 'text', nullable: false, desc: 'Deskripsi detail keluhan konsumen' },
      { name: 'resolution_status', type: 'varchar(30)', nullable: false, desc: 'Status penanganan (Open, Investigating, Resolved)' },
      { name: 'created_at', type: 'timestamptz', nullable: false, desc: 'Waktu masuknya laporan' },
    ]
  },

  // 3. OPERATIONS DOMAIN
  {
    id: 'branches',
    name: 'branches',
    domain: 'operations',
    domainLabel: 'Branch & Operations Domain',
    purpose: 'Master data seluruh cabang kedai kopi dan milkbar Kopi Calf.',
    relations: ['orders.branch_id (1:N)', 'inventories.branch_id (1:N)', 'branch_infrastructures.branch_id (1:1)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Branch unique ID' },
      { name: 'branch_code', type: 'varchar(20)', key: 'UK', nullable: false, desc: 'Kode cabang (e.g. CLF-KG)' },
      { name: 'branch_name', type: 'varchar(100)', nullable: false, desc: 'Nama resmi cabang (e.g. Calf Kelapa Gading)' },
      { name: 'city', type: 'varchar(50)', nullable: false, desc: 'Kota lokasi cabang' },
      { name: 'address', type: 'text', nullable: false, desc: 'Alamat lengkap cabang' },
      { name: 'is_drive_thru', type: 'bool', nullable: false, desc: 'Fasilitas jalur Drive Thru tersedia' },
      { name: 'status', type: 'varchar(30)', nullable: false, desc: 'Status operasional (Active, Renovating, Closed)' },
    ]
  },
  {
    id: 'branch_infrastructures',
    name: 'branch_infrastructures',
    domain: 'operations',
    domainLabel: 'Branch & Operations Domain',
    purpose: 'Pemantauan status perangkat keras keras fisik di cabang (CCTV, Internet, Mesin Kopi).',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Asset identifier' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Cabang pemilik aset' },
      { name: 'cctv_status', type: 'varchar(30)', nullable: false, desc: 'Kondisi NVR / CCTV (Online, Offline, Recording Error)' },
      { name: 'internet_speed_mbps', type: 'numeric(8,2)', nullable: false, desc: 'Kecepatan bandwidth aktual router cabang' },
      { name: 'coffee_machine_health', type: 'int4', nullable: false, desc: 'Skor kesehatan mesin espresso (0-100)' },
      { name: 'last_ping', type: 'timestamptz', nullable: false, desc: 'Waktu heartbeat monitoring terakhir' },
    ]
  },
  {
    id: 'esb_shifts',
    name: 'esb_shifts',
    domain: 'operations',
    domainLabel: 'Branch & Operations Domain',
    purpose: 'Pencatatan pergantian shift kasir, modal awal kas, dan setoran akhir (cash drawer).',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Shift log ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Lokasi cabang' },
      { name: 'cashier_name', type: 'varchar(100)', nullable: false, desc: 'Nama kru kasir yang bertugas' },
      { name: 'starting_cash', type: 'numeric(15,2)', nullable: false, desc: 'Uang modal kembalian di laci kas' },
      { name: 'ending_cash_actual', type: 'numeric(15,2)', nullable: true, desc: 'Total uang tunai hasil hitung tutup shift' },
      { name: 'shift_start', type: 'timestamptz', nullable: false, desc: 'Jam buka shift' },
      { name: 'shift_end', type: 'timestamptz', nullable: true, desc: 'Jam tutup shift' },
    ]
  },
  {
    id: 'esb_attendances',
    name: 'esb_attendances',
    domain: 'operations',
    domainLabel: 'Branch & Operations Domain',
    purpose: 'Log absensi kehadiran barista dan kru outlet dengan validasi GPS.',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Attendance ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Cabang tempat absen' },
      { name: 'employee_name', type: 'varchar(100)', nullable: false, desc: 'Nama karyawan' },
      { name: 'clock_in_time', type: 'timestamptz', nullable: false, desc: 'Waktu absensi masuk' },
      { name: 'clock_out_time', type: 'timestamptz', nullable: true, desc: 'Waktu absensi pulang' },
      { name: 'status', type: 'varchar(30)', nullable: false, desc: 'Status absensi (On Time, Late, Absent)' },
    ]
  },
  {
    id: 'esb_kitchen_tickets',
    name: 'esb_kitchen_tickets',
    domain: 'operations',
    domainLabel: 'Branch & Operations Domain',
    purpose: 'Antrean tiket pesanan di Kitchen Display System (KDS) bar barista.',
    relations: ['orders.order_id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Kitchen ticket UUID' },
      { name: 'order_id', type: 'varchar(50)', key: 'FK', nullable: false, desc: 'Nomor struk terkait' },
      { name: 'ticket_number', type: 'varchar(20)', nullable: false, desc: 'Nomor antrean ambil pesanan' },
      { name: 'prep_time_seconds', type: 'int4', nullable: true, desc: 'Durasi pembuatan minuman (detik)' },
      { name: 'completed_at', type: 'timestamptz', nullable: true, desc: 'Waktu pesanan selesai dibuat' },
    ]
  },
  {
    id: 'esb_delivery_tracking',
    name: 'esb_delivery_tracking',
    domain: 'operations',
    domainLabel: 'Branch & Operations Domain',
    purpose: 'Pelacakan kurir pengiriman pesanan online langsung ke rumah pelanggan.',
    relations: ['orders.order_id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Delivery UUID' },
      { name: 'order_id', type: 'varchar(50)', key: 'FK', nullable: false, desc: 'Nomor struk pesanan' },
      { name: 'courier_name', type: 'varchar(100)', nullable: false, desc: 'Nama pengemudi kurir' },
      { name: 'tracking_status', type: 'varchar(50)', nullable: false, desc: 'Status kurir (Picked Up, On The Way, Delivered)' },
      { name: 'est_arrival', type: 'timestamptz', nullable: true, desc: 'Estimasi waktu sampai' },
    ]
  },

  // 4. INVENTORY DOMAIN
  {
    id: 'inventories',
    name: 'inventories',
    domain: 'inventory',
    domainLabel: 'Supply Chain & Inventory Domain',
    purpose: 'Master stok bahan baku (biji kopi, susu segar, sirup, gelas cup) per cabang.',
    relations: ['branches.id (FK)', 'esb_recipes.inventory_id (1:N)', 'esb_stock_adjustments.inventory_id (1:N)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Inventory item ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Cabang penyimpan stok' },
      { name: 'item_code', type: 'varchar(50)', key: 'UK', nullable: false, desc: 'SKU bahan baku (e.g. RM-MILK-1L)' },
      { name: 'item_name', type: 'varchar(100)', nullable: false, desc: 'Nama bahan baku (e.g. Susu Greenfields 1L)' },
      { name: 'stock_qty', type: 'numeric(15,3)', nullable: false, desc: 'Sisa kuantitas fisik di gudang cabang' },
      { name: 'unit', type: 'varchar(20)', nullable: false, desc: 'Satuan hitung (Liter, Kg, Pcs, Bottle)' },
      { name: 'min_stock_level', type: 'numeric(15,3)', nullable: false, desc: 'Batas pemesanan ulang otomatis (Reorder Point)' },
      { name: 'last_updated', type: 'timestamptz', nullable: false, desc: 'Waktu mutasi stok terakhir' },
    ]
  },
  {
    id: 'esb_recipes',
    name: 'esb_recipes',
    domain: 'inventory',
    domainLabel: 'Supply Chain & Inventory Domain',
    purpose: 'Bill of Materials (BOM) pemetaan pemakaian bahan baku per porsi menu.',
    relations: ['inventories.id (FK)', 'order_items.menu_name (N:1)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Recipe line ID' },
      { name: 'menu_name', type: 'varchar(100)', nullable: false, desc: 'Nama menu jadi (e.g. Kopi Susu Aren)' },
      { name: 'inventory_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Bahan baku yang dipotong' },
      { name: 'qty_required', type: 'numeric(10,4)', nullable: false, desc: 'Takaran konsumsi per porsi (e.g. 0.18 Liter Susu)' },
      { name: 'waste_tolerance_pct', type: 'numeric(5,2)', nullable: false, desc: 'Toleransi tumpah / penyusutan standar' },
    ]
  },
  {
    id: 'esb_suppliers',
    name: 'esb_suppliers',
    domain: 'inventory',
    domainLabel: 'Supply Chain & Inventory Domain',
    purpose: 'Database rekanan distributor pemasok biji kopi dan bahan logistik.',
    relations: ['esb_purchase_orders.supplier_id (1:N)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Supplier UUID' },
      { name: 'supplier_name', type: 'varchar(100)', nullable: false, desc: 'Nama perusahaan pemasok' },
      { name: 'contact_person', type: 'varchar(100)', nullable: false, desc: 'Nama PIC marketing supplier' },
      { name: 'payment_terms', type: 'varchar(50)', nullable: false, desc: 'Termin bayar (COD, Net 14, Net 30)' },
      { name: 'lead_time_days', type: 'int4', nullable: false, desc: 'Rata-rata pengiriman barang sampai' },
    ]
  },
  {
    id: 'esb_purchase_orders',
    name: 'esb_purchase_orders',
    domain: 'inventory',
    domainLabel: 'Supply Chain & Inventory Domain',
    purpose: 'Surat pesanan pembelian barang (PO) dari central kitchen ke supplier.',
    relations: ['esb_suppliers.id (FK)', 'branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'PO identifier' },
      { name: 'po_number', type: 'varchar(50)', key: 'UK', nullable: false, desc: 'Nomor dokumen PO resmi' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Cabang tujuan pengiriman logistik' },
      { name: 'supplier_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Pemasok tujuan pesanan' },
      { name: 'total_cost', type: 'numeric(15,2)', nullable: false, desc: 'Total tagihan pembelian' },
      { name: 'delivery_status', type: 'varchar(30)', nullable: false, desc: 'Status kirim (Ordered, In Transit, Received)' },
      { name: 'created_at', type: 'timestamptz', nullable: false, desc: 'Tanggal pembuatan PO' },
    ]
  },
  {
    id: 'esb_stock_adjustments',
    name: 'esb_stock_adjustments',
    domain: 'inventory',
    domainLabel: 'Supply Chain & Inventory Domain',
    purpose: 'Pencatatan stock opname, barang rusak (spoilage), atau susu basi (waste).',
    relations: ['inventories.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Adjustment UUID' },
      { name: 'inventory_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Item bahan baku yang disesuaikan' },
      { name: 'qty_adjusted', type: 'numeric(15,3)', nullable: false, desc: 'Selisih angka opname (+ atau -)' },
      { name: 'reason', type: 'varchar(100)', nullable: false, desc: 'Keterangan (Opname Rutin, Susu Pecah, Expired)' },
      { name: 'reported_by', type: 'varchar(100)', nullable: false, desc: 'Barista pelapor opname' },
      { name: 'created_at', type: 'timestamptz', nullable: false, desc: 'Waktu pelaporan opname' },
    ]
  },

  // 5. INTELLIGENCE DOMAIN
  {
    id: 'risk_alerts',
    name: 'risk_alerts',
    domain: 'intelligence',
    domainLabel: 'Intelligence & Corporate Domain',
    purpose: 'Deteksi otomatis anomali operasional, keterlambatan servis, atau risiko fraud.',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Alert identifier' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Cabang sumber risiko' },
      { name: 'risk_level', type: 'varchar(20)', nullable: false, desc: 'Tingkat keparahan (Critical, High, Medium)' },
      { name: 'title', type: 'varchar(150)', nullable: false, desc: 'Judul peringatan singkat' },
      { name: 'description', type: 'text', nullable: false, desc: 'Rincian insiden pemantauan' },
      { name: 'is_resolved', type: 'bool', nullable: false, desc: 'Status penanganan manajer' },
      { name: 'created_at', type: 'timestamptz', nullable: false, desc: 'Waktu kejadian sistem' },
    ]
  },
  {
    id: 'ai_insights',
    name: 'ai_insights',
    domain: 'intelligence',
    domainLabel: 'Intelligence & Corporate Domain',
    purpose: 'Rekomendasi strategis hasil analisis Machine Learning & prediksi tren kopi.',
    relations: [],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Insight UUID' },
      { name: 'category', type: 'varchar(50)', nullable: false, desc: 'Kategori insight (Sales Forecast, Menu Engineering)' },
      { name: 'insight_title', type: 'varchar(150)', nullable: false, desc: 'Kesimpulan rekomendasi AI' },
      { name: 'recommendation', type: 'text', nullable: false, desc: 'Langkah taktis yang disarankan untuk manajemen' },
      { name: 'confidence_score', type: 'numeric(5,2)', nullable: false, desc: 'Tingkat keyakinan model AI (0-100%)' },
      { name: 'created_at', type: 'timestamptz', nullable: false, desc: 'Waktu kalkulasi AI' },
    ]
  },
  {
    id: 'social_sentiments',
    name: 'social_sentiments',
    domain: 'intelligence',
    domainLabel: 'Intelligence & Corporate Domain',
    purpose: 'Hasil crawling ulasan Google Maps, TikTok, dan Instagram tentang Kopi Calf.',
    relations: [],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Social record ID' },
      { name: 'platform', type: 'varchar(50)', nullable: false, desc: 'Sumber platform (Google Review, Instagram, TikTok)' },
      { name: 'author', type: 'varchar(100)', nullable: false, desc: 'Akun warganet pengulas' },
      { name: 'sentiment', type: 'varchar(20)', nullable: false, desc: 'Klasifikasi sentimen (Positive, Neutral, Negative)' },
      { name: 'content', type: 'text', nullable: false, desc: 'Isi komentar / ulasan publik' },
      { name: 'post_date', type: 'timestamptz', nullable: false, desc: 'Tanggal unggahan ulasan' },
    ]
  },
  {
    id: 'expansion_proposals',
    name: 'expansion_proposals',
    domain: 'intelligence',
    domainLabel: 'Intelligence & Corporate Domain',
    purpose: 'Penyimpanan kelayakan studi calon lokasi ruko / lahan cabang baru.',
    relations: [],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Proposal ID' },
      { name: 'location_name', type: 'varchar(150)', nullable: false, desc: 'Nama calon lokasi (e.g. BSD Raya Utama)' },
      { name: 'est_capex', type: 'numeric(15,2)', nullable: false, desc: 'Perkiraan modal investasi renovasi & mesin' },
      { name: 'projected_roi_months', type: 'int4', nullable: false, desc: 'Projeksi balik modal (BEP bulan)' },
      { name: 'status', type: 'varchar(30)', nullable: false, desc: 'Status pengajuan (Under Review, Approved, Rejected)' },
      { name: 'created_at', type: 'timestamptz', nullable: false, desc: 'Tanggal pengajuan proposal' },
    ]
  },
  {
    id: 'esb_campaigns',
    name: 'esb_campaigns',
    domain: 'intelligence',
    domainLabel: 'Intelligence & Corporate Domain',
    purpose: 'Master data kampanye promosi pemasaran dan pelacakan anggaran iklan.',
    relations: [],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Campaign ID' },
      { name: 'campaign_name', type: 'varchar(150)', nullable: false, desc: 'Nama program promo' },
      { name: 'channel', type: 'varchar(50)', nullable: false, desc: 'Kanal promosi (Instagram Ads, GrabFood Banner)' },
      { name: 'budget_allocated', type: 'numeric(15,2)', nullable: false, desc: 'Alokasi dana kampanye' },
      { name: 'start_date', type: 'timestamptz', nullable: false, desc: 'Jadwal mulai kampanye' },
      { name: 'end_date', type: 'timestamptz', nullable: false, desc: 'Jadwal berakhir kampanye' },
    ]
  },
  {
    id: 'staff_attendance',
    name: 'staff_attendance',
    domain: 'hr',
    domainLabel: 'HR Data Pillar',
    purpose: 'Pencatatan presensi kehadiran harian dan keterlambatan barista/staf outlet.',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Attendance ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'ID Cabang Calf' },
      { name: 'staff_name', type: 'varchar(100)', nullable: false, desc: 'Nama lengkap karyawan' },
      { name: 'clock_in', type: 'timestamptz', nullable: false, desc: 'Waktu masuk kerja' },
      { name: 'clock_out', type: 'timestamptz', nullable: true, desc: 'Waktu pulang kerja' },
      { name: 'status', type: 'varchar(20)', nullable: false, desc: 'Status (On-Time, Late, Absent)' }
    ]
  },
  {
    id: 'barista_performance',
    name: 'barista_performance',
    domain: 'hr',
    domainLabel: 'HR Data Pillar',
    purpose: 'Metrik kecepatan penyajian kopi dan skor kepuasan pelanggan per barista.',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Performance Log ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'ID Cabang' },
      { name: 'barista_name', type: 'varchar(100)', nullable: false, desc: 'Nama Barista' },
      { name: 'avg_brew_time_sec', type: 'int4', nullable: false, desc: 'Rata-rata waktu pembuatan minuman (detik)' },
      { name: 'customer_rating', type: 'numeric(3,2)', nullable: false, desc: 'Skor rating pesanan (1.00 - 5.00)' }
    ]
  },
  {
    id: 'outlet_assets',
    name: 'outlet_assets',
    domain: 'asset',
    domainLabel: 'Asset Data Pillar',
    purpose: 'Registrasi aset mesin espresso, grinder, chiller, dan genset di setiap cabang.',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Asset ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Penempatan cabang' },
      { name: 'asset_name', type: 'varchar(150)', nullable: false, desc: 'Nama mesin (e.g. La Marzocco Linea PB)' },
      { name: 'serial_number', type: 'varchar(80)', nullable: false, desc: 'Nomor seri pabrik' },
      { name: 'condition', type: 'varchar(30)', nullable: false, desc: 'Kondisi (Excellent, Good, Needs Service, Broken)' }
    ]
  },
  {
    id: 'asset_maintenance_logs',
    name: 'asset_maintenance_logs',
    domain: 'asset',
    domainLabel: 'Asset Data Pillar',
    purpose: 'Riwayat servis rutin kalibrasi mesin kopi dan pembersihan chiller.',
    relations: ['outlet_assets.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Maintenance Log ID' },
      { name: 'asset_id', type: 'uuid', key: 'FK', nullable: false, desc: 'ID Aset Mesin' },
      { name: 'service_date', type: 'date', nullable: false, desc: 'Tanggal pelaksanaan servis' },
      { name: 'technician_notes', type: 'text', nullable: true, desc: 'Catatan teknisi servis' },
      { name: 'cost', type: 'numeric(12,2)', nullable: false, desc: 'Biaya perbaikan/servis' }
    ]
  },
  {
    id: 'general_ledger',
    name: 'general_ledger',
    domain: 'finance',
    domainLabel: 'Finance Data Pillar',
    purpose: 'Jurnal akuntansi pusat pembukuan arus kas masuk dan keluar seluruh ekosistem.',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Ledger Entry ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: true, desc: 'ID Cabang terkait (null jika HQ)' },
      { name: 'account_code', type: 'varchar(20)', nullable: false, desc: 'Kode Akun COA (e.g. 40100 Revenue POS)' },
      { name: 'debit', type: 'numeric(15,2)', nullable: false, desc: 'Nominal Debit' },
      { name: 'credit', type: 'numeric(15,2)', nullable: false, desc: 'Nominal Kredit' },
      { name: 'transaction_date', type: 'timestamptz', nullable: false, desc: 'Waktu pembukuan' }
    ]
  },
  {
    id: 'daily_cash_expenses',
    name: 'daily_cash_expenses',
    domain: 'finance',
    domainLabel: 'Finance Data Pillar',
    purpose: 'Pencatatan pengeluaran kas kecil (*Petty Cash*) harian operasional outlet.',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Expense ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Cabang pelapor' },
      { name: 'category', type: 'varchar(60)', nullable: false, desc: 'Kategori (Es Batu, Esensial Dapur, Parkir, Listrik)' },
      { name: 'amount', type: 'numeric(12,2)', nullable: false, desc: 'Jumlah pengeluaran' },
      { name: 'expense_date', type: 'date', nullable: false, desc: 'Tanggal pengeluaran' }
    ]
  },
  {
    id: 'delivery_vehicles',
    name: 'delivery_vehicles',
    domain: 'vehicle',
    domainLabel: 'Vehicle Data Pillar',
    purpose: 'Daftar armada mobil box pengirim susu/beans dan motor operasional cabang.',
    relations: [],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Vehicle ID' },
      { name: 'license_plate', type: 'varchar(20)', nullable: false, desc: 'Plat nomor kendaraan (e.g. B 9182 VLA)' },
      { name: 'vehicle_type', type: 'varchar(50)', nullable: false, desc: 'Tipe (Gran Max Refrigerator Box, Honda Vario)' },
      { name: 'last_service_km', type: 'int4', nullable: false, desc: 'Kilometer servis terakhir' }
    ]
  },
  {
    id: 'fleet_delivery_trips',
    name: 'fleet_delivery_trips',
    domain: 'vehicle',
    domainLabel: 'Vehicle Data Pillar',
    purpose: 'Log perjalanan pengiriman pasokan bahan baku dari Central Kitchen ke outlet.',
    relations: ['delivery_vehicles.id (FK)', 'branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Trip ID' },
      { name: 'vehicle_id', type: 'uuid', key: 'FK', nullable: false, desc: 'ID Armada Kendaraan' },
      { name: 'destination_branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Cabang tujuan pengiriman' },
      { name: 'dispatch_time', type: 'timestamptz', nullable: false, desc: 'Waktu berangkat dari HQ' },
      { name: 'arrive_time', type: 'timestamptz', nullable: true, desc: 'Waktu tiba di outlet' }
    ]
  },
  {
    id: 'promo_campaign_rules',
    name: 'promo_campaign_rules',
    domain: 'marketing',
    domainLabel: 'Marketing Data Pillar',
    purpose: 'Aturan diskon voucher promo bundling minuman dan potongan harga.',
    relations: [],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Promo Rule ID' },
      { name: 'promo_code', type: 'varchar(40)', nullable: false, desc: 'Kode promo voucher (e.g. CALFFRIDAY50)' },
      { name: 'discount_percent', type: 'int4', nullable: false, desc: 'Persentase diskon' },
      { name: 'max_deduction', type: 'numeric(10,2)', nullable: false, desc: 'Maksimum potongan harga' },
      { name: 'min_order_amount', type: 'numeric(12,2)', nullable: false, desc: 'Minimum belanja' }
    ]
  },
  {
    id: 'voucher_redemption_logs',
    name: 'voucher_redemption_logs',
    domain: 'marketing',
    domainLabel: 'Marketing Data Pillar',
    purpose: 'Pelacakan riwayat pemakaian kupon diskon oleh pelanggan saat transaksi POS.',
    relations: ['promo_campaign_rules.id (FK)', 'members.id (FK)', 'orders.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Redemption ID' },
      { name: 'promo_id', type: 'uuid', key: 'FK', nullable: false, desc: 'ID Aturan Promo' },
      { name: 'member_id', type: 'uuid', key: 'FK', nullable: true, desc: 'ID Member Pelanggan' },
      { name: 'order_id', type: 'uuid', key: 'FK', nullable: false, desc: 'ID Transaksi Order' },
      { name: 'redeemed_at', type: 'timestamptz', nullable: false, desc: 'Waktu klaim voucher' }
    ]
  },
  {
    id: 'cctv_vision_analytics',
    name: 'cctv_vision_analytics',
    domain: 'cctv',
    domainLabel: 'CCTV Data Pillar',
    purpose: 'Data analitik video AI dari pemantauan keamanan dan antrean pengunjung di gerai.',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'CCTV Log ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'ID Cabang' },
      { name: 'camera_zone', type: 'varchar(60)', nullable: false, desc: 'Zona kamera (Cashier Queue, Pick-up Counter, Outdoor)' },
      { name: 'detected_footfall_hourly', type: 'int4', nullable: false, desc: 'Jumlah manusia terdeteksi dalam 1 jam' },
      { name: 'avg_wait_time_sec', type: 'int4', nullable: false, desc: 'Estimasi rata-rata waktu tunggu antrean (detik)' }
    ]
  },
  {
    id: 'store_crowd_density_logs',
    name: 'store_crowd_density_logs',
    domain: 'cctv',
    domainLabel: 'CCTV Data Pillar',
    purpose: 'Metrik kepadatan keramaian ruang duduk gerai secara real-time untuk rekomendasi AI.',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Crowd Metric ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'ID Cabang' },
      { name: 'occupancy_rate_percent', type: 'int4', nullable: false, desc: 'Persentase keterisian meja/kursi gerai' },
      { name: 'timestamp', type: 'timestamptz', nullable: false, desc: 'Waktu pencatatan keramaian' }
    ]
  },
  {
    id: 'social_media_mentions',
    name: 'social_media_mentions',
    domain: 'social',
    domainLabel: 'Social Media Data Pillar',
    purpose: 'Hasil crawling AI terhadap sebutan (*mentions*) brand Calf di TikTok, Instagram, dan X.',
    relations: [],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Mention ID' },
      { name: 'platform', type: 'varchar(40)', nullable: false, desc: 'Platform media sosial (TikTok, Instagram, X)' },
      { name: 'author_username', type: 'varchar(100)', nullable: false, desc: 'Username kreator/user' },
      { name: 'sentiment_score', type: 'numeric(3,2)', nullable: false, desc: 'Skor sentimen AI (-1.00 Negatif s.d. +1.00 Positif)' },
      { name: 'caption_snippet', type: 'text', nullable: false, desc: 'Cuplikan teks unggahan' }
    ]
  },
  {
    id: 'outlet_google_reviews',
    name: 'outlet_google_reviews',
    domain: 'social',
    domainLabel: 'Social Media Data Pillar',
    purpose: 'Sinkronisasi ulasan dan bintang penilaian ulasan Google Maps di setiap cabang.',
    relations: ['branches.id (FK)'],
    columns: [
      { name: 'id', type: 'uuid', key: 'PK', nullable: false, desc: 'Review ID' },
      { name: 'branch_id', type: 'uuid', key: 'FK', nullable: false, desc: 'Cabang yang diulas' },
      { name: 'reviewer_name', type: 'varchar(100)', nullable: false, desc: 'Nama pengulas Google' },
      { name: 'star_rating', type: 'int4', nullable: false, desc: 'Bintang review (1 s.d. 5)' },
      { name: 'review_text', type: 'text', nullable: true, desc: 'Komentar ulasan' }
    ]
  }
];

const DOMAINS = [
  { key: 'all', label: 'All Domains (40)', icon: Database },
  { key: 'sales', label: 'Sales Data', icon: ShoppingBag },
  { key: 'customer', label: 'Customer Data', icon: Users },
  { key: 'operations', label: 'Operations Data', icon: Building2 },
  { key: 'hr', label: 'HR Data', icon: HeartHandshake },
  { key: 'cctv', label: 'CCTV Data', icon: Video },
  { key: 'social', label: 'Social Media', icon: Share2 },
  { key: 'asset', label: 'Asset Data', icon: Wrench },
  { key: 'finance', label: 'Finance Data', icon: Wallet },
  { key: 'vehicle', label: 'Vehicle Data', icon: Truck },
  { key: 'inventory', label: 'Inventory Data', icon: Boxes },
  { key: 'marketing', label: 'Marketing Data', icon: Megaphone },
];

function generateInterface(table: TableSchema): string {
  const fields = table.columns.map(col => {
    let tsType = 'string';
    if (col.type.includes('int') || col.type.includes('numeric') || col.type.includes('float')) tsType = 'number';
    if (col.type.includes('bool')) tsType = 'boolean';
    if (col.type.includes('json')) tsType = 'Record<string, any>';
    return `  /** ${col.desc} (${col.type}) */\n  ${col.name}${col.nullable ? '?' : ''}: ${tsType};`;
  }).join('\n');
  return `export interface ${table.name.replace(/[^a-zA-Z0-9]/g, '_')} {\n${fields}\n}`;
}

function generateDDL(table: TableSchema): string {
  const cols = table.columns.map(col => {
    return `  ${col.name} ${col.type}${col.nullable ? '' : ' NOT NULL'}`;
  }).join(',\n');
  return `-- Enterprise Schema DDL for public.${table.name}\nCREATE TABLE IF NOT EXISTS public.${table.name} (\n${cols}\n);\n\nCOMMENT ON TABLE public.${table.name} IS '${table.purpose}';`;
}

function generateJSONSchema(table: TableSchema): string {
  const props: Record<string, any> = {};
  table.columns.forEach(col => {
    let t = 'string';
    if (col.type.includes('int') || col.type.includes('numeric') || col.type.includes('float')) t = 'number';
    if (col.type.includes('bool')) t = 'boolean';
    if (col.type.includes('json')) t = 'object';
    props[col.name] = { type: t, description: col.desc };
  });
  const required = table.columns.filter(c => !c.nullable).map(c => c.name);
  return JSON.stringify({
    $schema: "http://json-schema.org/draft-07/schema#",
    title: table.name,
    description: table.purpose,
    type: "object",
    properties: props,
    required
  }, null, 2);
}

function generateAIPromptContext(table: TableSchema): string {
  const incoming = SCHEMA_CATALOG.filter(t => 
    t.id !== table.id && t.relations.some(r => r.startsWith(`${table.name}.`))
  );

  const outSummary = table.relations.map(rel => {
    const targetName = rel.split('.')[0];
    const target = SCHEMA_CATALOG.find(t => t.name === targetName);
    return `- \`${rel}\`: ${target ? target.purpose : 'Reference table'}`;
  }).join('\n');

  const inSummary = incoming.map(t => {
    const matchingRels = t.relations.filter(r => r.startsWith(`${table.name}.`)).join(', ');
    return `- \`public.${t.name}\` via (${matchingRels}): ${t.purpose}`;
  }).join('\n');

  return `# AI Coding Context Blueprint: public.${table.name}

## Domain Overview
- **Business Pilar**: ${table.domainLabel} (${table.domain})
- **Primary Responsibility**: ${table.purpose}

## PostgreSQL Schema DDL
\`\`\`sql
${generateDDL(table)}
\`\`\`

## TypeScript Types
\`\`\`typescript
${generateInterface(table)}
\`\`\`

## Relational Dependencies

### Outgoing References (Tabel yang dirujuk oleh ${table.name})
${outSummary || 'None (Base Master Entity)'}

### Incoming Dependents (Tabel lain yang bergantung pada ${table.name})
${inSummary || 'None (Leaf Entity)'}

## Prompt Instructions for AI Agent
When constructing SQL queries or Supabase client calls for this entity:
1. Ensure all joins match the exact Foreign Key constraints listed under Relational Dependencies.
2. Handle nullability explicitly according to the DDL schema above.
3. If writing Supabase RLS policies, ensure tenant or branch isolation logic aligns with \`${table.domain}\` domain rules.`;
}

export default function DataRelationPage() {
  const [globalView, setGlobalView] = useState<'explorer' | 'global_erd'>('explorer');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [tableSearchQuery, setTableSearchQuery] = useState('');
  const [dataSearchQuery, setDataSearchQuery] = useState('');
  const [activeTable, setActiveTable] = useState<TableSchema>(SCHEMA_CATALOG[0]);
  const [activeSubTab, setActiveSubTab] = useState<'data' | 'schema' | 'relations'>('data');
  const [liveRows, setLiveRows] = useState<any[]>([]);
  const [loadingLive, setLoadingLive] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [rowCount, setRowCount] = useState<number | null>(null);
  const [selectedRowDetail, setSelectedRowDetail] = useState<any | null>(null);
  const [pageSize, setPageSize] = useState(25);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const supabase = createClient();

  // Filter catalog
  const filteredCatalog = SCHEMA_CATALOG.filter(t => {
    const matchDomain = selectedDomain === 'all' || t.domain === selectedDomain;
    const matchSearch = t.name.toLowerCase().includes(tableSearchQuery.toLowerCase()) || 
                        t.purpose.toLowerCase().includes(tableSearchQuery.toLowerCase());
    return matchDomain && matchSearch;
  });

  const incomingRelations = SCHEMA_CATALOG.filter(t => 
    t.id !== activeTable.id && t.relations.some(r => r.startsWith(`${activeTable.name}.`))
  );

  async function fetchFullData() {
    setLoadingLive(true);
    setSupabaseError(null);
    setRowCount(null);
    setDataSearchQuery('');
    try {
      const { data, error } = await supabase.from(activeTable.name).select('*').limit(200);
      if (error) {
        setSupabaseError(error.message);
        setLiveRows([]);
      } else {
        setLiveRows(data || []);
      }
      const { count } = await supabase.from(activeTable.name).select('*', { count: 'exact', head: true });
      setRowCount(count ?? (data ? data.length : 0));
    } catch (err: any) {
      setSupabaseError(err?.message || 'Error fetching data');
      setLiveRows([]);
      setRowCount(null);
    } finally {
      setLoadingLive(false);
    }
  }

  useEffect(() => {
    fetchFullData();
  }, [activeTable.name]);

  const filteredLiveRows = liveRows.filter(row => {
    if (!dataSearchQuery.trim()) return true;
    const q = dataSearchQuery.toLowerCase();
    return Object.values(row).some(val => 
      val !== null && val !== undefined && String(val).toLowerCase().includes(q)
    );
  });

  const dataColumns = activeTable.columns.map(col => ({
    title: (
      <div style={{ padding: '4px 0' }}>
        <div style={{ fontWeight: 700, color: '#0F172A', fontFamily: 'monospace', fontSize: '12px' }}>{col.name}</div>
        <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
          {col.type} {col.key ? <span style={{ color: col.key === 'PK' ? '#D97706' : '#2563EB', fontWeight: 700 }}>• {col.key}</span> : ''}
        </div>
      </div>
    ),
    dataIndex: col.name,
    key: col.name,
    render: (val: any) => {
      if (val === null || val === undefined) return <span style={{ fontSize: '11px', color: '#CBD5E1', fontStyle: 'italic', fontWeight: 500 }}>null</span>;
      if (typeof val === 'boolean') return <Tag color={val ? 'success' : 'error'} style={{ fontWeight: 700, fontSize: '10px', borderRadius: '4px', margin: 0 }}>{val ? 'TRUE' : 'FALSE'}</Tag>;
      if (typeof val === 'object') return <Tag color="blue" style={{ fontFamily: 'monospace', fontSize: '11px', borderRadius: '4px', margin: 0 }}>{JSON.stringify(val).slice(0, 40)}...</Tag>;
      return <span style={{ color: '#1E293B', fontWeight: 500, fontSize: '13px', fontFamily: typeof val === 'number' ? 'monospace' : 'inherit' }}>{String(val)}</span>;
    }
  }));

  const schemaColumns = [
    { 
      title: 'Column Attribute Name', 
      dataIndex: 'name', 
      key: 'name', 
      width: 300,
      render: (t: any, r: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '13px', color: '#0F172A' }}>{t}</span>
          {r.key && (
            <Tag color={r.key === 'PK' ? 'gold' : 'cyan'} style={{ fontWeight: 800, fontSize: '10px', margin: 0, borderRadius: '4px' }}>
              {r.key === 'PK' ? 'PRIMARY KEY' : 'FOREIGN KEY'}
            </Tag>
          )}
        </div>
      ) 
    },
    { title: 'Data Type', dataIndex: 'type', key: 'type', width: 180, render: (t: any) => <code style={{ color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '12px' }}>{t}</code> },
    { title: 'Nullable', dataIndex: 'nullable', key: 'nullable', width: 140, render: (v: any) => <span style={{ fontSize: '12px', fontWeight: 700, color: v ? '#64748B' : '#E11D48' }}>{v ? 'Nullable' : 'Not Null'}</span> },
    { title: 'Business Purpose & Specification', dataIndex: 'desc', key: 'desc', render: (d: any) => <span style={{ color: '#334155', fontSize: '13px', lineHeight: 1.5 }}>{d}</span> }
  ];

  function exportCSV() {
    if (!filteredLiveRows || filteredLiveRows.length === 0) {
      messageApi.warning('Tidak ada baris data untuk diekspor.');
      return;
    }
    const headers = Object.keys(filteredLiveRows[0]);
    const csvContent = [headers.join(','), ...filteredLiveRows.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${activeTable.name}_export.csv`;
    link.click();
    messageApi.success(`Berhasil ekspor CSV.`);
  }

  return (
    <MainLayout title="Calf Enterprise Studio" subtitle="Single Source of Truth PostgreSQL Schema Catalog & Live Data Explorer">
      {contextHolder}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '80px', maxWidth: '1600px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        
        {/* TOP STATUS & CONTROLLER CARD */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: '#0F172A', borderRadius: '12px', color: '#38BDF8', display: 'flex', boxShadow: '0 4px 10px rgba(15,23,42,0.12)' }}>
              <Database size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Title level={3} style={{ margin: 0, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', fontSize: '20px' }}>Calf Schema & Data Studio</Title>
                <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }}></span>
                  Live Connected
                </span>
              </div>
              <Text style={{ fontSize: '13px', color: '#64748B', marginTop: '2px', display: 'block' }}>Centralized Database Catalog • 40 Tables • 11 Business Pillars</Text>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Vercel Segmented Control */}
            <div style={{ display: 'flex', background: '#F1F5F9', padding: '4px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <button
                onClick={() => setGlobalView('explorer')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '8px', border: 'none',
                  background: globalView === 'explorer' ? '#FFFFFF' : 'transparent',
                  color: globalView === 'explorer' ? '#0F172A' : '#64748B',
                  fontWeight: globalView === 'explorer' ? 700 : 500,
                  fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s ease',
                  boxShadow: globalView === 'explorer' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                <TableIcon size={15} color={globalView === 'explorer' ? '#2563EB' : '#64748B'} />
                <span>Catalog Explorer</span>
              </button>
              <button
                onClick={() => setGlobalView('global_erd')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '8px', border: 'none',
                  background: globalView === 'global_erd' ? '#FFFFFF' : 'transparent',
                  color: globalView === 'global_erd' ? '#0F172A' : '#64748B',
                  fontWeight: globalView === 'global_erd' ? 700 : 500,
                  fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s ease',
                  boxShadow: globalView === 'global_erd' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                <Network size={15} color={globalView === 'global_erd' ? '#0284C7' : '#64748B'} />
                <span>Ecosystem Topology</span>
              </button>
            </div>

            <Button 
              onClick={() => setExportModalVisible(true)} 
              style={{ 
                background: '#0F172A', color: '#FFFFFF', border: 'none', 
                borderRadius: '10px', padding: '0 18px', height: '38px', 
                fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <Sparkles size={15} color="#38BDF8" />
              <span>AI Coding Blueprint</span>
            </Button>
          </div>
        </div>

        {/* VIEW 1: CATALOG EXPLORER */}
        {globalView === 'explorer' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'flex-start' }}>
            
            {/* LEFT SIDEBAR: MASTER CATALOG */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>SCHEMA CATALOG (40)</Text>
                <Tag style={{ margin: 0, borderRadius: '6px', fontWeight: 700, fontSize: '10px', background: '#F1F5F9', border: 'none', color: '#475569' }}>PostgreSQL</Tag>
              </div>

              <Input 
                prefix={<Search size={15} color="#94A3B8" />} 
                placeholder="Cari tabel atau deskripsi..." 
                value={tableSearchQuery} 
                onChange={e => setTableSearchQuery(e.target.value)} 
                allowClear 
                style={{ borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px' }}
              />

              {/* PILL CATEGORIES */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
                {DOMAINS.map(d => (
                  <button 
                    key={d.key} 
                    onClick={() => setSelectedDomain(d.key)} 
                    style={{ 
                      padding: '5px 10px', borderRadius: '20px', 
                      border: selectedDomain === d.key ? '1px solid #0F172A' : '1px solid #E2E8F0', 
                      background: selectedDomain === d.key ? '#0F172A' : '#FFFFFF', 
                      color: selectedDomain === d.key ? '#FFFFFF' : '#475569', 
                      fontSize: '11px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                  >
                    {d.key === 'all' ? '🌟 All Pillars' : d.label}
                  </button>
                ))}
              </div>

              {/* TABLE NAVIGATOR LIST */}
              <div style={{ overflowY: 'auto', maxHeight: '580px', display: 'flex', flexDirection: 'column', gap: '18px', paddingRight: '4px' }}>
                {DOMAINS.filter(d => d.key !== 'all').map(dom => {
                  const dt = filteredCatalog.filter(t => t.domain === dom.key);
                  if (dt.length === 0) return null;
                  return (
                    <div key={dom.key}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <dom.icon size={14} color="#2563EB" />
                        <span>{dom.label}</span>
                        <span style={{ color: '#CBD5E1', fontWeight: 600 }}>({dt.length})</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {dt.map(tbl => {
                          const isAct = activeTable.name === tbl.name;
                          return (
                            <div 
                              key={tbl.name} 
                              onClick={() => { setActiveTable(tbl); setActiveSubTab('data'); }} 
                              style={{ 
                                padding: '10px 12px', borderRadius: '10px', 
                                background: isAct ? '#F1F5F9' : 'transparent', 
                                color: isAct ? '#0F172A' : '#475569', 
                                fontWeight: isAct ? 700 : 500, fontSize: '13px', cursor: 'pointer', 
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                position: 'relative', transition: 'all 0.15s ease'
                              }}
                            >
                              {isAct && <span style={{ position: 'absolute', left: 0, top: '8px', bottom: '8px', width: '3px', borderRadius: '4px', background: '#2563EB' }}></span>}
                              <span style={{ fontFamily: 'monospace', letterSpacing: '-0.01em', paddingLeft: isAct ? '6px' : '0' }}>{tbl.name}</span>
                              <span style={{ fontSize: '11px', color: isAct ? '#2563EB' : '#94A3B8', fontWeight: 700, background: isAct ? '#DBEAFE' : '#F8FAFC', padding: '1px 7px', borderRadius: '10px' }}>
                                {tbl.columns.length}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT WORKSPACE: ENTITY STUDIO CANVAS */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '680px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.03)' }}>
              
              {/* TABLE HEADER BANNER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', background: '#F8FAFC', padding: '24px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <Title level={2} style={{ margin: 0, fontWeight: 800, fontFamily: 'monospace', color: '#0F172A', letterSpacing: '-0.03em', fontSize: '24px' }}>
                      public.{activeTable.name}
                    </Title>
                    <Tag color="geekblue" style={{ fontWeight: 700, padding: '2px 10px', borderRadius: '6px', fontSize: '12px', margin: 0 }}>
                      {activeTable.domainLabel}
                    </Tag>
                    <span style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: '12px', fontWeight: 700, padding: '2px 10px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
                      {rowCount !== null ? `${rowCount.toLocaleString()} Total Rows` : `${liveRows.length} Fetched Rows`}
                    </span>
                  </div>
                  <Text style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, display: 'block' }}>
                    {activeTable.purpose}
                  </Text>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Button icon={<RefreshCw size={14} />} onClick={fetchFullData} loading={loadingLive} style={{ borderRadius: '8px', height: '38px', fontWeight: 600 }}>
                    Sync Data
                  </Button>
                  <Button icon={<FileText size={14} />} onClick={exportCSV} style={{ background: '#0F172A', color: '#FFFFFF', borderRadius: '8px', height: '38px', fontWeight: 600, border: 'none' }}>
                    Export CSV
                  </Button>
                </div>
              </div>

              {/* VERCEL TABS BAR */}
              <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '0' }}>
                <button
                  onClick={() => setActiveSubTab('data')}
                  style={{
                    padding: '10px 4px', border: 'none', background: 'transparent',
                    borderBottom: activeSubTab === 'data' ? '2px solid #0F172A' : '2px solid transparent',
                    marginBottom: '-1px', fontWeight: activeSubTab === 'data' ? 700 : 500,
                    color: activeSubTab === 'data' ? '#0F172A' : '#64748B', fontSize: '14px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s ease'
                  }}
                >
                  <Layers size={16} color={activeSubTab === 'data' ? '#2563EB' : '#64748B'} />
                  <span>Live Records</span>
                  <span style={{ borderRadius: '10px', background: activeSubTab === 'data' ? '#0F172A' : '#F1F5F9', color: activeSubTab === 'data' ? '#FFFFFF' : '#64748B', padding: '1px 8px', fontWeight: 700, fontSize: '11px' }}>
                    {filteredLiveRows.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveSubTab('schema')}
                  style={{
                    padding: '10px 4px', border: 'none', background: 'transparent',
                    borderBottom: activeSubTab === 'schema' ? '2px solid #0F172A' : '2px solid transparent',
                    marginBottom: '-1px', fontWeight: activeSubTab === 'schema' ? 700 : 500,
                    color: activeSubTab === 'schema' ? '#0F172A' : '#64748B', fontSize: '14px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s ease'
                  }}
                >
                  <Code2 size={16} color={activeSubTab === 'schema' ? '#2563EB' : '#64748B'} />
                  <span>Schema Specifications</span>
                  <span style={{ borderRadius: '10px', background: activeSubTab === 'schema' ? '#0F172A' : '#F1F5F9', color: activeSubTab === 'schema' ? '#FFFFFF' : '#64748B', padding: '1px 8px', fontWeight: 700, fontSize: '11px' }}>
                    {activeTable.columns.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveSubTab('relations')}
                  style={{
                    padding: '10px 4px', border: 'none', background: 'transparent',
                    borderBottom: activeSubTab === 'relations' ? '2px solid #0F172A' : '2px solid transparent',
                    marginBottom: '-1px', fontWeight: activeSubTab === 'relations' ? 700 : 500,
                    color: activeSubTab === 'relations' ? '#0F172A' : '#64748B', fontSize: '14px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s ease'
                  }}
                >
                  <GitFork size={16} color={activeSubTab === 'relations' ? '#2563EB' : '#64748B'} />
                  <span>Relational Network</span>
                  <span style={{ borderRadius: '10px', background: activeSubTab === 'relations' ? '#0F172A' : '#F1F5F9', color: activeSubTab === 'relations' ? '#FFFFFF' : '#64748B', padding: '1px 8px', fontWeight: 700, fontSize: '11px' }}>
                    {incomingRelations.length + activeTable.relations.length}
                  </span>
                </button>
              </div>

              {/* SUB TAB 1: DATA RECORDS */}
              {activeSubTab === 'data' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <Input 
                      prefix={<Search size={14} color="#94A3B8" />} 
                      placeholder="Filter kata kunci di dalam baris data aktif..." 
                      value={dataSearchQuery} 
                      onChange={e => setDataSearchQuery(e.target.value)} 
                      allowClear 
                      style={{ maxWidth: '360px', borderRadius: '8px', padding: '6px 12px' }} 
                    />
                    <Text style={{ fontSize: '12px', color: '#64748B' }}>💡 Klik baris mana saja untuk menginspeksi struktur Raw JSON</Text>
                  </div>

                  {supabaseError ? (
                    <div style={{ padding: '20px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', color: '#B91C1C', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '24px' }}>⚠️</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px' }}>Supabase Query Error</div>
                        <div style={{ fontSize: '13px', marginTop: '2px' }}>{supabaseError}</div>
                      </div>
                    </div>
                  ) : (
                    <AntTable 
                      dataSource={filteredLiveRows} 
                      columns={dataColumns} 
                      rowKey={r => r.id || r.order_id || r.customer_id || r.cctv_id || JSON.stringify(r)} 
                      loading={loadingLive} 
                      pagination={{ 
                        pageSize, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], 
                        onShowSizeChange: (_, s) => setPageSize(Number(s)),
                        style: { padding: '16px 0' }
                      }} 
                      onRow={record => ({ 
                        onClick: () => setSelectedRowDetail(record),
                        style: { cursor: 'pointer' } 
                      })} 
                      scroll={{ x: 'max-content' }} 
                      size="middle" 
                      bordered={false}
                      style={{ border: '1px solid #F1F5F9', borderRadius: '10px', overflow: 'hidden' }}
                    />
                  )}
                </div>
              ) : null}

              {/* SUB TAB 2: SCHEMA SPECIFICATIONS */}
              {activeSubTab === 'schema' ? (
                <AntTable 
                  dataSource={activeTable.columns} 
                  columns={schemaColumns} 
                  rowKey="name" 
                  pagination={false} 
                  size="middle" 
                  bordered={false}
                  style={{ border: '1px solid #F1F5F9', borderRadius: '10px', overflow: 'hidden' }} 
                />
              ) : null}

              {/* SUB TAB 3: RELATIONS MAP */}
              {activeSubTab === 'relations' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  
                  {/* INCOMING DEPENDENTS */}
                  <div style={{ background: '#F8FAFC', padding: '22px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <div style={{ padding: '8px', background: '#EFF6FF', borderRadius: '8px', color: '#2563EB' }}><ArrowLeft size={16} /></div>
                      <div>
                        <Title level={5} style={{ margin: 0, fontWeight: 800, color: '#0F172A' }}>Downstream Dependents</Title>
                        <Text style={{ fontSize: '12px', color: '#64748B' }}>Tabel lain yang merujuk Foreign Key ke tabel ini</Text>
                      </div>
                    </div>

                    {incomingRelations.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', background: '#FFFFFF', borderRadius: '10px', border: '1px dashed #E2E8F0' }}>
                        <Text style={{ color: '#94A3B8', fontSize: '13px' }}>Leaf Entity (Tidak ada rujukan masuk dari tabel lain)</Text>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {incomingRelations.map(inc => (
                          <div 
                            key={inc.name} 
                            onClick={() => setActiveTable(inc)} 
                            style={{ 
                              padding: '12px 16px', background: '#FFFFFF', border: '1px solid #BFDBFE', 
                              borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', 
                              alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', transition: 'all 0.15s ease' 
                            }}
                          >
                            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1E3A8A', fontSize: '13px' }}>public.{inc.name}</span>
                            <Tag color="blue" style={{ margin: 0, fontSize: '11px', fontWeight: 700, borderRadius: '6px' }}>Inspect ↗</Tag>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* OUTGOING FOREIGN KEYS */}
                  <div style={{ background: '#F8FAFC', padding: '22px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <div style={{ padding: '8px', background: '#ECFDF5', borderRadius: '8px', color: '#059669' }}><ArrowRight size={16} /></div>
                      <div>
                        <Title level={5} style={{ margin: 0, fontWeight: 800, color: '#0F172A' }}>Outgoing Foreign Keys</Title>
                        <Text style={{ fontSize: '12px', color: '#64748B' }}>Tabel master yang dirujuk oleh tabel ini</Text>
                      </div>
                    </div>

                    {activeTable.relations.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', background: '#FFFFFF', borderRadius: '10px', border: '1px dashed #E2E8F0' }}>
                        <Text style={{ color: '#94A3B8', fontSize: '13px' }}>Base Master Entity (Tidak merujuk ke tabel lain)</Text>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {activeTable.relations.map((rel, i) => {
                          const tgName = rel.split('.')[0];
                          const tg = SCHEMA_CATALOG.find(t => t.name === tgName);
                          return (
                            <div 
                              key={i} 
                              onClick={() => tg && setActiveTable(tg)} 
                              style={{ 
                                padding: '12px 16px', background: '#FFFFFF', border: '1px solid #A7F3D0', 
                                borderRadius: '10px', cursor: tg ? 'pointer' : 'default', display: 'flex', 
                                justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#065F46', fontSize: '13px' }}>{rel}</span>
                              {tg && <Tag color="emerald" style={{ margin: 0, fontSize: '11px', fontWeight: 700, borderRadius: '6px' }}>Jump Master ↗</Tag>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                </div>
              ) : null}

            </div>

          </div>
        ) : null}

        {/* VIEW 2: GLOBAL ERD TOPOLOGY */}
        {globalView === 'global_erd' ? (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.03)' }}>
            
            <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '32px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.25)' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 800, letterSpacing: '0.12em', marginBottom: '6px' }}>CENTRALIZED SCHEMA TOPOLOGY</div>
                <Title level={2} style={{ color: '#FFFFFF', margin: 0, fontWeight: 800, letterSpacing: '-0.02em' }}>Calf Master Relational Network Ecosystem</Title>
                <Text style={{ color: '#94A3B8', fontSize: '14px', marginTop: '4px', display: 'block' }}>Visualisasi 40 entitas bisnis PostgreSQL yang saling terhubung dalam 11 pilar ekosistem.</Text>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Text style={{ color: '#38BDF8', fontSize: '13px', fontWeight: 700 }}>💡 Interaktif: Klik kotak tabel untuk lompat inspeksi data</Text>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
              {DOMAINS.filter(d => d.key !== 'all').map(dom => {
                const pt = SCHEMA_CATALOG.filter(t => t.domain === dom.key);
                if (pt.length === 0) return null;
                return (
                  <div key={dom.key} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px' }}>
                      <div style={{ padding: '10px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                        <dom.icon size={20} color="#2563EB" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '15px' }}>{dom.label}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{pt.length} Registered Tables</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {pt.map(tbl => (
                        <div 
                          key={tbl.name} 
                          onClick={() => { setActiveTable(tbl); setGlobalView('explorer'); setActiveSubTab('data'); }} 
                          style={{ 
                            background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '14px 16px', 
                            borderRadius: '12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.02)', transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>public.{tbl.name}</span>
                            <Tag color="blue" style={{ margin: 0, fontSize: '10px', borderRadius: '6px', fontWeight: 700 }}>{tbl.columns.length} cols</Tag>
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>{tbl.purpose}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ) : null}

      </div>

      {/* ROW DETAIL MODAL */}
      <Modal title={`Row Record Inspector (${activeTable.name})`} open={selectedRowDetail !== null} onCancel={() => setSelectedRowDetail(null)} footer={[<Button key="c" onClick={() => setSelectedRowDetail(null)}>Tutup</Button>]} width={750}>
        {selectedRowDetail ? (
          <Tabs defaultActiveKey="table" items={[
            { key: 'table', label: '📋 Attributes Table', children: <AntTable dataSource={Object.entries(selectedRowDetail).map(([k, v]) => ({ key: k, value: v }))} columns={[{ title: 'Key Attribute', dataIndex: 'key', key: 'key', width: 220, render: (t: any) => <span style={{ fontWeight: 700, fontFamily: 'monospace', color: '#0F172A' }}>{t}</span> }, { title: 'Record Value', dataIndex: 'value', key: 'value', render: (v: any) => typeof v === 'object' ? <pre style={{ fontSize: '11px', margin: 0, background: '#F8FAFC', padding: '8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>{JSON.stringify(v, null, 2)}</pre> : <span style={{ fontWeight: 500, color: '#334155' }}>{String(v ?? 'NULL')}</span> }]} pagination={false} size="small" bordered /> },
            { key: 'json', label: '💻 Raw JSON Payload', children: <pre style={{ background: '#0F172A', color: '#38BDF8', padding: '18px', borderRadius: '10px', maxHeight: '450px', overflow: 'auto', fontSize: '12px', fontFamily: 'monospace' }}>{JSON.stringify(selectedRowDetail, null, 2)}</pre> }
          ]} />
        ) : null}
      </Modal>

      {/* AI EXPORTER MODAL */}
      <Modal title={`AI Blueprint & Enterprise Schema Exporter (${activeTable.name})`} open={exportModalVisible} onCancel={() => setExportModalVisible(false)} footer={[<Button key="c" onClick={() => setExportModalVisible(false)}>Tutup</Button>]} width={750}>
        <Tabs defaultActiveKey="ai" items={[
          { key: 'ai', label: '🤖 AI Blueprint Prompt', children: <div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}><Text style={{ fontSize: '12px', color: '#64748B' }}>Konteks prompt untuk ChatGPT / Claude / Cursor:</Text><Button type="primary" icon={<Copy size={14} />} onClick={() => { navigator.clipboard.writeText(generateAIPromptContext(activeTable)); messageApi.success('Copied Blueprint!'); }}>Copy AI Prompt</Button></div><pre style={{ background: '#0F172A', color: '#38BDF8', padding: '16px', borderRadius: '8px', maxHeight: '400px', overflow: 'auto', fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{generateAIPromptContext(activeTable)}</pre></div> },
          { key: 'ts', label: '📐 TypeScript Interface', children: <div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}><Text style={{ fontSize: '12px', color: '#64748B' }}>Interface model untuk frontend / backend:</Text><Button icon={<Copy size={14} />} onClick={() => { navigator.clipboard.writeText(generateInterface(activeTable)); messageApi.success('Copied TS!'); }}>Copy Interface</Button></div><pre style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', maxHeight: '400px', overflow: 'auto', fontSize: '12px', fontFamily: 'monospace' }}>{generateInterface(activeTable)}</pre></div> },
          { key: 'sql', label: '📜 SQL DDL Definition', children: <div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}><Text style={{ fontSize: '12px', color: '#64748B' }}>DDL PostgreSQL & kebijakan RLS:</Text><Button icon={<Copy size={14} />} onClick={() => { navigator.clipboard.writeText(generateDDL(activeTable)); messageApi.success('Copied SQL!'); }}>Copy SQL DDL</Button></div><pre style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', maxHeight: '400px', overflow: 'auto', fontSize: '12px', fontFamily: 'monospace' }}>{generateDDL(activeTable)}</pre></div> }
        ]} />
      </Modal>
    </MainLayout>
  );
}
