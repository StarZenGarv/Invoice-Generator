import React, { useState, useEffect } from "react";
import InvoiceForm from "./components/InvoiceInputs";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddBillTo from "./components/AddBillTo";
import AddShipTo from "./components/AddShipTo";
import Invoice from "./components/Invoice";

const App = () => {
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNo: "",
    dated: "",
  });
  const [transportDetails, setTransportDetails] = useState({
    vehicleNo: "",
    station: "",
    ewayBillNo: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    gstNo: "",
  });
  const [billedTo, setBilledTo] = useState("");
  const [shippedTo, setShippedTo] = useState("");
  const [tableRows, setTableRows] = useState([
    {
      srNo: 1,
      description: "",
      hsnCode: "",
      qty: "",
      rate: "",
      per: "",
      amt: "",
    },
  ]);

  const [billedToList, setBilledToList] = useState(() => {
    const saved = localStorage.getItem("billedToList");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [shippedToList, setShippedToList] = useState(() => {
    const saved = localStorage.getItem("shippedToList");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("billedToList", JSON.stringify(billedToList));
  }, [billedToList]);

  useEffect(() => {
    localStorage.setItem("shippedToList", JSON.stringify(shippedToList));
  }, [shippedToList]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <InvoiceForm
              invoiceDetails={invoiceDetails}
              setInvoiceDetails={setInvoiceDetails}
              transportDetails={transportDetails}
              setTransportDetails={setTransportDetails}
              billedTo={billedTo}
              setBilledTo={setBilledTo}
              shippedTo={shippedTo}
              setShippedTo={setShippedTo}
              tableRows={tableRows}
              setTableRows={setTableRows}
              billedToList={billedToList}
              shippedToList={shippedToList}
              formData={formData}
              setFormData={setFormData}
            />
          }
        />
        <Route
          path="/billto"
          element={
            <AddBillTo
              setBilledToList={setBilledToList}
              formData={formData}
              setFormData={setFormData}
            />
          }
        />
        <Route
          path="/shipto"
          element={<AddShipTo setShippedToList={setShippedToList} />}
        />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
