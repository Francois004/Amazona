import axios from 'axios';
 import {PRODUCT_SAVE_REQUEST,PRODUCT_SAVE_FAIL,PRODUCT_SAVE_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST} from '../constants/productConstants'


const listProducts=()=> async (dispatch)=>{
    try{
    dispatch({type:PRODUCT_LIST_REQUEST});
    await axios.get("/api/products").then((res)=>{
      console.log("data",res.data)
      dispatch({type:PRODUCT_LIST_SUCCESS,payload:res.data});
      }).catch(e=>{
        console.log("error",e)
      })
     
    
    }
    catch(error){
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message});
   console.log(error)
      }
}
const saveProduct=(product)=> async(dispatch,getState)=>{
try{
dispatch({type:PRODUCT_SAVE_REQUEST,payload:product});
const {userSignin:{userInfo}}=getState();
if(product._id){
  await axios.post("/api/products",product,{headers:{
    'Authorisation':'Bearer' + userInfo.token
  }}).then(res=>{
    dispatch({type:PRODUCT_SAVE_SUCCESS,payload:res.data})
  })
}
else{
  await axios.put("/api/products" + product._id,product,{headers:{
    'Authorisation':'Bearer' + userInfo.token
  }}).then(res=>{
    dispatch({type:PRODUCT_SAVE_SUCCESS,payload:res.data})
  })
}

}catch(error){
  dispatch({type:PRODUCT_SAVE_FAIL,payload:error.message});

}

}




const detailsProduct=  (productId)=>async (dispatch)=>{
  try{
    dispatch({type:PRODUCT_DETAILS_REQUEST,payload:productId})
    
    await axios.get("/api/products/" + productId).then((res)=>{
      dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:res.data});
        }).catch(e=>{
          console.log(e)
        })
  }
  catch(error){
    dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.message});
  }
}
const deleteProduct=  (productId)=>async (dispatch,getState)=>{
  try{
    const {userSignin:{userInfo}}=getState();
    dispatch({type:PRODUCT_DELETE_REQUEST,payload:productId})
    
    await axios.delete("/api/products/" + productId,{headers:{
      Authorization:'Bearer' + userInfo.token}
    }).then((res)=>{
      dispatch({type:PRODUCT_DELETE_SUCCESS,payload:res.data,success:true});
        }).catch(e=>{
          console.log(e)
        })
  }
  catch(error){
    dispatch({type:PRODUCT_DELETE_FAIL,payload:error.message});
  }
}
export {listProducts,detailsProduct,saveProduct,deleteProduct};