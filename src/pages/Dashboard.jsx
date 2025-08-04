import { useEffect, useState } from "react";
import PaymentForm from "../components/PaymentForm";
import PaymentList from "../components/PaymentList";
import ReceiptParser from "../components/ReceiptParser";
import api from "../api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { logout } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [receiptData, setReceiptData] = useState(null); // for optional auto-fill

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

  const handleFillFromReceipt = (parsed) => {
    console.log("Parsed receipt result:", parsed);
    setReceiptData(parsed); // this can be passed to PaymentForm as a prop
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Welcome back, {userName}!</h2>

      {/* Receipt Parsing Component */}
      <ReceiptParser onFillPayment={handleFillFromReceipt} />

      {/* Payment Form with optional prefill */}
      <PaymentForm
        onAdd={(newPayment) => setPayments((prev) => [...prev, newPayment])}
        prefill={receiptData}
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