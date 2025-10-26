import { Routes, Route } from "react-router-dom";
import Authlayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashBoard from "./pages/admin-view/dashboard";
import AdminFeature from "./pages/admin-view/features";
import AdminOrder from "./pages/admin-view/order";
import AdminProduct from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import CheckAuth from "./components/common/CheckAuth";
import UnAuthPage from "./pages/unauth-pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//import checkAuth from "./components/common/CheckAuth";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CheckAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log(isLoading, user);


  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/** common components */}
     {/* <h1>Header components</h1> */ }

      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Authlayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="feature" element={<AdminFeature />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="products" element={<AdminProduct />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} /> v   
      </Routes>
    </div>
  );
}

export default App;
