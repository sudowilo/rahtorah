import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
console.log(supabaseUrl, supabaseAnonKey);

if (!supabaseAnonKey || !supabaseUrl){
    throw new Error("missing supabase env variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;