import './App.css'

import Header from "./components/Header";
import Product from "./components/Product"
import Cart from "./components/Cart"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import commerce from './lib/commerce';
import { useEffect, useState } from 'react';
import Checkout from './components/Checkout';
import ThankYouPage from './components/ThankYouPage';
// import { useEventCallback } from '@mui/material';

const App = () => {
  const [productList , setproductList] = useState([])
  const [productListbyCategory , setproductListbyCategory] = useState([])
  const [cart , setcart] = useState([])
  const [categories , setcategories] = useState([])

  const fetchProducts = async()=>{
    const res = await commerce.products.list();
    // console.log(res)
    setproductList(res.data)
  }

  const getProductsbyCategory = async(category)=>{
    const res = await commerce.products.list({
      category_slug : [category]
    })
    setproductListbyCategory(res.data)
  }
  const AddtoCart = async (prdId , qnty)=>{
    const res = await commerce.cart.add(prdId , qnty)
    // console.log(res)
    setcart(res.cart)
  }
  const Fetchcart = async()=>{
    setcart( await commerce.cart.retrieve())
  }
  const RemovefromCart = async(prdid)=>{
    const res =await commerce.cart.remove(prdid)
    setcart(res.cart)
    console.log("removed item from cart")
  }

  const fetchCategories = async()=>{
    const res =await commerce.categories.list();
    console.log(res)
    setcategories(res.data)
  }
  useEffect(()=>{
    fetchProducts();
    Fetchcart();
    fetchCategories();
    
  },[])
  return (
    <Router>
      <div className='app'>
        <Header cart={cart} categorylist={categories}/>
        <Routes>
          {/* Route for home */}
          <Route exact path='/' element={
            <>
              <div className="banner">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2022/BAU/ATFGW/3000x1200_best_find_coupon._CB636934541_.jpg" alt="" />
              </div>
              <Product productlist={productList} addtocart={AddtoCart}/>
            </>
          } />
          {/*Route for Cart  */}
          <Route path='/cart' element={<Cart cart={cart} removefromcart={RemovefromCart}/>}/>
          {/* for categories */}
          <Route path='/category/:slug' element={
            <>
                <div style={{marginBottom:"300px"}}> </div>
                <Product productlist={productListbyCategory} loadFunc={getProductsbyCategory}  addtocart={AddtoCart}/>
            
            </>
            
          }/>
          <Route path='/checkout' element={<Checkout cart={cart}/>}/>
          <Route path='/thankyou' element={<ThankYouPage/>}/>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
