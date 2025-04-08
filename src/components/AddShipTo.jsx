import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddBillTo({ formData, setFormData }) {
    let navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, address, gstNo } = formData;

        if (!name || !address || !gstNo) {
            alert('All fields are required.');
            return;
        }

        setSubmitted(true);
        navigate('/')
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto border rounded shadow">
            <h2 className="text-xl font-bold">Customer Details</h2>

            <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Address</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="border p-2 w-full rounded"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">GST No</label>
                <input
                    type="text"
                    name="gstNo"
                    value={formData.gstNo}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
}
