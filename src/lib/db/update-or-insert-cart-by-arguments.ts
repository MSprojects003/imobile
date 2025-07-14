import { supabase } from "../supabase/client";

 

export async function updateOrInsertCartBYArgumants(productID : string, userID: string,colors: string[],models:string[],quantity:number ) {
  console.log("get updateOrInsertCartBYArgumants:", {
    productID,
    userID,
    colors,
    models,
   quantity,
  });

  const { data: result, error } = await supabase.rpc("update_or_insert_cart_by_arguments", {
    p_product_id:productID,
    p_user_id:userID, 
    p_colors: colors,
    p_models:models,
    p_quantity:quantity,
     
  });

  if (error) {
    console.error("Error updateOrInsertCartBYArgumants:", error);
    throw error;
  }

  console.log("Successful updateOrInsertCartBYArgumants:", result);
  return result;
}
