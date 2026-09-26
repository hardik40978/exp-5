
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password) {
      alert("Please enter username and password");
      return;
    }

    const enteredUsername = username.trim().toLowerCase();

    let role = "";

    if (enteredUsername === "admin" && password === "123") {
      role = "admin";
    } else if (enteredUsername === "editor" && password === "123") {
      role = "editor";
    } else if (enteredUsername === "viewer" && password === "123") {
      role = "viewer";
    } else {
      alert("Invalid Username or Password");
      return;
    }

    localStorage.setItem("token", "jwt_token_123456");
    localStorage.setItem("username", enteredUsername);
    localStorage.setItem("role", role);

    navigate("/dashboard");
  };

  return (
    <main className="login-page">

      <div className="login-decoration">
        <div className="orb orb-one"></div>
        <div className="orb orb-two"></div>
        <div className="grid-pattern"></div>
      </div>

      <section className="login-shell">

        {/* LEFT SIDE */}
        <div className="brand-panel">

          <div className="brand-mark">J</div>

          <p className="eyebrow">SECURE ACCESS</p>

          <h1>
            Welcome to your
            <br />
            workspace.
          </h1>

          <p className="brand-copy">
            Manage role-based access from one clean and secure dashboard.
          </p>

          <div className="security-pills">
            <span>✓ JWT Protected</span>
            <span>✓ Role Based</span>
          </div>

        </div>

        {/* LOGIN SIDE */}
        <div className="login-panel">

          <div className="mobile-brand">
            <div className="brand-mark small">J</div>
          </div>

          <p className="eyebrow">SIGN IN</p>

          <h2>Access your account</h2>

          <p className="login-subtitle">
            Enter your credentials to continue.
          </p>

          <label>Username</label>

          <div className="input-wrap">
            <span>⌁</span>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleLogin()
              }
            />
          </div>

          <label>Password</label>

          <div className="input-wrap">
            <span>••</span>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleLogin()
              }
            />
          </div>

          <button
            className="login-submit"
            onClick={handleLogin}
          >
            Sign in
            <span>→</span>
          </button>

          <div className="demo-box">

            <strong>Demo Credentials</strong>

            <div>
              <span>Admin</span>
              <code>admin / 123</code>
            </div>

            <div>
              <span>Editor</span>
              <code>editor / 123</code>
            </div>

            <div>
              <span>Viewer</span>
              <code>viewer / 123</code>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Login;