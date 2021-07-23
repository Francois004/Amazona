import React from 'react';
import { Route, Link, BrowserRouter  } from 'react-router-dom'  
import './App.css';
import { useSelector,useDispatch } from 'react-redux';
import ProductScreen from './Screens/ProductScreen';
import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProductsScreen from './Screens/ProductsScreen';



function App() {
 
  const userSignin=useSelector(state=>state.userSignin)
  const  userInfo=userSignin.userInfo

  const openMenu=()=>{
    document.querySelector('.sidebar').classList.add('open') 
  }
  const closeMenu=()=>{
    document.querySelector('.sidebar').classList.remove('open')
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button >
                     &#9776;
                    </button>
                    <Link to="/">amazona</Link>
                    
                </div>
               
            <div className="header-links">
          <a href="index.html">
          Cart
          </a>
         {
            userInfo ?  <Link to="/profile">{userInfo.name}</Link> 
            :  <Link to="/signin"> Sign in</Link>
          }
        
          
          </div>
                  
            </header>
           <aside className="sidebar">
               <button >X</button>
               <h3>Shopping Categories</h3>
               <ul>
                   <li >
                    <a href="index.html">Paints</a>
                   </li>
                   <li>
                    <a href="index.html">Shirts</a>
                </li>
               </ul>


           </aside>
           
            <main className="main">
                <div className="content">
                  <Route path="/products" component={ProductsScreen} />
                <Route path="/register" component={RegisterScreen} />
                  <Route path="/signin" component={SigninScreen} />
                  <Route path="/product/:id" component={ProductScreen} />
                  <Route path="/cart/:id?" component={CartScreen} />
                  <Route path="/" exact={true} component={HomeScreen} />
                    
                </div>
               
            </main>
          
            <footer className="footer">
                Tous droits réservés.
            </footer>
        </div>
        </BrowserRouter>
   
  );
}

export default App;
