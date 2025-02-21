import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home/Home"
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import { ToastContainer } from "react-toastify";
import MyOrders from "./pages/MyOrder/MyOrders";
import Verify from "./pages/Verify/Verify";
import Dashboard from "./pages/Dashboard/Dashboard";
import Error from "./pages/Error/Error";
import Food from "./pages/FoodSearch/Food";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Add from "./admin/Add/Add";
import List from "./admin/List/List";
import Update from "./admin/Update/Update";
import Login from "./components/Login/Login";
import Orders from "./admin/Orders/Orders";

export default function App() {

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/food" element={<Food />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes wrapped with PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* admin route */}
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/orders" element={<Orders />} />
          </Route>

          {/* Fallback/Error Route */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}