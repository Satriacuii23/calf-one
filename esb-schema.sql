-- Phase 1: ESB OMS (Keuangan & Pembayaran)
CREATE TABLE IF NOT EXISTS public.esb_payments_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    payment_channel VARCHAR(50) NOT NULL,
    gross_amount NUMERIC(10,2) NOT NULL,
    mdr_fee_percentage NUMERIC(5,2) DEFAULT 0,
    net_amount NUMERIC(10,2) NOT NULL,
    settlement_status VARCHAR(20) DEFAULT 'Pending',
    transaction_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.esb_voids_refunds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('Void', 'Refund')),
    reason TEXT NOT NULL,
    authorized_by VARCHAR(100),
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phase 2: ESB Core (Supply Chain & Inventory)
CREATE TABLE IF NOT EXISTS public.esb_purchase_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_number VARCHAR(50) NOT NULL UNIQUE,
    supplier_name VARCHAR(150) NOT NULL,
    branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Received', 'Cancelled')),
    expected_delivery DATE,
    total_cost NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.esb_recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_name VARCHAR(150) NOT NULL,
    inventory_id UUID REFERENCES public.inventories(id) ON DELETE CASCADE,
    qty_required NUMERIC(8,2) NOT NULL,
    uom VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phase 3: ESB Loop (Retention & Loyalty)
CREATE TABLE IF NOT EXISTS public.esb_point_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_code VARCHAR(50) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('Earn', 'Redeem')),
    points INTEGER NOT NULL,
    reference_order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.esb_vouchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voucher_code VARCHAR(50) NOT NULL UNIQUE,
    member_code VARCHAR(50) NOT NULL,
    discount_value NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Used', 'Expired')),
    expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tambahkan RLS (Row Level Security) dasar
ALTER TABLE public.esb_payments_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_voids_refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_vouchers ENABLE ROW LEVEL SECURITY;

-- Izinkan akses publik (hanya untuk keperluan dashboard/read)
CREATE POLICY "Allow public read" ON public.esb_payments_ledger FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.esb_voids_refunds FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.esb_purchase_orders FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.esb_recipes FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.esb_point_transactions FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.esb_vouchers FOR SELECT USING (true);

-- Izinkan public insert untuk seed script (Opsional)
CREATE POLICY "Allow public insert" ON public.esb_payments_ledger FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON public.esb_voids_refunds FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON public.esb_purchase_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON public.esb_recipes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON public.esb_point_transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON public.esb_vouchers FOR INSERT WITH CHECK (true);
