import { useState } from "react";
import api from "../api";

function ReceiptParser({ onFillPayment }) {
  const [receiptText, setReceiptText] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleParse = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/ai/parse-receipt", { text: receiptText });
      setParsedData(data);
    } catch (err) {
      setError("Failed to parse receipt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "2rem", background: "#f1f1f1", padding: "1rem", borderRadius: "8px" }}>
      <h3>Parse Receipt</h3>
      <textarea
        rows={5}
        placeholder="Paste raw receipt text here..."
        value={receiptText}
        onChange={(e) => setReceiptText(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />
      <button onClick={handleParse} disabled={loading}>
        {loading ? "Parsing..." : "Parse Receipt"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {parsedData && (
        <div style={{ marginTop: "1rem", background: "#fff", padding: "1rem", borderRadius: "6px" }}>
          <h4>Suggested Payment Info</h4>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
          {onFillPayment && (
            <button onClick={() => onFillPayment(parsedData)}>Use This Info</button>
          )}
        </div>
      )}
    </div>
  );
}

export default ReceiptParser;