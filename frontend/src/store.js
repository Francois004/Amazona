import {createStore,combineReducers } from 'redux';
import {productListReducer, productDetailsReducer, productSaveReducer,productDeleteReducer} from './reducers/productReducer';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { applyMiddleware,compose } from "redux"
import {cartReducer} from "./reducers/cartReducer";
import { userSigninReducer,userRegisterReducer } from './reducers/userReducer';

const cartItems=Cookie.getJSON("cartItems") || [];
const userSignin=Cookie.getJSON("userInfo") || {};
//console.log(cartItems)
const initialState={
 cartItems,
  userSignin
};
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cartItems:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer

})
const composeEnhancer= window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;