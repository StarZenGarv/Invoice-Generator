import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddBillTo({ setBilledToList, formData, setFormData }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    gstNo: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, state } = formData;
    if (name && state) {
      const newEntry = `${name} - ${address} - ${state}`;
      setBilledToList((prev) =>
        prev.includes(newEntry) ? prev : [...prev, newEntry]
      );
      navigate("/");
    } else {
      alert("Name & State are required");
    }
  };

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 max-w-xl mx-auto border rounded shadow"
    >
      <h2 className="text-xl font-bold">Add Billed To</h2>
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
      <select
        name="state"
        defaultValue="Select State"
        value={formData.state}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select State</option>
        {states.map((state, i) => (
          <option key={i} value={state}>
            {state}
          </option>
        ))}
      </select>
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
