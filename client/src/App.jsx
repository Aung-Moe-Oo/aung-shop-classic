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
  Outlet,
} from "react-router-dom";
import Success from "./pages/Success";
import Searched from "./pages/Searched";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import { useContext } from "react";
import { AuthContext } from "./redux/authContextProvider";
import EditProduct from "./pages/EditProduct";
import PropTypes from "prop-types";

const ProtectedRoute = ({ currentUser }) => {
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  currentUser: PropTypes.string.isRequired,
};

const App = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/admin/*" element={<Navigate to="/login" replace />} />

        <Route element={<ProtectedRoute currentUser={currentUser} />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/add-product" element={<CreateProduct />} />

          <Route path="/dashboard/:id" element={<EditProduct />} />
        </Route>

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
