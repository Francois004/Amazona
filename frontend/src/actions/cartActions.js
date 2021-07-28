import axios from "axios"
import Cookie from 'js-cookie';
import  { CART_ADD_ITEM, REMOVE_TO_CART } from "../constants/cartConstants"
const addToCart=(productId,qty)=> async (dispatch, getState)=>{
    try{
        await axios.get("/api/products/" + productId).then((res)=>{
            const data=res.data
            dispatch({
                type:CART_ADD_ITEM,
               payload:{
                product:data._id,
                name:data.name,
                image:data.image,
                price:data.price,
                countInStock:data.countInStock,
                qty
               } 
            });

     // const mystate=getState();
     const {cartItems}=getState();
    // console.log("act",getState())
     Cookie.set("cartItems",JSON.stringify(cartItems))

        }).catch(e=>{
            console.log("error in cart",e)
        })

    }
    catch(error){
       console.log("err addtocart",error)
    }
}
const removeFromCart=(productId)=>(dispatch,getState)=>{
   dispatch({type: REMOVE_TO_CART,payload:productId})
   const {cartItems}=getState();
     Cookie.set("cartItems",JSON.stringify(cartItems))
  
}
export {addToCart,removeFromCart}