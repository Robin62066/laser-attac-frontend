import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Printer, Download } from "lucide-react"; // Added Download icon
import api from "../api/api";

const API_BASE = "http://localhost:4000";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  /* ---------------- DOWNLOAD PDF HANDLER ---------------- */
  const handleDownload = () => {
    const element = printRef.current;

    // Configuration for the PDF
    const opt = {
      margin: 10,
      filename: `${product.name}_Sheet.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // scale 2 for high quality
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Use the library to generate PDF
    // Note: Ensure html2pdf is available globally via CDN in index.html
    window.html2pdf().from(element).set(opt).save();
  };

  /* ---------------- PRINT HANDLER ---------------- */
  //   const handlePrint = () => {
  //     const content = printRef.current.innerHTML;
  //     const bannerAbsolute = window.location.origin + "/laserbanner.jpg";
  //     const finalHTML = content.replace("/laserbanner.jpg", bannerAbsolute);

  //     const win = window.open("", "_blank", "width=1000,height=800");
  //     win.document.write(`
  //       <html>
  //         <head>
  //           <title>${product.name}</title>
  //           <style>
  //             @page { size: auto; margin: 10mm; }
  //             body { font-family: Arial, sans-serif; padding: 20px; }
  //             .screen-only { display: none !important; }
  //             .print-only { display: table !important; width: 100%; }
  //             .product-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  //             .product-table th, .product-table td { border: 1px solid #000; padding: 10px; text-align: center; }
  //             .product-table th { background: #f2f2f2 !important; font-weight: bold; text-transform: uppercase; }
  //             .product-name-cell { font-weight: bold; font-size: 16px; vertical-align: middle; }
  //             .header-container img { width: 100%; height: 220px; object-fit: cover; }
  //             .image-gallery { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
  //             .image-gallery img { height: 180px; border: 1px solid #000; padding: 4px; }
  //             .footer-table { width: 100%; border-collapse: collapse; margin-top: 30px; }
  //             .footer-table td { border: 1px solid #000; padding: 10px; font-size: 10px; text-align: center; }
  //             * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  //           </style>
  //         </head>
  //         <body>
  //           ${finalHTML}
  //           <script>window.onload = function() { window.print(); window.close(); };</script>
  //         </body>
  //       </html>
  //     `);
  //     win.document.close();
  //   };

  if (!product) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <style>{`
        .product-table { width: 100%; border-collapse: collapse; table-layout: fixed; margin-top: 20px; background: white; }
        .product-table th, .product-table td { border: 1px solid #000 !important; padding: 12px 8px; text-align: center; }
        .product-table th { background-color: #f2f2f2; font-weight: bold; text-transform: uppercase; font-size: 12px; }
        .product-name-cell { font-weight: bold; font-size: 16px; vertical-align: middle; background-color: #fff; }
        .header-container img { width: 100%; height: 220px; object-fit: cover; border: 1px solid #000; }
        .image-gallery img { padding: 4px; background: white; }
        .print-only { display: none; }
        @media screen { .screen-only { display: flex; } }
      `}</style>
      {/* .image-gallery img { height: 180px; border: 1px solid #000; padding: 4px; background: white; } */}
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg">
        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mb-6 screen-only">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 flex items-center gap-2"
          >
            <Download size={18} /> Download PDF
          </button>
          {/* <button
            onClick={handlePrint}
            className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 flex items-center gap-2"
          >
            <Printer size={18} /> Print Sheet
          </button> */}
        </div>

        {/* PRINTABLE AREA */}
        <div ref={printRef}>
          <div className="header-container mb-6">
            <img src="/laserbanner.jpg" alt="Banner" />
          </div>

          <div className="image-gallery mb-8">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={`${API_BASE}/uploads/images/${img.image}`}
                alt="product"
                crossOrigin="anonymous"
              />
            ))}
          </div>

          <table className="product-table">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Name</th>
                <th>MOQ</th>
                <th>Type</th>
                <th>Cost / Piece</th>
                <th>Logo Branding Type</th>
                <th>Logo Branding Cost/Piece</th>
              </tr>
            </thead>
            <tbody>
              {product.variants.map((v, i) => (
                <tr key={i}>
                  {i === 0 && (
                    <td
                      rowSpan={product.variants.length}
                      className="product-name-cell"
                    >
                      {product.name}
                    </td>
                  )}
                  <td>{v.moq}</td>
                  <td className="uppercase">{v.type}</td>
                  <td>₹{v.price}</td>
                  <td>₹{v.engraving}</td>
                  <td>₹{v.engraving_cost_piece}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* SHARED FOOTER FOR DOWNLOAD/SCREEN */}
          <div className="mt-10 border border-black flex flex-row text-[11px] text-center">
            <div className="flex-1 border-r border-black p-2">
              <b>Laserattack.in</b>
              <p>Custom MDF & Acrylic Products</p>
            </div>
            <div className="flex-1 border-r border-black p-2">
              <b>Contact</b>
              <p>7870499088 | 6206303722</p>
            </div>
            <div className="flex-1 p-2 flex items-center justify-center">
              © 2025 Laserattack.in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
