import React, { useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./authentication.css"

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { currentUser, updateEmailAddress, updateNewPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  function handleSubmit(e) {
    e.preventDefault();
    
    if (
      passwordRef.current.value !== passwordConfirmationRef.current.value
    ) return setError('Passwords do not match');

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmailAddress(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updateNewPassword(passwordRef.current.value));
    }

    Promise.all(promises).then(() => {
      navigate("/");
    }).catch(() => {
      setError("Failed to Update Account");
    }).finally(() => {
      setLoading(false);
    });

  }

  return (
    <div className="authentication">
      <div className="updateprofile--card">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          {error && <h3>{error}</h3>}
          <input
            type="email"
            placeholder="email"
            ref={emailRef}
            defaultValue={currentUser.email}
          />
          <input
            type="password"
            placeholder="enter new password | leave blank if no change"
            ref={passwordRef}

          />
          <input
            type="password"
            placeholder="confirm new password | leave blank if no change"
            ref={passwordConfirmationRef}

          />
          <button
            className="updateprofile button" 
            disabled={loading}
            >
              Update
            </button>
        </form>
        <section className="section--cancel">
          <Link to="/">cancel</Link>
        </section>
      </div>
    </div>
  );
};

export default UpdateProfile;