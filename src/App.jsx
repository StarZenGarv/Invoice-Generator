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

  const [formDataList, setFormDataList] = useState(() => {
    const saved = localStorage.getItem("formDataList");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("formDataList", JSON.stringify(formDataList));
  }, [formDataList]);

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
              formDataList={formDataList}
            />
          }
        />
        <Route
          path="/billto"
          element={<AddBillTo setFormDataList={setFormDataList} />}
        />
        <Route
          path="/shipto"
          element={<AddShipTo setFormDataList={setFormDataList} />}
        />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
