import Axios from 'axios';
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST } from '../constants/userConstants';

const signin=(email,password)=>async (dispatch)=>{
  
    dispatch({
        type:USER_SIGNIN_REQUEST,payload:{email,password}      
})
try{
   
   const {data}= await Axios.post("/api/users/signin",{
     email,password   
    })
       
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
      //  console.log(data)
        Cookie.set('userInfo',JSON.stringify(data))
    
}
catch(error){
    dispatch({type:USER_SIGNIN_FAIL,payload:error.message});
}
}

const register=(name,email,password)=>async (dispatch)=>{
  
    try{
        dispatch({
            type:USER_REGISTER_REQUEST,payload:{name,email,password}      
    })
       await Axios.post("/api/users/register",{name,
         email,password   
        }).then(res=>{
            dispatch({type:USER_REGISTER_SUCCESS,payload:res.data});
            Cookie.set('userInfo',JSON.stringify(res.data))
        })
    }
    catch(error){
        dispatch({type:USER_REGISTER_FAIL,payload:error.message});
    }
    }
export {signin,register};