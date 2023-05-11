import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const notify = (text) => toast(text);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        notify("Signed out successfully");
        if (window.navigator.vibrate)
          window.navigator?.vibrate([100, 100, 100]);
        navigate("/login");
      })
      .catch((error) => {
        notify(error);
        if (window.navigator.vibrate)
          window.navigator?.vibrate([100, 100, 100]);
      });
  };

  return (
    <button className="btn btn-primary" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
