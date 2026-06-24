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

async function seed() {
  console.log("Seeding Branches...");
  const branches = [];
  const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Bali', 'Yogyakarta', 'Semarang', 'Makassar', 'Palembang', 'Balikpapan'];
  for (let i = 0; i < 10; i++) {
    const city = cities[i];
    branches.push({
      branch_code: `BRC-${randomInt(100, 999)}`,
      branch_name: `Calf ${city} Reserve`,
      city: city,
      address: `Jl. Sudirman No. ${randomInt(1, 100)}, ${city}`,
      region: randomItem(['West', 'Central', 'East']),
      is_active: true
    });
  }
  const { data: insertedBranches, error: branchErr } = await supabase.from('branches').insert(branches).select('id');
  if (branchErr) console.error("Error inserting branches:", branchErr);
  else console.log(`Seeded ${insertedBranches.length} branches successfully!`);

  console.log("Seeding Branch Infrastructures...");
  const { data: allBranches } = await supabase.from('branches').select('id');
  if (allBranches && allBranches.length > 0) {
    const infras = [];
    for (const b of allBranches) {
      infras.push({
        branch_id: b.id,
        cctv_status: randomItem(['online', 'online', 'offline']),
        internet_status: randomItem(['online', 'online', 'offline']),
        last_checked: new Date().toISOString()
      });
    }
    const { error: infraErr } = await supabase.from('branch_infrastructures').insert(infras);
    if (infraErr) console.error("Error inserting infrastructures:", infraErr);
    else console.log(`Seeded ${infras.length} infrastructures successfully!`);
  }

  console.log("Seeding Inventories...");
  const inventories = [];
  const items = [
    'Kopi Robusta', 'Kopi Arabika', 'Susu Segar', 'Gula Aren', 'Sirup Vanilla', 'Sirup Caramel', 'Sirup Hazelnut', 
    'Matcha Powder', 'Cokelat Bubuk', 'Teh Hitam', 'Teh Hijau', 'Daging Sapi (Patty)', 'Roti Burger', 'Keju Slice',
    'Kentang Goreng', 'Minyak Goreng', 'Garam', 'Lada Hitam', 'Saus Tomat', 'Saus Sambal', 'Mayones'
  ];
  const uoms = ['Kg', 'Kg', 'Liter', 'Kg', 'Botol', 'Botol', 'Botol', 'Kg', 'Kg', 'Kg', 'Kg', 'Pcs', 'Pcs', 'Pack', 'Pack', 'Liter', 'Pack', 'Pack', 'Botol', 'Botol', 'Botol'];
  
  if (allBranches && allBranches.length > 0) {
    for (let i = 0; i < items.length; i++) {
      inventories.push({
        item_name: items[i],
        current_stock: randomInt(10, 500),
        minimum_stock: randomInt(20, 50),
        unit: uoms[i],
        branch_id: randomItem(allBranches).id
      });
    }
    const { error: invErr } = await supabase.from('inventories').insert(inventories);
    if (invErr) console.error("Error inserting inventories:", invErr);
    else console.log(`Seeded ${inventories.length} inventories successfully!`);
  }
}

seed().catch(console.error);
