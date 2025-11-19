import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bomejosaxanotwmqudpi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbWVqb3NheGFub3R3bXF1ZHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDA3MzIsImV4cCI6MjA3OTExNjczMn0.ab9vzvPO2QJeMSfcRcc-oBspvNmg4GPp3ZMWhNmiUq8";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
