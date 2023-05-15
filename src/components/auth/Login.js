import React, { useState, useRef } from 'react'
import { useAuth } from './AuthContext';
import { Link, useNavigate} from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      // navigate("/")
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);

  }

  return (
    <>
      <div className="log-in-container">
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
          <button disabled={loading}>Login</button>
        </form>
        {/* <Link to="/forgot-password">Forgot password?</Link> */}
      </div>
      <br/>
      <section>
        Need an Account? <Link to="/signup">Sign up</Link>
      </section>
    </>
  );
}
