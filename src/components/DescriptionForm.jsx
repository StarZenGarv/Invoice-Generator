import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function DescriptionForm({ setDescData }) {
  const [descFormData, setDescFormData] = useState({
    itemName: "",
    hsnCode: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDescFormData({ ...descFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { itemName, hsnCode } = descFormData;

    if (!itemName || !hsnCode) {
      alert("All fields are required.");
      return;
    }

    const newEntry = `${itemName} - ${hsnCode}`;
    setDescData((prev) =>
      prev.includes(newEntry) ? prev : [...prev, newEntry]
    );
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 max-w-xl mx-auto border rounded shadow"
    >
      <h2 className="text-xl font-bold">Add Description</h2>
      <input
        name="itemName"
        placeholder="Item Name"
        value={descFormData.itemName}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <textarea
        name="hsnCode"
        placeholder="HSN Code"
        value={descFormData.hsnCode}
        onChange={handleChange}
        rows={3}
        className="border p-2 w-full"
      />
      <select name="" id=""></select>
      <Link to="/unit" className="text-blue-600 underline">
        + Add Unit Details
      </Link>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
