import React from 'react'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Cart from './screens/Cart'
import MyOrder from './screens/MyOrder'
import AddFood from './screens/AddFood'
import Checkout from './screens/Checkout'
import ConfirmOrder from './screens/ConfirmOrder'
import Admin from './screens/Admin'
import ApproveOrder from './screens/ApproveOrder'


import Home from './screens/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContexReducer';



const App = () => {
  return (
    <CartProvider>
 <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/createuser' element={<Signup />} />
          <Route exact path='/myorder' element={<MyOrder />} />
          <Route exact path='/add-food' element={<AddFood />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/checkout' element={<Checkout />} />
          <Route exact path='/confirm-order' element={<ConfirmOrder />} />
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/approve-order' element={<ApproveOrder />} />
          
          

          
          
        </Routes>
      </div>
    </Router>
    </CartProvider>
   
  )
}

export default App
