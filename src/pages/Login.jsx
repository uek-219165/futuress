import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ProceedWithGoogle from "../components/clickables/ProceedWithGoogle";

const Login = () => {
  const navigate = useNavigate();
  const notify = (text) => toast(text);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        notify(errorMessage);
        if (window.navigator.vibrate)
          window.navigator?.vibrate([100, 100, 100]);
        console.log(errorCode, errorMessage);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
  }, [navigate]);

  return (
    <div className="signer">
      <form className="form">
        <img className="logo" src="./assets/logo-light.svg" alt="Futures" />
        <div className="form__group">
          <label className="fomr__label" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control form__input"
            required
            placeholder="Enter email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control form__input"
            required
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group-btns">
          <button className="btn btn-primary form__submit" onClick={onLogin}>
            {isLoading ? <Spinner /> : "Login"}
          </button>
          <ProceedWithGoogle />
          <p className="form__text">
            No account yet? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
