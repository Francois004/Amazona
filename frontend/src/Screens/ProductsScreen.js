import React,{useEffect, useState} from 'react';
import '../style.css';
import { Route, Link, BrowserRouter  } from 'react-router-dom' ;
import { useSelector,useDispatch } from 'react-redux';
import { saveProduct } from '../actions/productsActions';
import { listProducts } from '../actions/productsActions';
import { deleteProduct } from '../actions/productsActions';


function ProductsScreen(props) {
 const [modalVisible,setModalVisible]=useState(false)
 const [id,setId]=useState('');
 const [name,setName]=useState('');
 const [image,setImage]=useState('');
 const [price,setPrice]=useState('');
 const [brand,setBrand]=useState('');
 const [category,setCategory]=useState('');
 const [countInStock,setCount]=useState('');
 const [description,setDescription]=useState('');
 
 const productSave=useSelector(state=>state.productSave);
 const productList=useSelector(state=>state.productList)
 const {products,loading,error}=productList;
 const {loading:loadingSave,error:errorSave,success:successSave}=productSave;
 const productDelete=useSelector(state=>state.productDelete);
 const {loading:loadingDelete,success:successDelete,error:errorDelete}=productDelete;

 const dispatch=useDispatch();
    const submitHandler= (e)=>{
        e.preventDefault();
        dispatch(saveProduct({id,name,price,image,brand,price,category,description,countInStock}))

    }
    const deleteHandler=(product)=>{
        dispatch(deleteProduct(product._id))
    }
    const openModal=(product)=>{
    setModalVisible(true)
     setId(product._id)
     setName(product.name)  
     setPrice(product.price)  
     setImage(product.image)  
     setCount(product.countInStock)  
     setDescription(product.description)  
     setBrand(product.brand)  


    }

    useEffect(()=>{
       dispatch(listProducts());
        return()=>{

        }
    },[successSave,successDelete])

    return <div>
     <div className="content content-marginated">
        <div className="product-header">
    <h3>Products</h3>
      <button className="button primary" onClick={openModal()}>Create Product</button>
        </div>    
    </div>
    {modalVisible &&
     <div className="form" >
       <form onSubmit={submitHandler}>
    <ul className="form-container">
        <li>
            <h2>Create Product</h2>
        </li>
        <li>
         {loadingSave && <div>Loading...</div>}
         {errorSave && <div>{error}</div>}  
        </li>
        <li>
        <label htmlFor="name">
         Name
        </label>
        <input type="text" name="name" value={name} id="name" onChange={(e)=>setName(e.target.value)}>

        </input>
    </li>
  
    <li>
        <label htmlFor="price">
         Price
        </label>
        <input type="text" name="price" value={price} id="price" onChange={(e)=>setPrice(e.target.value)}>

        </input>
    </li>
    <li>
        <label htmlFor="image">
         Image
        </label>
        <input type="text" name="image" value={image} id="image" onChange={(e)=>setImage(e.target.value)}>

        </input>
    </li>
    <li>
        <label htmlFor="brand">
         Brand
        </label>
        <input type="text" name="brand" value={brand} id="brand" onChange={(e)=>setBrand(e.target.value)}>

        </input>
    </li>
    <li>
        <label htmlFor="category">
         Category
        </label>
        <input type="text" name="category" value={category} id="category" onChange={(e)=>setCategory(e.target.value)}>

        </input>
    </li>
    <li>
        <label htmlFor="countInStock">
         countInStock
        </label>
        <input type="text" name="countInStock" value={countInStock} id="category" onChange={(e)=>setCount(e.target.value)}>

        </input>
    </li>
    
    <li>
        <label htmlFor="description">
         Description
        </label>
        <textarea  name="description" value={description} id="description" onChange={(e)=>setDescription(e.target.value)}>

        </textarea>
    </li>
    <li>
    <button type="submit" className="button primary">
   {id?"Update":"Create"} 
     </button> 
    </li>
    <li>
    <button type="submit" className="button secondary" onClick={()=>setModalVisible(false)}>
    Back
     </button> 
    </li>
   
    </ul>

       </form>
    
        </div>
 }
<div className="product-list">
<table>
 <thead>
     <tr>
     <th>ID</th>
    <th>Name</th>
    <th>Price</th>
    <th>Category</th>
    <th>Brand</th>
    <th>Action</th>
    </tr>
</thead>   
<tbody>{
products.map(product=>
    <tr key={product._id}>
      <td>{product._id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>{product.brand}</td>
      <td>
          <button className="button" onClick={()=>openModal(product)}>Edit</button>
          <button className="button" onClick={()=>deleteHandler(product)}>Delete</button>
      </td>
    </tr>
    )
    }
    </tbody>
</table>  

</div>
</div>
}
export default  ProductsScreen;