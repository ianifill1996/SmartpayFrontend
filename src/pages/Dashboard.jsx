import { useEffect, useState } from "react";
import PaymentForm from "../components/PaymentForm";
import PaymentList from "../components/PaymentList";
import api from "../api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { logout } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name);
    }
  }, []);

  const fetchPayments = async () => {
    try {
      const { data } = await api.get("/payments");
      setPayments(data);
    } catch (err) {
      alert("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Welcome back, {userName}!</h2>
      <PaymentForm
        onAdd={(newPayment) => setPayments((prev) => [...prev, newPayment])}
      />
      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <PaymentList payments={payments} setPayments={setPayments} />
      )}
      <hr />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;