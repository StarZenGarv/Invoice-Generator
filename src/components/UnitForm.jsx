import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UnitForm({ setUnitData }) {
  const [unitFormData, setUnitFormData] = useState({
    unitName: "",
    descSpace: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUnitFormData({ ...unitFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { unitName, descSpace } = unitFormData;

    if (!unitName || !descSpace) {
      alert("All fields are required.");
      return;
    }

    const newEntry = `${unitName} - ${descSpace}`;
    setUnitData((prev) =>
      prev.includes(newEntry) ? prev : [...prev, newEntry]
    );
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 max-w-xl mx-auto border rounded shadow"
    >
      <h2 className="text-xl font-bold">Add Unit Details</h2>
      <input
        name="unitName"
        placeholder="Unit Name"
        value={unitFormData.unitName}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <textarea
        name="descSpace"
        placeholder="Decimal Spaces"
        value={unitFormData.descSpace}
        onChange={handleChange}
        rows={3}
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
