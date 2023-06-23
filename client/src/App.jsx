import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import Searched from "./pages/Searched";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/product/:id" element={<Product />} />

        <Route path="/products/:category" element={<ProductList />} />

        <Route path="/favourites" element={<Favourites />} />

        <Route path="/success" element={<Success />} />

        <Route path="/searched/:name" element={<Searched />} />

        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
