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
    // Log more details about the error
    console.error("Error updateOrInsertCartBYArgumants:", error, error?.message, error?.stack, JSON.stringify(error));
    // Always throw an Error object for consistency
    throw error instanceof Error
      ? error
      : new Error(typeof error === "string" ? error : JSON.stringify(error));
  }

  console.log("Successful updateOrInsertCartBYArgumants:", result);
  return result;
}
