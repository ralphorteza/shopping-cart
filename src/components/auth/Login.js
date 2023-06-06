import React, { useState, useRef } from 'react'
import { useAuth } from './AuthContext';
import { Link, useNavigate} from "react-router-dom";
import "./authentication.css"

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/")
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  }

  return (
    <div className="authentication">
      <div className="login--card">
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          {error && <h3>{error}</h3>}
          <input
            type="email"
            placeholder="email"
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="enter password"
            ref={passwordRef}
          />
          <button
            className="login--button button" 
            disabled={loading}
            >
              Login
            </button>
        </form>
        <section className="section--forgotpassword">
          <p>Forgot password?</p><Link to="/forgot-password">Reset</Link>
        </section>
        <section className="section--signup">
        <p>Need an Account?</p><Link to="/signup">Sign up</Link>
      </section>
      </div>
      <br/>

    </div>
  );
}
