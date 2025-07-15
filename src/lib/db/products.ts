import { supabase } from "../supabase/client";
 

// Database schema interface matching the table structure
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  brand: string;
  models: string[];
  colors: string[];
  image: string;
  back_image: string | null;
  discount: number | null;
  created_at: string | null;
  updated_at: string | null;
  is_deleted: boolean;
  discount_added: boolean;
  discounted_price: number | null;
}

export async function getproductsMedia() {
  try {
    const { data, error } = await supabase
      .storage
      .from('products')
      .list('', {
        limit: 100,
        offset: 0,
      })

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Error fetching products media:", err);
    return null;
  }
}

// Fetch a product by its UUID
export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function getAllProductList() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_deleted', false)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getProductsByCategoryAndBrand(category: string, brand: string, excludeProductId?: string, limit: number = 4) {
  let query = supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('brand', brand)
    .eq('is_deleted', false)
    .limit(limit);

  if (excludeProductId) {
    query = query.neq('id', excludeProductId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}


export async function getRelatedProducts(category: string, brand: string, excludeProductId?: string, limit: number = 4) {
  // 1. Try to get products matching both category and brand
  const { data: both, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('brand', brand)
    .eq('is_deleted', false)
    .neq('id', excludeProductId)
    .limit(limit);

  if (error) throw error;
  if (both && both.length >= limit) return both;

  // 2. If not enough, get products matching only category or only brand
  const ids = both ? both.map(p => p.id) : [];
  const { data: either, error: error2 } = await supabase
    .from('products')
    .select('*')
    .or(`category.eq.${category},brand.eq.${brand}`)
    .eq('is_deleted', false)
    .neq('id', excludeProductId)
    .not('id', 'in', `(${ids.join(',')})`)
    .limit(limit - (both ? both.length : 0));

  if (error2) throw error2;

  return [...(both || []), ...(either || [])].slice(0, limit);
}
