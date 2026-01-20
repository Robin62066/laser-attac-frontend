import { useState, useEffect } from "react";
import {
  Edit3,
  Trash2,
  ImageIcon,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const API_BASE_URL = "http://localhost:4000";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /* ---------------- PAGINATION LOGIC ---------------- */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted successfully ✅");
    } catch (error) {
      showToast("Failed to delete product", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#111] p-4 md:p-6">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-md text-sm z-50 shadow-lg ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          } text-white`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Products List
          </h2>
          <span className="text-gray-400 text-xs md:text-sm bg-gray-800 px-3 py-1 rounded-full">
            Total: {products.length} Products
          </span>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto rounded-lg border border-gray-700 bg-[#1a1a1a]">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-[#222] text-gray-400 text-xs md:text-sm uppercase">
              <tr>
                <th className="p-4">Sl No.</th>
                <th className="p-4">Product ID</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Variants</th>
                <th className="p-4">Image</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                currentItems.map((p, index) => {
                  const firstImage =
                    p.ProductImages?.length > 0
                      ? `${API_BASE_URL}/uploads/images/${p.ProductImages[0].image}`
                      : null;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-4 text-gray-400 text-sm">
                        {indexOfFirstItem + index + 1}
                      </td>

                      <td className="p-4 text-sky-500 font-mono text-[10px] md:text-xs">
                        LASER-ATTACK-000{p.id}
                      </td>

                      <td className="p-4 text-white font-medium text-sm">
                        {p.name}
                      </td>

                      <td className="p-4 text-gray-300">
                        <span className="bg-gray-700 px-2 py-1 rounded text-[10px]">
                          {p.ProductVariants?.length || 0}
                        </span>
                      </td>

                      <td className="p-4">
                        {firstImage ? (
                          <img
                            src={firstImage}
                            alt=""
                            className="h-10 w-10 object-cover rounded-md border border-gray-600"
                          />
                        ) : (
                          <ImageIcon className="text-gray-600" size={20} />
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-1 md:gap-2">
                          <button
                            onClick={() => navigate(`/products/view/${p.id}`)}
                            className="p-2 text-gray-400 hover:text-white transition"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => navigate(`/products/edit/${p.id}`)}
                            className="p-2 text-sky-400 hover:text-sky-300 transition"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 text-red-500 hover:text-red-400 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ---------------- RESPONSIVE PAGINATION UI ---------------- */}
        {products.length > itemsPerPage && (
          <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4 px-2">
            <p className="text-xs md:text-sm text-gray-400 order-2 md:order-1">
              Showing <span className="text-white">{indexOfFirstItem + 1}</span>{" "}
              to{" "}
              <span className="text-white">
                {Math.min(indexOfLastItem, products.length)}
              </span>{" "}
              of <span className="text-white">{products.length}</span> entries
            </p>

            <div className="flex items-center gap-1 md:gap-2 order-1 md:order-2">
              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="p-2 rounded-md border border-gray-700 text-gray-400 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-[10px] md:text-sm font-medium transition ${
                      currentPage === i + 1
                        ? "bg-sky-600 text-white"
                        : "text-gray-400 hover:bg-gray-800 border border-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className="p-2 rounded-md border border-gray-700 text-gray-400 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
