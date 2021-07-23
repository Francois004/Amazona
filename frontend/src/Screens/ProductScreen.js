import React,{useEffect, useState} from 'react';
import '../style.css';
import {detailsProduct} from '../actions/productsActions';
import { Route, Link, BrowserRouter  } from 'react-router-dom' ;
import { useSelector,useDispatch } from 'react-redux';
function ProductScreen(props) {
const [qty,setQty]=useState(1)
  const productDetails=useSelector(state => state.productDetails);
  const {product, loading, error}=productDetails;
  const dispatch= useDispatch();

  useEffect(()=>{
      dispatch(detailsProduct(props.match.params.id));
      return ()=>{

      }
  },[])
 const handleAddToCart= () =>{
   props.history.push("/cart/"+props.match.params.id + "?qty="+qty)
  }
    return <div >
        <ul className="back-to-result">
       <li>
       <Link to="/">Back to result</Link>
        </li> 
        </ul>
       {loading? <div>loading..</div>:error?<div>{error}</div>:
           (<div className="details">

            
            <div className="details-image">
            <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
        <ul>
            <li>
        <b>{product.name}</b>
            </li>
            <li>
        <h5>{product.rating} ({product.numReviews} Reviews)</h5>
            </li>
            <li>
        <b>Price: ${product.price}</b>
            </li>
            <li>
        Description:
        <div>
            {product.description}
        </div>
            </li>
        </ul>
            </div>
            <div className="details-action">
            <ul>
                <li>
              Price:  ${product.price}
                </li>
                <li>
              Status:  {product.countInStock>0?"In Stock":"Out to Stock"}
                </li>
                <li className="details-qty">
                   
               <label>Qty:  </label>  <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
        {[...Array(product.countInStock).keys()].map(x=>
            <option key={x+1} value={x+1}>{x+1}</option>
        )}
           </select>
         
                </li>
                <li>
            {product.countInStock>0 &&
             <button className="button" onClick={handleAddToCart}>
             Add to Cart
           </button>
           }
        
             
                </li>
            </ul>
        </div>
        </div>
           )}
        </div>
}
export default ProductScreen;