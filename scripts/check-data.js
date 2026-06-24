const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) env[key.trim()] = value.join('=').trim();
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY']);

async function check() {
  const tables = [
    'orders', 'order_items', 'members', 'branches', 'inventories', 
    'branch_infrastructures', 'social_sentiments', 'customer_complaints', 
    'risk_alerts', 'ai_insights', 'expansion_proposals',
    'esb_payments_ledger', 'esb_voids_refunds', 'esb_purchase_orders',
    'esb_recipes', 'esb_point_transactions', 'esb_vouchers'
  ];

  const results = {};
  for (const t of tables) {
    const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true });
    if (error) {
      results[t] = `ERROR: ${error.message}`;
    } else {
      results[t] = count;
    }
  }

  console.log(JSON.stringify(results, null, 2));
}

check().catch(console.error);
