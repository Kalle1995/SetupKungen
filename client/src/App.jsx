import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCart } from './hooks/useCart'; 
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import Login from './pages/Login/Login';
import Checkout from './pages/Checkout/Checkout'; // GLÖM INTE IMPORTERA DENNA
import CartDrawer from './components/CartDrawer/CartDrawer';
import SearchResults from './pages/SearchResults/SearchResults';
import AddProduct from './pages/AddProduct/AddProduct';
import DeleteProduct from './pages/DeleteProduct/DeleteProduct';
import Contact from './pages/Contact/Contact'; // GLÖM INTE IMPORTERA DENNA
import Returns from './pages/Returns/Returns';
import GiftCards from './pages/GiftCards/GiftCards'; // GLÖM INTE IMPORTERA DENNA
import Shipping from './pages/Shipping/Shipping'; // GLÖM INTE IMPORTERA DENNA
import Payment from './pages/Payment/Payment'; // GLÖM INTE IMPORTERA DENNA
import Terms from './pages/Terms/Terms'; // GLÖM INTE IMPORTERA DENNA
import About from './pages/About/About'; // GLÖM INTE IMPORTERA DENNA
import Sustainability from './pages/Sustainability/Sustainability'; // GLÖM INTE IMPORTERA DENNA
import Careers from './pages/Careers/Careers'; // GLÖM INTE IMPORTERA DENNA
import './App.css';

function App() {
  const { 
    cartItems, 
    isCartOpen, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    openCart, 
    closeCart 
  } = useCart();

  return (
    <Router>
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={closeCart} 
        items={cartItems} 
        onRemove={removeFromCart} 
        onUpdateQuantity={updateQuantity}
      />

      <Routes>
        <Route path="/" element={
          <Home cartCount={cartItems.length} onCartClick={openCart} />
        } />
        
        <Route path="/category/:name" element={
          <CategoryPage 
            cartCount={cartItems.length} 
            onCartClick={openCart} 
            onAddToCart={addToCart} 
          />
        } />
        
        <Route path="/product/:id" element={
          <ProductDetails 
            onAddToCart={addToCart} 
            cartCount={cartItems.length} 
            onCartClick={openCart} 
          />
        } />

        {/* HÄR ÄR DIN NYA KASSA-SIDA */}
        <Route path="/checkout" element={
          <Checkout 
            cartItems={cartItems} 
            cartCount={cartItems.length} 
            onCartClick={openCart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        } />

        <Route path="/login" element={<Login />} />
        
        <Route path="/search" element={
          <SearchResults 
            cartCount={cartItems.length} 
            onCartClick={openCart} 
            onAddToCart={addToCart} 
          />
        } />   

        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/returns" element={<Returns />} />
        <Route path="/giftcards" element={<GiftCards />} />
        <Route path="/shipping" element={<Shipping />} /> 
        <Route path="/payment" element={<Payment />} />
        <Route path="/terms" element={<Terms />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/sustainability" element={<Sustainability />} /> 
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </Router>
  );
}

export default App;