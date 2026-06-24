const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.join('=').trim();
  }
});

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
  console.log("Fetching existing data to satisfy Foreign Keys...");
  const { data: orders } = await supabase.from('orders').select('id, total_payment, transaction_date');
  const { data: branches } = await supabase.from('branches').select('id');
  const { data: inventories } = await supabase.from('inventories').select('id');
  const { data: members } = await supabase.from('members').select('member_code');

  if (!orders || orders.length === 0) {
    console.log("No orders found! Skipping some ESB data seeding.");
  }
  
  // 1. ESB Payments Ledger
  console.log("Seeding ESB Payments Ledger...");
  if (orders && orders.length > 0) {
    const payments = [];
    const paymentChannels = ['QRIS', 'EDC BCA', 'EDC Mandiri', 'Cash', 'GoPay', 'ShopeePay'];
    for (let i = 0; i < Math.min(50, orders.length); i++) {
      const order = orders[i];
      const channel = randomItem(paymentChannels);
      const mdr = channel === 'Cash' ? 0 : (channel.includes('EDC') ? 1.5 : 0.7);
      const gross = order.total_payment || randomInt(50000, 500000);
      const net = gross - (gross * (mdr / 100));
      payments.push({
        order_id: order.id,
        payment_channel: channel,
        gross_amount: gross,
        mdr_fee_percentage: mdr,
        net_amount: net,
        settlement_status: randomItem(['Pending', 'Settled', 'Settled']),
        transaction_id: `TRX-ESB-${randomInt(10000, 99999)}`,
        created_at: order.transaction_date || new Date().toISOString()
      });
    }
    await supabase.from('esb_payments_ledger').insert(payments);
  }

  // 2. ESB Voids & Refunds
  console.log("Seeding ESB Voids & Refunds...");
  if (orders && orders.length > 0) {
    const voids = [];
    for (let i = 0; i < 20; i++) {
      const order = randomItem(orders);
      voids.push({
        order_id: order.id,
        type: randomItem(['Void', 'Refund']),
        reason: randomItem(['Customer cancelled', 'Out of stock', 'Wrong input', 'System error']),
        authorized_by: randomItem(['SPV-Andi', 'MGR-Budi', 'SPV-Siti']),
        amount: randomInt(15000, 100000)
      });
    }
    await supabase.from('esb_voids_refunds').insert(voids);
  }

  // 3. ESB Purchase Orders
  console.log("Seeding ESB Purchase Orders...");
  if (branches && branches.length > 0) {
    const pos = [];
    const suppliers = ['PT Sukses Makmur', 'CV Segar Jaya', 'PT Indofood', 'Sinar Mas Logistics'];
    for (let i = 0; i < 30; i++) {
      const branch = randomItem(branches);
      const d = new Date();
      d.setDate(d.getDate() + randomInt(1, 14));
      pos.push({
        po_number: `PO-${new Date().getFullYear()}-${randomInt(1000, 9999)}`,
        supplier_name: randomItem(suppliers),
        branch_id: branch.id,
        status: randomItem(['Pending', 'Received', 'Received', 'Cancelled']),
        expected_delivery: d.toISOString().split('T')[0],
        total_cost: randomInt(1000000, 15000000)
      });
    }
    await supabase.from('esb_purchase_orders').insert(pos);
  }

  // 4. ESB Recipes (BOM)
  console.log("Seeding ESB Recipes...");
  if (inventories && inventories.length > 0) {
    const recipes = [];
    const menus = ['Kopi Susu Gula Aren', 'Americano', 'Croissant', 'Beef Burger', 'Matcha Latte'];
    for (let i = 0; i < 100; i++) {
      recipes.push({
        menu_name: randomItem(menus),
        inventory_id: randomItem(inventories).id,
        qty_required: randomInt(10, 500) / 10,
        uom: randomItem(['Gram', 'Ml', 'Pcs'])
      });
    }
    await supabase.from('esb_recipes').insert(recipes);
  }

  // 5. ESB Point Transactions
  console.log("Seeding ESB Point Transactions...");
  if (members && members.length > 0) {
    const pts = [];
    for (let i = 0; i < 100; i++) {
      pts.push({
        member_code: randomItem(members).member_code,
        transaction_type: randomItem(['Earn', 'Earn', 'Redeem']),
        points: randomInt(10, 500),
        reference_order_id: (orders && orders.length > 0) ? randomItem(orders).id : null
      });
    }
    await supabase.from('esb_point_transactions').insert(pts);
  }

  // 6. ESB Vouchers
  console.log("Seeding ESB Vouchers...");
  if (members && members.length > 0) {
    const vouchers = [];
    for (let i = 0; i < 50; i++) {
      const d = new Date();
      d.setDate(d.getDate() + randomInt(-30, 60)); // Some expired, some future
      vouchers.push({
        voucher_code: `VCH-${randomInt(10000, 99999)}`,
        member_code: randomItem(members).member_code,
        discount_value: randomItem([10000, 20000, 50000, 15]), // 15 is 15%
        status: d < new Date() ? 'Expired' : randomItem(['Active', 'Used']),
        expiry_date: d.toISOString()
      });
    }
    await supabase.from('esb_vouchers').insert(vouchers);
  }

  console.log("Seed complete!");
}

seed().catch(console.error);
