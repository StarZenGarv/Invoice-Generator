import React, { useState, useEffect } from "react";
import InvoiceForm from "./components/InvoiceInputs";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddBillTo from "./components/AddBillTo";
import AddShipTo from "./components/AddShipTo";
import Invoice from "./components/Invoice";
import DescriptionForm from "./components/DescriptionForm";
import UnitForm from "./components/UnitForm";

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

  const [descData, setDescData] = useState(() => {
    const saved = localStorage.getItem("descData");
    return saved ? JSON.parse(saved) : [];
  });

  const [unitData, setUnitData] = useState(() => {
    const saved = localStorage.getItem("unitData");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("formDataList", JSON.stringify(formDataList));
  }, [formDataList]);

  useEffect(() => {
    localStorage.setItem("descData", JSON.stringify(descData));
  }, [descData]);

  useEffect(() => {
    localStorage.setItem("unitData", JSON.stringify(unitData));
  }, [unitData]);

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
              descData={descData}
              unitData={unitData}
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
        <Route
          path="/desc"
          element={<DescriptionForm setDescData={setDescData} />}
        />
        <Route path="/unit" element={<UnitForm setUnitData={setUnitData} />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
