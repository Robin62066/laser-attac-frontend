import { useState } from "react";
import { Upload, Plus, Trash2 } from "lucide-react";
import api from "../api/api";

const emptyVariant = {
  moq: "",
  type: "",
  price: "",
  engraving: "",
};

export default function ProductForm() {
  const [name, setName] = useState("");
  const [variants, setVariants] = useState(
    Array.from({ length: 3 }, () => ({ ...emptyVariant })),
  );
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length < 1)
      return showToast("At least 1 image required", "error");
    if (files.length > 5) return showToast("Maximum 5 images allowed", "error");

    setImages(files);
  };

  const addVariant = () => {
    setVariants([...variants, { ...emptyVariant }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return showToast("Product name is required", "error");
    if (images.length === 0)
      return showToast("Upload at least 1 image", "error");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("productName", name);
      formData.append("variants", JSON.stringify(variants));
      images.forEach((img) => formData.append("images", img));

      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("Product saved successfully ✅");
      setName("");
      setVariants(Array.from({ length: 3 }, () => ({ ...emptyVariant })));
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1c1c1c] w-full max-w-5xl rounded-xl p-6 shadow-lg relative"
      >
        {/* Toast */}
        {toast.show && (
          <div
            className={`absolute top-4 right-4 px-4 py-2 rounded-md text-sm font-medium ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.message}
          </div>
        )}

        <h2 className="text-2xl font-semibold text-white mb-6">
          Create Product
        </h2>

        {/* Product Name */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="mt-2 w-full bg-[#111] border border-gray-600 rounded-md px-4 py-2 text-white"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="text-sm text-gray-400 flex items-center gap-2">
            <Upload size={16} /> Product Images (1–5)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 text-gray-300"
          />
        </div>

        {/* Variants Table */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400 text-sm font-medium">Variants</p>
            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-1 text-sm text-white bg-sky-500 px-3 py-1 rounded hover:bg-sky-600"
            >
              <Plus size={14} /> Add Variant
            </button>
          </div>

          <table className="w-full border border-gray-700 rounded-md overflow-hidden">
            <thead className="bg-[#222] text-gray-400 text-sm">
              <tr>
                <th className="p-3 text-left">MOQ</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Engraving</th>
                <th className="p-3 text-left">Remove</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v, i) => (
                <tr key={i} className="border-t border-gray-700">
                  {["moq", "type", "price", "engraving"].map((field) => (
                    <td className="p-2" key={field}>
                      <input
                        className="input"
                        placeholder={field}
                        value={v[field]}
                        onChange={(e) =>
                          handleVariantChange(i, field, e.target.value)
                        }
                      />
                    </td>
                  ))}
                  <td className="p-2">
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="p-1 rounded hover:bg-gray-700"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-md font-medium ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>

      <style>{`
        .input {
          width: 100%;
          background: #111;
          border: 1px solid #444;
          border-radius: 6px;
          padding: 8px 10px;
          color: white;
        }
        .input:focus {
          outline: none;
          border-color: white;
        }
      `}</style>
    </div>
  );
}

// const emptyVariant = {
//   moq: "",
//   type: "",
//   price: "",
//   engraving: "",
// };

// export default function ProductForm() {
//   const [name, setName] = useState("");
//   const [variants, setVariants] = useState(
//     Array.from({ length: 5 }, () => ({ ...emptyVariant }))
//   );

//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({ show: false, message: "", type: "" });

//   const handleVariantChange = (index, field, value) => {
//     const updated = [...variants];
//     updated[index][field] = value;
//     setVariants(updated);
//   };

//   const showToast = (message, type = "success") => {
//     setToast({ show: true, message, type });
//     setTimeout(() => setToast({ show: false }), 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.post("/products", {
//         productName: name,
//         variants: variants,
//       });

//       showToast("Product saved successfully ✅", "success");
//       setName("");
//       setVariants([
//         { moq: "", type: "", price: "", engraving: "" },
//         { moq: "", type: "", price: "", engraving: "" },
//         { moq: "", type: "", price: "", engraving: "" },
//         { moq: "", type: "", price: "", engraving: "" },
//         { moq: "", type: "", price: "", engraving: "" },
//       ]);
//       setImages([]);
//     } catch (err) {
//       showToast("Something went wrong ❌", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#111] flex items-center justify-center p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#1c1c1c] w-full max-w-5xl rounded-xl p-6 shadow-lg relative"
//       >
//         {/* TOAST */}
//         {toast.show && (
//           <div
//             className={`absolute top-4 right-4 px-4 py-2 rounded-md text-sm font-medium ${
//               toast.type === "success"
//                 ? "bg-green-600 text-white"
//                 : "bg-red-600 text-white"
//             }`}
//           >
//             {toast.message}
//           </div>
//         )}

//         <h2 className="text-2xl font-semibold text-white mb-6">
//           Create Product
//         </h2>

//         {/* Product Name */}
//         <div className="mb-6">
//           <label className="text-sm text-gray-400">Product Name</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter product name"
//             className="mt-2 w-full bg-[#111] border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-white"
//             required
//           />
//         </div>

//         {/* Variant Table */}
//         <table className="w-full border border-gray-700 rounded-md overflow-hidden">
//           <thead className="bg-[#222] text-gray-400 text-sm">
//             <tr>
//               <th className="p-3 text-left">MOQ</th>
//               <th className="p-3 text-left">Type</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Engraving</th>
//             </tr>
//           </thead>
//           <tbody>
//             {variants.map((v, i) => (
//               <tr key={i} className="border-t border-gray-700">
//                 {["moq", "type", "price", "engraving"].map((field) => (
//                   <td className="p-2" key={field}>
//                     <input
//                       className="input"
//                       placeholder={field}
//                       onChange={(e) =>
//                         handleVariantChange(i, field, e.target.value)
//                       }
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Submit */}
//         <div className="flex justify-end mt-6">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-6 py-2 rounded-md font-medium transition ${
//               loading
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : "bg-white text-black hover:bg-gray-200"
//             }`}
//           >
//             {loading ? "Saving..." : "Save Product"}
//           </button>
//         </div>
//       </form>

//       <style>{`
//         .input {
//           width: 100%;
//           background: #111;
//           border: 1px solid #444;
//           border-radius: 6px;
//           padding: 8px 10px;
//           color: white;
//         }
//         .input:focus {
//           outline: none;
//           border-color: white;
//         }
//       `}</style>
//     </div>
//   );
// }
