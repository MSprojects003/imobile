import { supabase } from "@/lib/supabase/client";

export async function insertCartItem(
  user_id: string,
  product_id: string,
  quantity: number,
  colors: string[],
  models: string[]
) {
  const { data, error } = await supabase
    .from("cart")
    .insert([
      {
        user_id,
        product_id,
        quantity,
        colors: colors as any, // Supabase expects array for text[]
        models: models as any, // Supabase expects array for text[]
      },
    ])
    .select();
  if (error) throw error;
  return data;
}

export async function getCartCountByUserId(userId: string) {
  const { count, error } = await supabase
    .from("cart")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_deleted", false);
  if (error) throw error;
  return count || 0;
}

export async function deleteCartItemById(id: string) {
  const { data, error } = await supabase
    .from("cart")
    .update({ is_deleted: true })
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

export async function deleteCartItemsByIds(ids: string[]) {
  const { data, error } = await supabase
    .from("cart")
    .update({ is_deleted: true })
    .in("id", ids)
    .select();
  if (error) throw error;
  return data;
}

type TablesInsert = {
  id: string;
  productid: string;
  userid: string;
  quantity: string;
  colors: string;
  models?: boolean;
};
export async function getCartByUserId(userId: string) {
  const { data, error } = await supabase
    .from("cart")
    .select("*, products(*)")
    .eq("user_id", userId)
    .eq("is_deleted", false);
  if (error) throw error;
  return data;
}
 