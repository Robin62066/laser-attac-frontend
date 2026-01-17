import { useState } from "react";
import { Upload, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import api from "../api/api";

const emptyVariant = {
  moq: "",
  type: "",
  price: "",
  engraving: "",
};

const emptyImage = {
  file: null,
  preview: "",
};

export default function ProductForm() {
  const [name, setName] = useState("");
  const [variants, setVariants] = useState([
    { ...emptyVariant },
    { ...emptyVariant },
  ]);
  const [images, setImages] = useState([{ ...emptyImage }]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  /* ---------------- VARIANTS ---------------- */

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { ...emptyVariant }]);
  };

  const removeVariant = (index) => {
    if (variants.length === 1) return;
    setVariants(variants.filter((_, i) => i !== index));
  };

  /* ---------------- IMAGES ---------------- */

  const handleImageChange = (index, file) => {
    if (!file) return;

    const updated = [...images];
    updated[index] = {
      file,
      preview: URL.createObjectURL(file),
    };
    setImages(updated);
  };

  const addImage = () => {
    if (images.length >= 5)
      return showToast("Maximum 5 images allowed", "error");
    setImages([...images, { ...emptyImage }]);
  };

  const removeImage = (index) => {
    if (images.length === 1)
      return showToast("At least 1 image required", "error");
    setImages(images.filter((_, i) => i !== index));
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return showToast("Product name is required", "error");

    const validImages = images.filter((img) => img.file);
    if (validImages.length === 0)
      return showToast("Upload at least 1 image", "error");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("productName", name);
      formData.append("variants", JSON.stringify(variants));
      validImages.forEach((img) => formData.append("images", img.file));

      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("Product saved successfully ✅");
      setName("");
      setVariants([{ ...emptyVariant }]);
      setImages([{ ...emptyImage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1c1c1c] w-full max-w-5xl rounded-xl p-6 shadow-lg relative"
      >
        {/* TOAST */}
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

        {/* PRODUCT NAME */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="mt-2 w-full bg-[#111] border border-gray-600 rounded-md px-4 py-2 text-white"
          />
        </div>

        {/* IMAGES */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
              <ImageIcon size={16} /> Product Images
            </p>
            <button
              type="button"
              onClick={addImage}
              className="flex items-center gap-1 text-sm text-white bg-indigo-500 px-3 py-1 rounded hover:bg-indigo-600"
            >
              <Plus size={14} /> Add Image
            </button>
          </div>

          <div className="space-y-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#111] p-3 rounded-lg border border-gray-700"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(i, e.target.files[0])}
                  className="text-gray-300 text-sm"
                />

                {img.preview && (
                  <img
                    src={img.preview}
                    alt="preview"
                    className="h-12 w-12 object-cover rounded-md border border-gray-600"
                  />
                )}

                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="ml-auto p-2 hover:bg-gray-700 rounded"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* VARIANTS */}
        <div className="mb-6">
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
                <th className="p-3">Remove</th>
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
                  <td className="p-2 text-center">
                    <button type="button" onClick={() => removeVariant(i)}>
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end">
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
