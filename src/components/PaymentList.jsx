import { useState } from "react";
import api from "../api";

function PaymentList({ payments, setPayments }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [sortBy, setSortBy] = useState("date");
  const [filter, setFilter] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment?")) return;
    try {
      await api.delete(`/payments/${id}`);
      setPayments((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Delete failed.");
    }
  };

  const handleEditToggle = (payment) => {
    setEditId(payment._id);
    setEditForm({
      amount: payment.amount,
      description: payment.description,
      method: payment.method,
      category: payment.category,
    });
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditSave = async (id) => {
    try {
      const { data } = await api.put(`/payments/${id}`, editForm);
      setPayments((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...data } : p))
      );
      setEditId(null);
    } catch {
      alert("Update failed.");
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const sortedFiltered = [...payments]
    .filter(
      (p) =>
        (p.description || "").toLowerCase().includes(filter.toLowerCase()) ||
        (p.category || "").toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "amount"
        ? b.amount - a.amount
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <div>
      <h3>Payment History</h3>
      <div>
        <input
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Newest</option>
          <option value="amount">Highest Amount</option>
        </select>
      </div>
      {sortedFiltered.length === 0 ? (
        <p>No results.</p>
      ) : (
        <ul>
          {sortedFiltered.map((p) => (
            <li key={p._id} style={{ marginBottom: "1rem" }}>
              {editId === p._id ? (
                <div>
                  <input
                    name="amount"
                    type="number"
                    value={editForm.amount}
                    onChange={handleEditChange}
                  />
                  <input
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                  />
                  <input
                    name="method"
                    value={editForm.method}
                    onChange={handleEditChange}
                  />
                  <input
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                  />
                  <button onClick={() => handleEditSave(p._id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>${p.amount}</strong> – {p.description} | {p.category} |{" "}
                  {p.method}
                  <br />
                  <small>{formatDate(p.createdAt)}</small>
                  <br />
                  <button onClick={() => handleEditToggle(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PaymentList;