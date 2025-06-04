import { supabase } from "../supabase/client";

type TablesInsert = {
  id: string;
  email: string;
  phone_number: string;
  address: string;
  created_date?: string;
  is_deleted?: boolean;
};

// Correct way to define userData
/*const userData: TablesInsert = {
  id: "hsdiwoweowioweoweoweo",
  email: "mba@gmail.com",
  phone_number: "7878788778",
  address: "dhehehehihiej",
};*/

// Function to create a user in the users table
export async function createUser(userData: TablesInsert) {
  const { data, error } = await supabase.from('users').insert(userData).select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Usage example:
// createUser(userData).then(data => console.log(data)).catch(err => console.error(err));