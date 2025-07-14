import { supabase } from "../supabase/client";

export async function getAllBanners() {
    const { data, error } = await supabase
      .from('hero')
      .select('*')
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }