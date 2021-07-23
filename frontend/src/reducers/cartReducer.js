import { CART_ADD_ITEM, REMOVE_TO_CART } from "../constants/cartConstants";

function cartReducer(state={cartItems:[]},action){
    switch(action.type){
        case CART_ADD_ITEM:
            const item=action.payload;
            const product=state.cartItems.find(x=>x.product=== item.product);
            if(product){
                return{ 
                  cartItems:
                    state.cartItems.map(x=>x.product===product.product ? product:x)

                }
            }
             return { cartItems:[...state.cartItems, item]}
        case REMOVE_TO_CART:
          return {cartItems:state.cartItems.filter(x=>x.product!=action.payload)}    
        default:
          return state;
        }
}
export {cartReducer};