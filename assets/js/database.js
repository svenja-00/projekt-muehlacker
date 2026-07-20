// ===================================================
// Supabase
// ===================================================

const SUPABASE_URL = "https://qemgdhqfjhfhmlxplthw.supabase.co";
const SUPABASE_KEY = "sb_publishable_-6MQh2wGk0bk-WS2jNDmoA_zpSpLFy0";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("DB:", db);