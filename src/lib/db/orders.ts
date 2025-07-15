import { supabase } from "@/lib/supabase/client";

interface OrderItemInput {
  product_id: string;
  quantity: number;
  price: number;
  colors?: string[];
  models?: string[];
}

interface CreateOrderWithItemsParams {
  user_id: string;
  total_amount: number;
  items: OrderItemInput[];
}

interface Order {
  id: string;
  customer_id: string;
  total_amount: number;
  track_id: string;
  status: boolean;
  created_at?: string;
  // Add other fields as needed
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  price: number;
  quantity: number;
  colors: string[];
  models: string[];
  // Add other fields as needed
}

/**
 * Inserts a new order and its items into the database.
 * @param {CreateOrderWithItemsParams} params
 * @returns {Promise<{ order: Order, order_items: OrderItem[] }>} The inserted order and order_items
 */
export async function createOrderWithItems({ user_id, total_amount, items }: CreateOrderWithItemsParams): Promise<{ order: Order, order_items: OrderItem[] }> {
  // Insert into orders table
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        customer_id: user_id,
        total_amount,
        track_id: '0',
        status: false,
      },
    ])
    .select()
    .single();

  if (orderError || !order) throw orderError || new Error('Order insert failed');

  // Prepare order_items
  const orderItemsPayload = items.map((item: OrderItemInput) => ({
    order_id: order.id,
    product_id: item.product_id,
    price: item.price,
    quantity: item.quantity,
    colors: item.colors || [],
    models: item.models || [],
  }));

  // Insert into order_items table
  const { data: order_items, error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsPayload)
    .select();

  if (itemsError) throw itemsError;

  return { order, order_items };
}

export async function getAllordersByUserID(user_id:string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items(*, 
      products(*)
      )`)
    .eq('is_deleted', false)
    .eq('customer_id',user_id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

