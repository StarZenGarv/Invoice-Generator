import { useRef } from "react";

export default function ResponsiveInvoice() {
  const invoiceRef = useRef();

  const handleDownload = () => {
    const text = `
GSTIN: 03AASFJ4452D1ZH

Invoice No.: 2/2025-26
Dated: 03-04-2025

Billed to:
Vishwas Builders
SHOP NO 2, VIP ROAD, SOUTH CITY
VIP ROAD, ZIRAKPUR, Punjab, 140603
GSTIN / UIN: 03AGAPK3675K1ZF

Shipped to:
SAHIBA CONSTRUCTION CO PVT LTD
SITE AT SAHIBA CONSTRUCTION CO PVT LTD
MULLANPUR RESORT
GSTIN / UIN: 03AGAPK3675K1ZF

Goods:
1. BRICKS | HSN: 6904 | Qty: 13,000.00 | Rate: 5.80 | Per: Pcs. | Amount: ₹84,500.00

Grand Total: 13,000.00 Pcs. — ₹84,500.00
    `.trim();

    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.txt";
    link.click();
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Download Button */}
      <div className="mb-4 w-full max-w-[794px] flex justify-end">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Download Invoice
        </button>
      </div>

      {/* Invoice Box */}
      <div
        ref={invoiceRef}
        className="bg-white w-full max-w-[794px] h-[1123px] p-6 border border-black shadow text-sm overflow-x-auto"
      >
        {/* GSTIN */}
        <div className="text-left mb-2">
          <p className="font-semibold">GSTIN: 03AASFJ4452D1ZH</p>
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold uppercase">Tax Invoice</h2>
          <h3 className="font-semibold mt-1">JAI SANTOSHI MAA B.K.O.</h3>
          <p>VILL. MOOLA SINGH WALA (MANSA)</p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-400 p-5">
              <p>
                <span className="font-semibold">Invoice No.:</span> 2/2025-26
              </p>
              <p>
                <span className="font-semibold">Dated:</span> 03-04-2025
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm border border-gray-400 p-5">
              <div>
                <p>
                  <span className="font-semibold">Vehicle No.</span> PB11BK4542
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Station:</span> MULLANPUR
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">E-Way Bill No.</span>{" "}
                  381972012814
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-400 p-5">
              <p className="font-semibold mb-1">Billed to:</p>
              <p>Vishwas Builders</p>
              <p>SHOP NO 2, VIP ROAD, SOUTH CITY</p>
              <p>VIP ROAD, ZIRAKPUR, Punjab, 140603</p>
              <p>GSTIN / UIN: 03AGAPK3675K1ZF</p>
            </div>
            <div className="border border-gray-400 p-5">
              <p className="font-semibold mb-1">Shipped to:</p>
              <p>SAHIBA CONSTRUCTION CO PVT LTD</p>
              <p>SITE AT SAHIBA CONSTRUCTION CO PVT LTD</p>
              <p>MULLANPUR RESORT</p>
              <p>GSTIN / UIN: 03AGAPK3675K1ZF</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full min-w-[600px] border border-collapse border-gray-700 text-xs">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-700 p-1">Sr. No.</th>
                <th className="border border-gray-700 p-1">
                  Description of Goods
                </th>
                <th className="border border-gray-700 p-1">HSN Code</th>
                <th className="border border-gray-700 p-1">Qty</th>
                <th className="border border-gray-700 p-1">Rate</th>
                <th className="border border-gray-700 p-1">Per</th>
                <th className="border border-gray-700 p-1">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-700 p-1 text-center">1</td>
                <td className="border border-gray-700 p-1">BRICKS</td>
                <td className="border border-gray-700 p-1 text-center">6904</td>
                <td className="border border-gray-700 p-1 text-right">
                  13,000.00
                </td>
                <td className="border border-gray-700 p-1 text-right">5.80</td>
                <td className="border border-gray-700 p-1 text-center">Pcs.</td>
                <td className="border border-gray-700 p-1 text-right">
                  84,500.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grand Total */}
        <div className="mt-4 flex flex-col items-end">
          <table className="text-sm w-full md:w-1/2">
            <tbody>
              <tr>
                <td className="font-semibold pr-4">Grand Total</td>
                <td className="text-right">13,000.00 Pcs.</td>
                <td className="text-right font-bold">₹84,500.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
