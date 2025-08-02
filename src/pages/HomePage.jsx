import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function HomePage() {
  const { token, user } = useAuth();

  return (
    <div className="homepage" style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to SmartPay</h1>
      {token ? (
        <div>
          <p>
            Welcome back, <strong>{user?.name || "User"}</strong>!
          </p>
          <Link to="/dashboard">
            <button>Go to Dashboard</button>
          </Link>
        </div>
      ) : (
        <div>
          <p>Please sign up or log in to manage your payments.</p>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;