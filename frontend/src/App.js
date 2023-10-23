import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestLawyerPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  LawShopCreatePage,
  LawyerActivationPage,
  LawShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
} from "./routes/Routes.js";

import {
  LawShopDashboardPage,
  LawShopCreateProduct,
  LawShopAllProducts,
  LawShopCreateEvents,
  LawShopAllEvents,
  LawShopAllCoupouns,
  LawShopPreviewPage,
  LawShopAllOrders,
  LawShopOrderDetails,
  LawShopAllRefunds,
  LawShopSettingsPage,
  LawShopWithDrawMoneyPage,
  LawShopInboxPage,
} from "./routes/LawShopRoutes.js";

import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardLawyers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
  AdminDashboardWithdraw,
} from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadLawyer, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { LawShopHomePage } from "./LawShopRoutes.js";
import LawyerProtectedRoute from "./routes/LawyerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadLawyer());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/lawyer/activation/:activation_token"
          element={<LawyerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-lawyer" element={<BestLawyerPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/lawshop/preview/:id" element={<LawShopPreviewPage />} />
        {/* shop Routes */}
        <Route path="/lawshop-create" element={<LawShopCreatePage />} />
        <Route path="/lawshop-login" element={<LawShopLoginPage />} />
        <Route
          path="/lawshop/:id"
          element={
            <LawyerProtectedRoute>
              <LawShopHomePage />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <LawyerProtectedRoute>
              <LawShopSettingsPage />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <LawyerProtectedRoute>
              <LawShopDashboardPage />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <LawyerProtectedRoute>
              <LawShopCreateProduct />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <LawyerProtectedRoute>
              <LawShopAllOrders />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <LawyerProtectedRoute>
              <LawShopAllRefunds />
            </LawyerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <LawyerProtectedRoute>
              <LawShopOrderDetails />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <LawyerProtectedRoute>
              <LawShopAllProducts />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <LawyerProtectedRoute>
              <LawShopCreateEvents />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <LawyerProtectedRoute>
              <LawShopAllEvents />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupouns"
          element={
            <LawyerProtectedRoute>
              <LawShopAllCoupouns />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <LawyerProtectedRoute>
              <LawShopWithDrawMoneyPage />
            </LawyerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <LawyerProtectedRoute>
              <LawShopInboxPage />
            </LawyerProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardLawyers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
