import { Routes, Route } from "react-router-dom";

// =====================================================
// USER / PUBLIC
// =====================================================

import Home from "./pages/Home";
import LoginForm from "./features/auth/LoginForm";
import SignupForm from "./features/auth/SignupForm";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import ProfilePage from "./pages/ProfilePage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

// =====================================================
// ROUTE PROTECTION
// =====================================================

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";

// =====================================================
// ADMIN
// =====================================================

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";
import AdminProducts from "./admin/AdminProducts";
import AdminCustomers from "./admin/AdminCustomers";
import AdminProductCreate from "./admin/AdminProductCreate";
import AdminGrowth from "./admin/AdminGrowth";
import AdminDiscounts from "./admin/AdminDiscounts";
import AdminContent from "./admin/AdminContent";
import AdminMarkets from "./admin/AdminMarkets";
import AdminFinance from "./admin/AdminFinance";
import AdminAnalytics from "./admin/AdminAnalytics";
import AdminProductEdit from "./admin/AmdinProductEdit";
import Search from "./pages/Search";


function App() {

  return (
    <Routes>

      {/* =================================================
                NORMAL USER / PUBLIC ROUTES
            ================================================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

      {/* =================================================
                USER PROTECTED ROUTES
            ================================================= */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

      </Route>

      {/* search route  */}
      <Route path="/search" element={<Search />} />

      {/* =================================================
                LOGIN / SIGNUP
            ================================================= */}

      <Route element={<PublicRoute />}>

        <Route
          path="/login"
          element={<LoginForm />}
        />

        <Route
          path="/signup"
          element={<SignupForm />}
        />

      </Route>


      {/* =================================================
                ADMIN ROUTES
            ================================================= */}

      <Route
        path="/admin"
        element={<AdminRoute />}
      >

        {/* AdminRoute gives us <Outlet />.
                    AdminLayout will be rendered inside it. */}

        <Route
          element={<AdminLayout />}
        >

          {/* /admin */}
          <Route
            index
            element={<AdminDashboard />}
          />

          {/* /admin/products */}
          <Route
            path="products"
            element={<AdminProducts />}
          />

          {/* /admin/products/new */}
          <Route
            path="products/new"
            element={<AdminProductCreate />}
          />

          {/* /admin/orders */}
          <Route
            path="orders"
            element={<AdminOrders />}
          />

          {/* /admin/customers */}
          <Route
            path="customers"
            element={<AdminCustomers />}
          />

          {/* /admin/growth */}
          <Route
            path="growth"
            element={<AdminGrowth />}
          />

          {/* /admin/discounts */}
          <Route
            path="discounts"
            element={<AdminDiscounts />}
          />

          {/* /admin/content */}
          <Route
            path="content"
            element={<AdminContent />}
          />

          {/* /admin/markets */}
          <Route
            path="markets"
            element={<AdminMarkets />}
          />

          {/* /admin/finance */}
          <Route
            path="finance"
            element={<AdminFinance />}
          />

          {/* /admin/analytics */}
          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />
          {/* edit */}
          <Route
            path="products/edit/:id"
            element={<AdminProductEdit />}
          />


        </Route>

      </Route>

    </Routes>
  );
}

export default App;