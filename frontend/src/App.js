import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    ward: "",
    diagnosis: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/patients";

  // Fetch patients from backend
  const getPatients = async () => {
    try {
      const res = await axios.get(API_URL);
      setPatients(res.data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit for Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: "", age: "", gender: "", ward: "", diagnosis: "" });
      getPatients();
    } catch (err) {
      console.error("Error saving patient:", err);
    }
  };

  // Edit a patient
  const handleEdit = (patient) => {
    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      ward: patient.ward,
      diagnosis: patient.diagnosis,
    });
    setEditingId(patient.id);
  };

  // Delete a patient
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getPatients();
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Hospital Patient Management
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Age - numbers only */}
          <input
            name="age"
            placeholder="number"
            value={form.age}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^\d+$/.test(value)) {
                handleChange(e);
              }
            }}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Gender dropdown */}
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Ward */}
          <input
            name="ward"
            placeholder="Ward"
            value={form.ward}
            onChange={handleChange}
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Diagnosis */}
          <input
            name="diagnosis"
            placeholder="Diagnosis"
            value={form.diagnosis}
            onChange={handleChange}
            className="border rounded p-2 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {editingId ? "Update" : "Add"} Patient
        </button>
      </form>

      {/* Patient Table */}
      <table className="w-full border-collapse shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Ward</th>
            <th className="p-2">Diagnosis</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-100">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.age}</td>
              <td className="p-2">{p.gender}</td>
              <td className="p-2">{p.ward}</td>
              <td className="p-2">{p.diagnosis}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;