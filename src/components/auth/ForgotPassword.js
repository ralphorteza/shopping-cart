import React, { useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);

  }

  return (
    <>
      <div className="log-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Password Reset</h1>
          {error && <h3>{error}</h3>}
          {message && <h3>{message}</h3>}
          <input
            type="email"
            placeholder="email"
            ref={emailRef}
          />
          <button disabled={loading}>Reset Password</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
      <br/>
      <section>
        Need an Account? <Link to="/signup">Sign up</Link>
      </section>
    </>
  );
};

export default ForgotPassword;