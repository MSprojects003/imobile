import { supabase } from "../supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

type TablesInsert = {
  id: string;
  email: string;
  phone_number: string;
  address: string;
  created_date?: string;
  is_deleted?: boolean;
};

type UserResponse = {
  data: any[] | null;
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