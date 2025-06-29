import { useState } from "react";

interface SimpleAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SimpleAuth({ isOpen, onClose }: SimpleAuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      const body = isLogin 
        ? { email, password }
        : { email, password, firstName, lastName };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("auth_token", data.token);
        alert(isLogin ? "Login successful!" : "Registration successful!");
        window.location.reload();
      } else {
        const error = await response.json();
        alert(error.error || "Authentication failed");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        width: "400px",
        maxWidth: "90vw"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer"
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "1rem",
              boxSizing: "border-box"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "1rem",
              boxSizing: "border-box"
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.75rem",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginBottom: "1rem"
            }}
          >
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        <p style={{ textAlign: "center", margin: 0 }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "#3b82f6",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}