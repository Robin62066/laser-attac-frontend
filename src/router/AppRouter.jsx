import { Routes, Route } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Dashboard from "../pages/Dashboard";
import ForbiddenPage from "../pages/ForbiddenPage";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import AdminDetails from "../components/AdminDetails";
import EditAdmin from "../components/EditAdmin";
import Login from "../components/Login";

const AppRouter = () => {
  return (
    <Routes>
      {/* LAYOUT ROUTE */}
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="/Products/new" element={<ProductForm />} />
        <Route path="/Products" element={<ProductList />} />
        <Route path="/settings/users" element={<AdminDetails />} />
        <Route path="/settings/1/edit" element={<EditAdmin />} />
      </Route>
      <Route path="/login" element={<Login />} />

      {/* FALLBACK */}
      <Route path="*" element={<ForbiddenPage />} />
    </Routes>
  );
};

export default AppRouter;
