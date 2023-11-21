// supabase.js

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Use the environment variables for Supabase connection
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Check if the required environment variables are set
if (!supabaseUrl || !supabaseKey)
{
    throw new Error('Supabase URL and API key are required in the .env file.');
}

// Create a reusable Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
