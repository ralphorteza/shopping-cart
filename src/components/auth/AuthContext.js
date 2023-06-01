import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword, 
  signOut,
  updateEmail,
  updatePassword
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const auth = getAuth();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmailAddress(newEmail) {
    return updateEmail(auth.currentUser, newEmail)
  }

  function updateNewPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      // console.log("Authcontext useEffect ran");
      setCurrentUser(user);
      // console.log(user.uid)
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmailAddress,
    updateNewPassword
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
