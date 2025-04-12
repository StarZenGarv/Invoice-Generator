import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddShipTo({ setFormDataList }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    gstNo: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, gstNo } = formData;

    if (!name || !address) {
      alert("All fields are required.");
      return;
    }

    const newEntry = `${name} - ${address} - ${gstNo}`;
    setFormDataList((prev) =>
      prev.includes(newEntry) ? prev : [...prev, newEntry]
    );
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 max-w-xl mx-auto border rounded shadow"
    >
      <h2 className="text-xl font-bold">Add Shipped To</h2>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        rows={3}
        className="border p-2 w-full"
      />
      <input
        name="gstNo"
        placeholder="GST No"
        value={formData.gstNo}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
