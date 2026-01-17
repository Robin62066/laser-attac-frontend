import { useState, useEffect } from "react";
import { Edit3, Trash2, ImageIcon } from "lucide-react";
import api from "../api/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Fetch products from API
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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      showToast("Product deleted ✅");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] p-6">
      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-md text-sm font-medium z-50 ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Products List
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="w-full text-left">
            <thead className="bg-[#222] text-gray-400 text-sm">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Variants</th>
                <th className="p-3">Images</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-400">
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    <td className="p-3 text-white font-medium">{p.name}</td>
                    <td className="p-3 text-gray-300">{p.variants.length}</td>
                    <td className="p-3 text-gray-300 flex items-center gap-1">
                      <ImageIcon size={16} /> {p.images.length}
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        className="flex items-center gap-1 px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded-md text-sm"
                        // Add your edit logic here
                      >
                        <Edit3 size={14} /> Edit
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                        onClick={() => handleDelete(p.id)}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
