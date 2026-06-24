const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

async function seed() {
  console.log('--- Phase 4 ESB Seeding Started ---');

  // Fetch references
  const { data: branches } = await supabase.from('branches').select('id');
  const { data: inventories } = await supabase.from('inventories').select('id, branch_id');
  const { data: orders } = await supabase.from('orders').select('order_id, subtotal, total_payment, transaction_date');
  const { data: members } = await supabase.from('members').select('member_code');

  if (!branches || branches.length === 0) {
    console.error('No branches found!');
    return;
  }

  // 1. esb_shifts
  const shifts = [];
  const cashiers = ['Budi', 'Siti', 'Agus', 'Dewi', 'Rina', 'Joko'];
  for (let i = 0; i < 30; i++) {
    const start = new Date(Date.now() - randomInt(1, 14) * 86400000);
    const end = new Date(start.getTime() + 8 * 3600000);
    shifts.push({
      branch_id: randomItem(branches).id,
      cashier_name: randomItem(cashiers),
      shift_start: start.toISOString(),
      shift_end: end.toISOString(),
      opening_float: 500000,
      expected_cash: randomInt(3000000, 10000000),
      actual_cash: randomInt(3000000, 10000000),
      status: 'closed'
    });
  }
  await supabase.from('esb_shifts').insert(shifts);
  console.log('✅ esb_shifts seeded');

  // 2. esb_attendances
  const attendances = [];
  const roles = ['Cashier', 'Barista', 'Chef', 'Manager'];
  for (let i = 0; i < 50; i++) {
    const start = new Date(Date.now() - randomInt(1, 14) * 86400000);
    attendances.push({
      branch_id: randomItem(branches).id,
      employee_name: randomItem(cashiers),
      role: randomItem(roles),
      clock_in: start.toISOString(),
      clock_out: new Date(start.getTime() + randomInt(7, 9) * 3600000).toISOString(),
      status: Math.random() > 0.1 ? 'present' : 'late'
    });
  }
  await supabase.from('esb_attendances').insert(attendances);
  console.log('✅ esb_attendances seeded');

  // 3. esb_suppliers
  const suppliers = [
    { supplier_name: 'PT Segar Alam', category: 'Produce', avg_lead_time_days: 2, rating: 4.5 },
    { supplier_name: 'Dairy Kingdom', category: 'Dairy', avg_lead_time_days: 1, rating: 4.8 },
    { supplier_name: 'Sinar Pack', category: 'Packaging', avg_lead_time_days: 5, rating: 4.0 },
    { supplier_name: 'Kopi Nusantara', category: 'Coffee Beans', avg_lead_time_days: 3, rating: 4.9 }
  ];
  await supabase.from('esb_suppliers').insert(suppliers);
  console.log('✅ esb_suppliers seeded');

  // 4. esb_stock_adjustments
  const adjustments = [];
  const reasons = ['wastage', 'spoilage', 'damaged', 'stock_opname_correction'];
  for (let i = 0; i < 40; i++) {
    if (inventories && inventories.length > 0) {
      const inv = randomItem(inventories);
      adjustments.push({
        inventory_id: inv.id,
        branch_id: inv.branch_id,
        adjustment_qty: -randomInt(1, 20),
        reason: randomItem(reasons),
        remarks: 'Found during weekly checking'
      });
    }
  }
  if (adjustments.length > 0) {
    await supabase.from('esb_stock_adjustments').insert(adjustments);
    console.log('✅ esb_stock_adjustments seeded');
  }

  // 5. esb_kitchen_tickets
  const tickets = [];
  if (orders && orders.length > 0) {
    for (let i = 0; i < Math.min(100, orders.length); i++) {
      const ord = orders[i];
      const start = new Date(ord.transaction_date);
      tickets.push({
        order_id: ord.order_id,
        branch_id: randomItem(branches).id,
        ticket_received_at: start.toISOString(),
        started_prep_at: new Date(start.getTime() + 60000).toISOString(), // 1 min later
        completed_at: new Date(start.getTime() + randomInt(5, 25) * 60000).toISOString(), // 5-25 mins later
        status: 'completed'
      });
    }
    await supabase.from('esb_kitchen_tickets').insert(tickets);
    console.log('✅ esb_kitchen_tickets seeded');
  }

  // 6. esb_delivery_tracking
  const deliveries = [];
  const couriers = ['GoFood', 'GrabFood', 'ShopeeFood', 'In-house'];
  if (orders && orders.length > 0) {
    for (let i = 0; i < Math.min(50, orders.length); i++) {
      const ord = orders[i];
      const start = new Date(ord.transaction_date);
      deliveries.push({
        order_id: ord.order_id,
        courier_name: `Driver ${randomInt(100, 999)}`,
        provider: randomItem(couriers),
        dispatched_at: new Date(start.getTime() + 20 * 60000).toISOString(),
        delivered_at: new Date(start.getTime() + randomInt(40, 60) * 60000).toISOString(),
        status: 'delivered'
      });
    }
    await supabase.from('esb_delivery_tracking').insert(deliveries);
    console.log('✅ esb_delivery_tracking seeded');
  }

  // 7. esb_campaigns
  const campaigns = [
    { campaign_name: 'Promo Akhir Bulan', channel: 'email', target_audience: 5000, sent_count: 4950, open_count: 2000, conversion_count: 300, cost: 500000, revenue_generated: 15000000, status: 'completed' },
    { campaign_name: 'Flash Sale Kopi', channel: 'push_notification', target_audience: 10000, sent_count: 9900, open_count: 4000, conversion_count: 850, cost: 100000, revenue_generated: 25000000, status: 'completed' },
    { campaign_name: 'Voucher Member Baru', channel: 'sms', target_audience: 2000, sent_count: 1900, open_count: 800, conversion_count: 150, cost: 300000, revenue_generated: 4500000, status: 'active' }
  ];
  await supabase.from('esb_campaigns').insert(campaigns);
  console.log('✅ esb_campaigns seeded');

  // 8. esb_referrals
  const referrals = [];
  if (members && members.length > 1) {
    for (let i = 0; i < 20; i++) {
      const referrer = randomItem(members).member_code;
      const referred = randomItem(members).member_code;
      if (referrer !== referred) {
        referrals.push({
          referrer_member_code: referrer,
          referred_member_code: referred,
          reward_granted: true,
          reward_value: 50000
        });
      }
    }
    if (referrals.length > 0) {
      await supabase.from('esb_referrals').insert(referrals);
      console.log('✅ esb_referrals seeded');
    }
  }

  // 9. esb_taxes_and_service
  const taxes = [];
  if (orders && orders.length > 0) {
    for (let i = 0; i < Math.min(200, orders.length); i++) {
      const ord = orders[i];
      const subtotal = ord.subtotal || (ord.total_payment / 1.15);
      const tax = subtotal * 0.10; // 10% PB1
      const service = subtotal * 0.05; // 5% Service Charge
      taxes.push({
        order_id: ord.order_id,
        subtotal: subtotal,
        tax_amount: tax,
        service_charge: service
      });
    }
    await supabase.from('esb_taxes_and_service').insert(taxes);
    console.log('✅ esb_taxes_and_service seeded');
  }

  console.log('--- Phase 4 Seeding Complete ---');
}

seed().catch(console.error);
