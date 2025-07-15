import { supabase } from "../supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

type TablesInsert = {
  id: string;
  email: string;
  phone_number: string;
  address: string;
  full_name: string; // Added full_name
  city: string;      // Added city
  created_date?: string;
  is_deleted?: boolean;
};


type UserResponse = {
  data: Record<string, unknown>[] | null;
  error: PostgrestError | null;
};

// Correct way to define userData
/*const userData: TablesInsert = {
  id: "hsdiwoweowioweoweoweo",
  email: "mba@gmail.com",
  phone_number: "7878788778",
  address: "dhehehehihiej",
};*/

// Function to create a user in the users table
export async function createUser(userData: TablesInsert): Promise<UserResponse> {
  const { data, error } = await supabase.from('users').insert(userData).select('*');

  if (error) {
    return { data: null, error };
  }
  return { data, error: null };
}

// Usage example:
// createUser(userData).then(data => console.log(data)).catch(err => console.error(err));

// Function to get authenticated user
export async function getAuthUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function UserDetialsByID(userid:string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id',userid)
    .single();
  if (error) throw error;
  return data;
}