import { createClient } from '@supabase/supabase-js'

const VITE_SUPABASE_URL = "https://yruvfbjilqwvlyngqtua.supabase.co"
const VITE_SUPABASE_PUBLISHABLE_KEY ="sb_publishable_jU8Qkw81XrAjIxgJfwkdNw_VEsm6O9d"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

