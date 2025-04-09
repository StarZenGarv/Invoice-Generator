import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const [descData, setDescData] = useState([]);
  const [unitData, setUnitData] = useState([]);

  useEffect(() => {
    setBilledToOptions(formDataList);
    setShippedToOptions(formDataList);
  }, [formDataList]);

  useEffect(() => {
    const desc = JSON.parse(localStorage.getItem("descData")) || [];
    const units = JSON.parse(localStorage.getItem("unitData")) || [];
    setDescData(desc);
    setUnitData(units);
  }, []);

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
    const updated = [...tableRows];
    updated[index][e.target.name] = e.target.value;
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
        amt: "",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filled =
      invoiceDetails.invoiceNo &&
      invoiceDetails.dated &&
      transportDetails.vehicleNo &&
      transportDetails.station &&
      transportDetails.ewayBillNo &&
      billedTo &&
      shippedTo &&
      tableRows.every(
        (row) =>
          row.description &&
          row.hsnCode &&
          row.qty &&
          row.rate &&
          row.per &&
          row.amt
      );

    if (filled) navigate("/invoice");
    else alert("Please fill out all fields.");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-6xl mx-auto">
      {/* Invoice Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="invoiceNo"
          placeholder="Invoice No"
          value={invoiceDetails.invoiceNo}
          onChange={handleInvoiceChange}
          className="border p-2 w-full"
        />
        <input
          name="dated"
          placeholder="Dated"
          value={invoiceDetails.dated}
          onChange={handleInvoiceChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Transport Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="vehicleNo"
          placeholder="Vehicle No"
          value={transportDetails.vehicleNo}
          onChange={handleTransportChange}
          className="border p-2 w-full"
        />
        <input
          name="station"
          placeholder="Station"
          value={transportDetails.station}
          onChange={handleTransportChange}
          className="border p-2 w-full"
        />
        <input
          name="ewayBillNo"
          placeholder="E-Way Bill No"
          value={transportDetails.ewayBillNo}
          onChange={handleTransportChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Billed To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <select
          value={billedTo}
          onChange={(e) => setBilledTo(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Billed To</option>
          {billedToOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Link to="/billto" className="text-blue-600 underline">
          + Add Billed To
        </Link>
      </div>

      {/* Shipped To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <select
          value={shippedTo}
          onChange={(e) => setShippedTo(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Shipped To</option>
          {shippedToOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Link to="/shipto" className="text-blue-600 underline">
          + Add Shipped To
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full table-auto border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Sr No.</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">HSN Code</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Per</th>
              <th className="border p-2">Amt</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">{row.srNo}</td>
                <td className="border p-2">
                  <select
                    name="description"
                    value={row.description}
                    onChange={(e) => handleTableChange(index, e)}
                    className="w-full"
                  >
                    <option value="">Select Description</option>
                    {descData.map((desc, i) => (
                      <option key={i} value={desc}>
                        {desc}
                      </option>
                    ))}
                  </select>
                  <Link to="/desc" className="text-blue-600 underline text-xs">
                    + Add Description
                  </Link>
                </td>
                <td className="border p-2">
                  <input
                    name="hsnCode"
                    value={row.hsnCode}
                    onChange={(e) => handleTableChange(index, e)}
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    name="qty"
                    value={row.qty}
                    onChange={(e) => handleTableChange(index, e)}
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    name="rate"
                    value={row.rate}
                    onChange={(e) => handleTableChange(index, e)}
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <select
                    name="per"
                    value={row.per}
                    onChange={(e) => handleTableChange(index, e)}
                    className="w-full"
                  >
                    <option value="">Select Unit</option>
                    {unitData.map((unit, i) => (
                      <option key={i} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <Link to="/unit" className="text-blue-600 underline text-xs">
                    + Add Unit
                  </Link>
                </td>
                <td className="border p-2">
                  <input
                    name="amt"
                    value={row.amt}
                    onChange={(e) => handleTableChange(index, e)}
                    className="w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-2 border px-4 py-2 bg-gray-100 hover:bg-gray-200"
      >
        Add Row
      </button>

      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
        >
          Generate Invoice
        </button>
      </div>
    </form>
  );
}
