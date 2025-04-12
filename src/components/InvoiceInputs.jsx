import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

export default function InvoiceForm({
  invoiceDetails,
  setInvoiceDetails,
  transportDetails,
  setTransportDetails,
  billedTo,
  setBilledTo,
  shippedTo,
  setShippedTo,
  tableRows,
  setTableRows,
  formDataList,
}) {
  const navigate = useNavigate();
  const [billedToOptions, setBilledToOptions] = useState([]);
  const [shippedToOptions, setShippedToOptions] = useState([]);
  const [gstRates, setGstRates] = useState({ cgst: "", sgst: "", igst: "" });
  const [gstAmounts, setGstAmounts] = useState({
    cgst: "0.00",
    sgst: "0.00",
    igst: "0.00",
  });
  const [showBilledDropdown, setShowBilledDropdown] = useState(false);
  const [showShippedDropdown, setShowShippedDropdown] = useState(false);

  useEffect(() => {
    setBilledToOptions(formDataList);
    setShippedToOptions(formDataList);
  }, [formDataList]);

  useEffect(() => {
    if (!billedToOptions.includes(billedTo)) setBilledTo("");
    if (!shippedToOptions.includes(shippedTo)) setShippedTo("");
  }, [billedTo, shippedTo, billedToOptions, shippedToOptions]);

  const handleInvoiceChange = (e) => {
    setInvoiceDetails({ ...invoiceDetails, [e.target.name]: e.target.value });
  };

  const handleTransportChange = (e) => {
    setTransportDetails({
      ...transportDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...tableRows];
    updated[index][name] = value;

    const qty = parseFloat(updated[index].qty);
    const rate = parseFloat(updated[index].rate);
    const cgst = parseFloat(updated[index].cgst);
    const sgst = parseFloat(updated[index].sgst);
    const igst = parseFloat(updated[index].igst);

    if (!isNaN(qty) && !isNaN(rate)) {
      const amt = qty * rate;
      updated[index].amt = amt.toFixed(2);

      updated[index].cgstAmt = ((cgst / 100) * amt).toFixed(2);

      updated[index].sgstAmt = ((sgst / 100) * amt).toFixed(2);

      updated[index].igstAmt = ((igst / 100) * amt).toFixed(2);
    } else {
      updated[index].amt = "";
      updated[index].cgstAmt = "";
      updated[index].sgstAmt = "";
      updated[index].igstAmt = "";
    }
    setTableRows(updated);
  };

  const addRow = () => {
    setTableRows([
      ...tableRows,
      {
        srNo: tableRows.length + 1,
        description: "",
        hsnCode: "",
        qty: "",
        rate: "",
        per: "",
        cgst: "",
        sgst: "",
        igst: "",
        cgstAmt: "",
        sgstAmt: "",
        igstAmt: "",
        amt: "",
      },
    ]);
  };

  const handleDelete = (option, type) => {
    const updatedList = formDataList.filter((item) => item !== option);
    const updatedUniqueList = [...new Set(updatedList)];

    if (type === "billedTo") {
      setBilledToOptions(updatedUniqueList);
      if (billedTo === option) setBilledTo("");
    }
    if (type === "shippedTo") {
      setShippedToOptions(updatedUniqueList);
      if (shippedTo === option) setShippedTo("");
    }
    localStorage.setItem("formDataList", JSON.stringify(updatedUniqueList));
  };

  const handleDeleteRow = (indexToDelete) => {
    const updatedRows = tableRows
      .filter((_, index) => index !== indexToDelete)
      .map((row, idx) => ({ ...row, srNo: idx + 1 }));
    setTableRows(updatedRows);
  };

  const totalAmount = tableRows.reduce(
    (acc, row) => acc + parseFloat(row.amt || 0),
    0
  );

  useEffect(() => {
    const cgstAmt = (
      (parseFloat(gstRates.cgst || 0) / 100) *
      totalAmount
    ).toFixed(2);
    const sgstAmt = (
      (parseFloat(gstRates.sgst || 0) / 100) *
      totalAmount
    ).toFixed(2);
    const igstAmt = (
      (parseFloat(gstRates.igst || 0) / 100) *
      totalAmount
    ).toFixed(2);
    setGstAmounts({ cgst: cgstAmt, sgst: sgstAmt, igst: igstAmt });
  }, [gstRates, totalAmount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/invoice", {
      state: {
        invoiceDetails,
        transportDetails,
        billedTo,
        shippedTo,
        tableRows,
        gstRates,
        gstAmounts,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 flex flex-col items-center"
    >
      <div className="bg-white w-full max-w-[794px] p-6 border border-black shadow text-sm space-y-6">
        <div className="text-center mb-4">
          <h2 className="font-bold uppercase underline">Tax Invoice</h2>
          <h3 className="text-xl font-semibold mt-1">GARV JINDAL</h3>
          <p>ZIRAKPUR</p>
        </div>

        {/* Invoice and Transport */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-400 p-5 space-y-2">
            <label className="font-semibold">Invoice No.:</label>
            <input
              name="invoiceNo"
              value={invoiceDetails.invoiceNo}
              onChange={handleInvoiceChange}
              className="w-full border p-1 mt-1"
              placeholder="Invoice No"
            />
            <label className="font-semibold">Dated:</label>
            <input
              name="dated"
              type="date"
              value={invoiceDetails.dated}
              onChange={handleInvoiceChange}
              className="w-full border p-1 mt-1"
            />
          </div>
          <div className="border border-gray-400 p-5 space-y-2">
            <label className="font-semibold">Vehicle No.:</label>
            <input
              name="vehicleNo"
              value={transportDetails.vehicleNo}
              onChange={handleTransportChange}
              className="w-full border p-1 mt-1"
              placeholder="Vehicle No"
            />
            <label className="font-semibold">Delivery At:</label>
            <input
              name="station"
              value={transportDetails.station}
              onChange={handleTransportChange}
              className="w-full border p-1 mt-1"
              placeholder="Delivery At"
            />
            <label className="font-semibold">E-way Bill:</label>
            <input
              name="ewayBillNo"
              value={transportDetails.ewayBillNo}
              onChange={handleTransportChange}
              className="w-full border p-1 mt-1"
              placeholder="E-Way Bill No"
            />
          </div>
        </div>

        {/* Billed and Shipped To */}
        <div>
          <div className="border border-gray-400 p-5 space-y-2">
            <label className="font-semibold">Billed To:</label>
            <div className="relative inline-block w-full">
              <button
                type="button"
                onClick={() => setShowBilledDropdown(!showBilledDropdown)}
                className="w-full border p-1 text-left bg-white"
              >
                {billedTo || "Select Billed To"}
              </button>

              {showBilledDropdown && (
                <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-auto mt-1 shadow">
                  {billedToOptions.map((option, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center p-1 hover:bg-gray-100"
                    >
                      <span
                        onClick={() => {
                          setBilledTo(option);
                          setShowBilledDropdown(false);
                        }}
                        className="cursor-pointer flex-grow"
                      >
                        {option}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(option, "billedTo");
                        }}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <MdDelete />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              to="/billto"
              className="text-blue-600 text-sm underline mt-1 block"
            >
              + Add Billed To
            </Link>
          </div>

          <div className="border border-gray-400 p-5 space-y-2">
            <label className="font-semibold">Shipped To:</label>
            <div className="relative inline-block w-full">
              <button
                type="button"
                onClick={() => setShowShippedDropdown(!showShippedDropdown)}
                className="w-full border p-1 text-left bg-white"
              >
                {shippedTo || "Select Shipped To"}
              </button>

              {showShippedDropdown && (
                <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-auto mt-1 shadow">
                  {shippedToOptions.map((option, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center p-1 hover:bg-gray-100"
                    >
                      <span
                        onClick={() => {
                          setShippedTo(option);
                          setShowShippedDropdown(false);
                        }}
                        className="cursor-pointer flex-grow"
                      >
                        {option}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(option, "shippedTo");
                        }}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <MdDelete />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link
              to="/shipto"
              className="text-blue-600 text-sm underline mt-1 block"
            >
              + Add Shipped To
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full border border-collapse border-gray-700 text-xs">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-1">Sr. No.</th>
                <th className="border p-1">Description</th>
                <th className="border p-1">HSN Code</th>
                <th className="border p-1">Qty</th>
                <th className="border p-1">Rate</th>
                <th className="border p-1">Per</th>
                <th className="border p-1">Amount ₹</th>
                <th className="border p-1 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr key={index}>
                  <td className="border p-1 text-center">{row.srNo}</td>
                  <td className="border p-1">
                    <input
                      name="description"
                      value={row.description}
                      onChange={(e) => handleTableChange(index, e)}
                      className="w-full border p-1"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      name="hsnCode"
                      value={row.hsnCode}
                      onChange={(e) => handleTableChange(index, e)}
                      className="w-full border p-1"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="number"
                      name="qty"
                      value={row.qty}
                      onChange={(e) => handleTableChange(index, e)}
                      className="w-full border p-1 text-right"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="number"
                      name="rate"
                      value={row.rate}
                      onChange={(e) => handleTableChange(index, e)}
                      className="w-full border p-1 text-right"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      name="per"
                      value={row.per}
                      onChange={(e) => handleTableChange(index, e)}
                      className="w-full border p-1 text-center"
                    />
                  </td>
                  <td className="border p-1 text-right w-40">
                    ₹{row.amt} <br />
                  </td>
                  <td className="border p-1 text-center text-red-600">
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(index)}
                    >
                      <MdDelete className="text-lg hover:text-red-800" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GST Section */}
        <div className="border border-gray-400 p-4 space-y-2 mt-4 text-sm">
          {["cgst", "sgst", "igst"].map((tax) => (
            <div key={tax} className="flex justify-between items-center">
              <label className="font-semibold w-1/3">
                {tax.toUpperCase()} %:
              </label>
              <input
                type="number"
                value={gstRates[tax]}
                onChange={(e) =>
                  setGstRates({ ...gstRates, [tax]: e.target.value })
                }
                className="border p-1 w-1/3"
              />
              <div className="w-1/3 text-right">₹ {gstAmounts[tax]}</div>
            </div>
          ))}
        </div>

        {/* Add Row Button */}
        <div className="mt-2">
          <button
            type="button"
            onClick={addRow}
            className="border px-4 py-2 bg-gray-100 hover:bg-gray-200"
          >
            Add Row
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </form>
  );
}
