import React, { useState, useRef } from "react";
import { useAuth } from "./AuthContext";
// import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

// const Signup = () => {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const passwordConfirmationRef = useRef();
//   const { signup } = useAuth();
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (
//       passwordRef.current.value !== passwordConfirmationRef.current.value
//     ) return setError('Passwords do not match');

//     try {
//       setError('');
//       setLoading(true);
//       await signup(emailRef.current.value, passwordRef.current.value);
//       navigate("/")
//     } catch {
//       setError('Failed to create an account');
//     }

//     setLoading(false);

//   }

//   return (
//     <>
//       <div className="sign-in-container">
//         <form onSubmit={handleSubmit}>
//           <h1>Sign Up</h1>
//           {error && <h3>{error}</h3>}
//           <input
//             type="email"
//             placeholder="email"
//             ref={emailRef}
//           />
//           <input
//             type="password"
//             placeholder="enter password"
//             ref={passwordRef}
//           />
//           <input
//             type="password"
//             placeholder="confirm password"
//             ref={passwordConfirmationRef}
//           />
//           <button disabled={loading}>sign up</button>
//         </form>
//       </div>
//       <section>
//         Already have an account? <Link to="/login">Log in</Link>
//       </section>
//     </>
//   );
// 
// };
//

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("inside handledSubmit!")
    if (
      passwordRef.current.value !== passwordConfirmationRef.current.value
    ) return setError('Passwords do not match');

    try {
      setError('')
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }
  
  return (
        <>
      <div className="sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
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
          <input
            type="password"
            placeholder="confirm password"
            ref={passwordConfirmationRef}
          />
          <button disabled={loading}>sign up</button>
        </form>
      </div>
      <section>
        Already have an account? <Link to="/login">Log in</Link>
      </section>
    </>
  );
}


