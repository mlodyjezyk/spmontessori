import { createClient } from '@supabase/supabase-js'

const PROJECT_ID = 'dswrracvdumhvmcujwao'
const ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd3JyYWN2ZHVtaHZtY3Vqd2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MTc1ODQsImV4cCI6MjA4NTM5MzU4NH0.4OscamXisiVddLz-skaqQJ9R0kTBFXzq__UXTkob9GA'

const supabaseUrl = `https://${PROJECT_ID}.supabase.co`

export const supabase = createClient(supabaseUrl, ANON_KEY)
export const serverUrl = `${supabaseUrl}/functions/v1/make-server-0b96ed2e`
