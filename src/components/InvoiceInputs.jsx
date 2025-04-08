import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

export default function InvoiceForm({ formData, invoiceDetails, setInvoiceDetails, transportDetails, setTransportDetails, billedTo, shippedTo, setBilledTo, setShippedTo, tableRows, setTableRows }) {
    const navigate = useNavigate();

    const handleInvoiceChange = (e) => {
        setInvoiceDetails({ ...invoiceDetails, [e.target.name]: e.target.value });
    };

    const handleTransportChange = (e) => {
        setTransportDetails({ ...transportDetails, [e.target.name]: e.target.value });
    };

    const handleTableChange = (index, e) => {
        const updatedRows = [...tableRows];
        updatedRows[index][e.target.name] = e.target.value;
        setTableRows(updatedRows);
    };

    const addRow = () => {
        const newRow = {
            srNo: tableRows.length + 1,
            description: "", hsnCode: "", qty: "", rate: "", per: "", amt: ""
        };
        setTableRows([...tableRows, newRow]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allInvoiceFilled = invoiceDetails.invoiceNo && invoiceDetails.dated;
        const allTransportFilled = transportDetails.vehicleNo && transportDetails.station && transportDetails.ewayBillNo;
        const billedAndShippedFilled = billedTo && shippedTo;
        const allTableFilled = tableRows.every(row =>
            row.description && row.hsnCode && row.qty && row.rate && row.per && row.amt
        );

        if (allInvoiceFilled && allTransportFilled && billedAndShippedFilled && allTableFilled) {
            navigate('/invoice');
        } else {
            alert("Please fill out all fields.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-6xl mx-auto">
            {/* Section 1 */}
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

            {/* Section 2 */}
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

            {/* Section 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                    value={billedTo}
                    onChange={(e) => setBilledTo(e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="">Select Billed To</option>
                    <option value={`${formData.name} - ${formData.address} - ${formData.gstNo}`}>{formData.name} - {formData.address} - {formData.gstNo}</option>
                    <option value="Vishwas Builders">Vishwas Builders</option>
                    <option value="SAHIBA CONSTRUCTION CO PVT LTD">SAHIBA CONSTRUCTION CO PVT LTD</option>
                </select>
                <Link to='/billto'>Add</Link>
            </div>

            {/* Section 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                    value={shippedTo}
                    onChange={(e) => setShippedTo(e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="">Select Shipped To</option>
                    <option value={`${formData.name} - ${formData.address} - ${formData.gstNo}`}>{formData.name} - {formData.address} - {formData.gstNo}</option>
                    <option value="Vishwas Builders">Vishwas Builders</option>
                    <option value="SAHIBA CONSTRUCTION CO PVT LTD">SAHIBA CONSTRUCTION CO PVT LTD</option>
                </select>
                <Link to='/shipto'>Add</Link>
            </div>

            {/* Section 5: Table */}
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
                                    <input
                                        name="description"
                                        value={row.description}
                                        onChange={(e) => handleTableChange(index, e)}
                                        className="w-full"
                                    />
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
                                    <input
                                        name="per"
                                        value={row.per}
                                        onChange={(e) => handleTableChange(index, e)}
                                        className="w-full"
                                    />
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

            <div className="flex justify-start">
                <button
                    type="button"
                    onClick={addRow}
                    className="mt-2 border px-4 py-2 bg-gray-100 hover:bg-gray-200"
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
        </form>
    );
}
