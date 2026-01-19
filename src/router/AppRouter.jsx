import { Routes, Route } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Dashboard from "../pages/Dashboard";
import ForbiddenPage from "../pages/ForbiddenPage";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import AdminDetails from "../components/AdminDetails";
import EditAdmin from "../components/EditAdmin";
import Login from "../components/Login";
import ProductView from "../components/ProductView";
import RequireAuth from "../components/RequireAuth";
import Signup from "../components/Singup";
import ForgotPassword from "../components/ForgotPassword";

const AppRouter = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* PROTECTED */}
      <Route element={<RequireAuth />}>
        <Route element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<ProductForm />} />
          <Route path="/products/view/:id" element={<ProductView />} />
          <Route path="/settings/users" element={<AdminDetails />} />
          <Route path="/settings/1/edit" element={<EditAdmin />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<ForbiddenPage />} />
    </Routes>
  );
};

export default AppRouter;
