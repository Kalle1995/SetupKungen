import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'; // Importerat Outlet här
import { useCart } from './hooks/useCart'; 
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import Login from './pages/Login/Login';
import Checkout from './pages/Checkout/Checkout'; 
import CartDrawer from './components/CartDrawer/CartDrawer';
import SearchResults from './pages/SearchResults/SearchResults';
import AddProduct from './pages/AddProduct/AddProduct';
import DeleteProduct from './pages/DeleteProduct/DeleteProduct';
import Contact from './pages/Contact/Contact'; 
import Returns from './pages/Returns/Returns';
import GiftCards from './pages/GiftCards/GiftCards'; 
import Shipping from './pages/Shipping/Shipping'; 
import Payment from './pages/Payment/Payment'; 
import Terms from './pages/Terms/Terms'; 
import About from './pages/About/About'; 
import Sustainability from './pages/Sustainability/Sustainability'; 
import Careers from './pages/Careers/Careers'; 
import Header from './components/Header/Header'; // Importerat Header för layouten
import Footer from './components/Footer/Footer'; // Importerat Footer för layouten
import './App.css';

// --- LAYOUT-KOMPONENT SOM SKÖTER HEADER & FOOTER FÖR DET VALDA SIDORNA ---
const ShopLayout = ({ cartCount, onCartClick }) => {
  return (
    <>
      <Header cartCount={cartCount} onCartClick={onCartClick} />
      <Outlet /> {/* Här laddas den matchande undersidan automatiskt */}
      <Footer />
    </>
  );
};

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
        {/* ================= GLOBLAL LAYOUT (HEADER + FOOTER INKLUDERAT) ================= */}
        <Route element={<ShopLayout cartCount={cartItems.length} onCartClick={openCart} />}>
          
          <Route path="/" element={<Home />} />
          
          <Route path="/category/:name" element={<CategoryPage onAddToCart={addToCart} />} />
          
          <Route path="/product/:name" element={<ProductDetails onAddToCart={addToCart} />} />

          <Route path="/checkout" element={
            <Checkout 
              cartItems={cartItems} 
              cartCount={cartItems.length} 
              onCartClick={openCart}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          } />

          <Route path="/search" element={<SearchResults onAddToCart={addToCart} />} />   
          
          {/* Dina 9 statiska sidor som nu automatiskt får Header & Footer */}
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/returns" element={<Returns />} />
          <Route path="/giftcards" element={<GiftCards />} />
          <Route path="/shipping" element={<Shipping />} /> 
          <Route path="/payment" element={<Payment />} />
          <Route path="/terms" element={<Terms />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/sustainability" element={<Sustainability />} /> 
          <Route path="/careers" element={<Careers />} />
        </Route>

        {/* ================= UTANFÖR LAYOUT (INGEN HEADER ELLER FOOTER) ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
      </Routes>
    </Router>
  );
}

export default App;