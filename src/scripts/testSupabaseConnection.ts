const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase.from("stories").select("*").limit(1);

  if (error) {
    console.error("Error connecting to Supabase:", error);
  } else {
    console.log("Supabase connection successful. Data:", data);
  }
}

testConnection();
