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

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

async function seedVouchers() {
  const { data: members } = await supabase.from('members').select('member_code');
  if (members && members.length > 0) {
    const vouchers = [];
    for (let i = 0; i < 50; i++) {
      const d = new Date();
      d.setDate(d.getDate() + randomInt(-30, 60));
      vouchers.push({
        voucher_code: `VCH-${randomInt(100000, 999999)}`,
        member_code: randomItem(members).member_code,
        discount_value: randomItem([10000, 20000, 50000, 15]),
        status: d < new Date() ? 'Expired' : randomItem(['Active', 'Used']),
        expiry_date: d.toISOString()
      });
    }
    const { error } = await supabase.from('esb_vouchers').insert(vouchers);
    if (error) console.error("Error inserting vouchers:", error);
    else console.log("Seeded 50 vouchers successfully!");
  }
}

seedVouchers().catch(console.error);
