import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local")
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setup() {
  console.log("Checking if founder user exists...")
  
  // Since there is no direct lookup by email without fetching all users or using specific methods, 
  // we will just attempt to create it. Supabase will error if it already exists.
  
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: 'founder@calf.one',
    password: '123456',
    email_confirm: true,
    user_metadata: {
      role: 'founder'
    }
  })

  if (error) {
    if (error.message.includes('already registered')) {
      console.log("User founder@calf.one already exists. Updating metadata just in case...")
      // If we really wanted to update, we'd need the user ID. We can fetch users.
      const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers()
      if (!listError) {
        const user = users.find(u => u.email === 'founder@calf.one')
        if (user) {
          await supabaseAdmin.auth.admin.updateUserById(user.id, {
            user_metadata: { role: 'founder' }
          })
          console.log("Metadata updated successfully.")
        }
      }
    } else {
      console.error("Error creating user:", error)
    }
  } else {
    console.log("Successfully created user founder@calf.one")
  }
}

setup()
