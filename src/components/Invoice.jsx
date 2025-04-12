import { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";

export default function ResponsiveInvoice() {
  const { state } = useLocation();

  const {
    invoiceDetails = {},
    transportDetails = {},
    billedTo = "",
    shippedTo = "",
    tableRows = [],
    gstRates = {},
    gstAmounts = {},
  } = state || {};

  const invoiceRef = useRef();

  const totalQty = tableRows.reduce(
    (acc, row) => acc + Number(row.qty || 0),
    0
  );

  const totalWithoutGst = tableRows.reduce((acc, row) => {
    const amt = Number(row.amt || 0);
    return acc + amt;
  }, 0);

  const totalGst =
    parseFloat(gstAmounts.cgst || 0) +
    parseFloat(gstAmounts.sgst || 0) +
    parseFloat(gstAmounts.igst || 0);
  const totalAmt = (totalWithoutGst + totalGst).toFixed(2);
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 0.5,
      filename: `invoice-${invoiceDetails?.invoiceNo || "download"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="p-4 bg-gray-100 flex h-[980px] flex-col items-center">
      {/* Buttons */}
      <div className="mb-4 w-full max-w-[794px] flex justify-end gap-2 print:hidden">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Download Invoice
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          Print
        </button>
      </div>

      {/* Invoice Layout */}
      <div
        ref={invoiceRef}
        className="bg-white w-full max-w-[794px] h-[980px] p-6 border border-black shadow text-sm overflow-x-auto"
        style={{ pageBreakInside: "avoid" }}
      >
        {/* GSTIN */}
        <div className="text-left mb-2">
          <p className="font-semibold">GSTIN: 03AASFJ4452D1ZH</p>
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="font-bold uppercase underline">Tax Invoice</h2>
          <h3 className="text-xl font-semibold mt-1">GARV JINDAL</h3>
          <p>ZIRAKPUR</p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-400 p-5">
              <p>
                <span className="font-semibold">Invoice No.:</span>{" "}
                {invoiceDetails?.invoiceNo}
              </p>
              <p>
                <span className="font-semibold">Dated:</span>{" "}
                {invoiceDetails?.dated}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-sm border border-gray-400 p-5">
              <div>
                <p>
                  <span className="font-semibold">Vehicle No.:</span>{" "}
                  {transportDetails?.vehicleNo}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Delivery At:</span>{" "}
                  {transportDetails?.station}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">E-way Bill:</span>{" "}
                  {transportDetails?.ewayBillNo}
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-400 p-5">
              <p className="font-semibold mb-1">Billed to:</p>
              {billedTo?.split(" - ").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <div className="border border-gray-400 p-5">
              <p className="font-semibold mb-1">Shipped to:</p>
              {shippedTo?.split(" - ").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
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
                {tableRows.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-700 p-1 text-center">
                      {row.srNo}
                    </td>
                    <td className="border border-gray-700 p-1">
                      {row.description}
                    </td>
                    <td className="border border-gray-700 p-1 text-center">
                      {row.hsnCode}
                    </td>
                    <td className="border border-gray-700 p-1 text-right">
                      {row.qty}
                    </td>
                    <td className="border border-gray-700 p-1 text-right">
                      {row.rate}
                    </td>
                    <td className="border border-gray-700 p-1 text-center">
                      {row.per}
                    </td>
                    <td className="border border-gray-700 p-1 text-right">
                      {row.amt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* GST Summary */}
          <div className="border border-gray-400 p-4 space-y-2 mt-4 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold w-1/3">
                CGST ({gstRates.cgst || 0}%)
              </span>
              <span className="text-right w-2/3">
                ₹ {gstAmounts.cgst || "0.00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold w-1/3">
                SGST ({gstRates.sgst || 0}%)
              </span>
              <span className="text-right w-2/3">
                ₹ {gstAmounts.sgst || "0.00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold w-1/3">
                IGST ({gstRates.igst || 0}%)
              </span>
              <span className="text-right w-2/3">
                ₹ {gstAmounts.igst || "0.00"}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-semibold w-1/3">Total GST:</span>
              <span className="text-right w-2/3">
                ₹{" "}
                {(
                  parseFloat(gstAmounts.cgst || 0) +
                  parseFloat(gstAmounts.sgst || 0) +
                  parseFloat(gstAmounts.igst || 0)
                ).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="mt-4 flex flex-col items-end mr-[15px]">
            <table className="text-sm w-full md:w-1/2 relative">
              <tbody>
                <tr>
                  <td className="font-semibold pr-4 absolute md:-left-[200px]">
                    Grand Total
                  </td>
                  <td className="absolute left-[150px] md:left-[70px]">
                    {totalQty} Pcs.
                  </td>
                  <td className="text-right font-bold">₹{totalAmt}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
