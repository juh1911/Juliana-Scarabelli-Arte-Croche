// src/services/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://oszsrkyaesfqpogtbrkz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zenNya3lhZXNmcXBvZ3Ricmt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMjI2MzcsImV4cCI6MjA5Nzc5ODYzN30.8IezQ4h0FAGNUS6pAEIO46LOHhbYrLBlwDo0KEHWhmg"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)