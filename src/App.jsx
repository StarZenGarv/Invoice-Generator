import React, { useState, useEffect } from 'react'
import InvoiceForm from './components/InvoiceInputs'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AddBillTo from './components/AddBillTo'
import AddShipTo from './components/AddShipTo'
import Invoice from './components/Invoice'
const App = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData
      ? JSON.parse(savedData)
      : {
        name: '',
        address: '',
        gstNo: ''
      };
  });
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);


  const [invoiceDetails, setInvoiceDetails] = useState({ invoiceNo: "", dated: "" });
  const [transportDetails, setTransportDetails] = useState({ vehicleNo: "", station: "", ewayBillNo: "" });
  const [billedTo, setBilledTo] = useState("");
  const [shippedTo, setShippedTo] = useState("");
  const [tableRows, setTableRows] = useState([
    { srNo: 1, description: "", hsnCode: "", qty: "", rate: "", per: "", amt: "" }
  ]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InvoiceForm formData={formData} invoiceDetails={invoiceDetails} setInvoiceDetails={setInvoiceDetails} transportDetails={transportDetails} setTransportDetails={setTransportDetails} billedTo={billedTo} shippedTo={shippedTo} setBilledTo={setBilledTo} setShippedTo={setShippedTo} tableRows={tableRows} setTableRows={setTableRows} />} />
        <Route path='/billto' element={<AddBillTo formData={formData} setFormData={setFormData} />} />
        <Route path='/shipto' element={<AddShipTo formData={formData} setFormData={setFormData} />} />
        <Route path='/invoice' element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App