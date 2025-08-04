import { useState, useEffect } from "react";
import api from "../api";

function PaymentForm({ onAdd, prefill }) {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    method: "",
    category: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // 👇 New: apply prefill if available
  useEffect(() => {
    if (prefill) {
      setFormData((prev) => ({
        ...prev,
        amount: prefill.amount || "",
        description: prefill.description || "",
        method: prefill.method || "",
        category: prefill.category || "",
        date: prefill.date || "",
      }));
    }
  }, [prefill]);

  // ✅ FIX: Define handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/payments", formData);
      onAdd(data);
      setFormData({
        amount: "",
        description: "",
        method: "",
        category: "",
        date: "",
      });
    } catch (err) {
      alert("Failed to add payment.");
    } finally {
      setLoading(false);
    }
  };

  const handleAIDetect = async () => {
    if (!formData.description) return alert("Add a description first!");
    setAiLoading(true);
    try {
      const { data } = await api.post("/ai/intent", {
        message: formData.description,
      });
      setFormData((prev) => ({ ...prev, category: data.category }));
    } catch {
      alert("AI failed to detect category.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>Add New Payment</h3>
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        name="method"
        placeholder="Method (Cash, Card, etc.)"
        value={formData.method}
        onChange={handleChange}
        required
      />
      <label htmlFor="date">Date of Payment:</label>
      <input
        type="date"
        name="date"
        id="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <div>
        <button type="button" onClick={handleAIDetect} disabled={aiLoading}>
          {aiLoading ? "Detecting..." : "AI Detect Category"}
        </button>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit Payment"}
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;