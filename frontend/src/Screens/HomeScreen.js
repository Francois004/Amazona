import React ,{useEffect, useState} from 'react';
import {  Link, BrowserRouter  } from 'react-router-dom';
import { listProducts } from '../actions/productsActions';
import { useDispatch,useSelector} from 'react-redux';

function HomeScreen(props) {
  
 const productList=useSelector(state=>state.productList);
 const {products,loading,error}=productList;
  
  const dispatch=useDispatch();

  useEffect(()=>{
   dispatch(listProducts())
    return ()=>{

    };
  },[])
    return <div>
  { loading?<div>Loading ...</div>:
     error?<div>{error}</div>:(
        <ul className="products">
                      {
                        products.map(product =>
                          <li key={product._id}>
                              <Link to={'/product/'+ product._id}>
                          <div className="product" >
                              <img src={product.image} alt="product" className="product-image"></img>
                              <div className="product-name">
                                 
                                    {product.name}
                              </div>
                              <div className="product-brand">
                              {product.brand}
                              </div>
                              <div className="product-price">
                                ${product.price}
                              </div>
                              <div className="product-rating">
                              {product.rating} Stars
                               </div>

                          </div>
                          </Link>
                      </li>
                          )
                      }
                       
                        
                    </ul>
    )}
    </div>
}
export default HomeScreen;