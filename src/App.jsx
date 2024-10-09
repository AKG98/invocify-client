import LandingPage from "./Pages/Landing";
import HomePage from "./Pages/Home";
import AuthPage from "./Pages/Authentication";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import ResetPassword from "./Pages/Authentication/ResetPassword";
import Dashboard from "./Pages/DashboardSection";
import Customers from "./Pages/CustomersSection";
import Stores from "./Pages/StoresSection";
import Profile from "./Pages/Profile";
import InvoicePage from "./Pages/InvoiceSection";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import WelcomePage from "./Pages/Home/WelcomePage";
import AllInvoice from "./Pages/InvoiceSection/AllInvoice";
import NotFound from "./Pages/Landing/NotFound";

export default function App() {
  // Use authenticated directly from Redux state
  const authenticated = useSelector((state) => state.user.authenticated);
  //const authenticated = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Public Routes - Accessible when not authenticated */}
        <Route element={<ProtectedRoute isAuth={!authenticated} />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        </Route>
        
        {/* Protected Routes - Accessible when authenticated */}
        <Route element={<ProtectedRoute isAuth={authenticated} />}>
          <Route path="/home" element={<HomePage />}>
            <Route path="" element={<WelcomePage/>}></Route>
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="create-invoice" element={<InvoicePage/>} />
            <Route path="my-clients" element={<Customers/>} />
            <Route path="my-stores" element={<Stores/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="all-invoices" element={<AllInvoice/>} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}
