import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "../components/Spinner";
import ProceedWithGoogle from "../components/clickables/ProceedWithGoogle";

const Register = () => {
  const navigate = useNavigate();
  const notify = (text) => toast(text);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      notify("Provide email!");
      if (window.navigator.vibrate) window.navigator?.vibrate([100, 100, 100]);
      return;
    }

    if (password2 !== password) {
      notify("Passwords don`t match!");
      if (window.navigator.vibrate) window.navigator?.vibrate([100, 100, 100]);
      return;
    }
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        notify(error.message);
        if (window.navigator.vibrate)
          window.navigator?.vibrate([100, 100, 100]);
        setLoading(false);
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
          <label className="form__label" htmlFor="email-address">
            Email address
          </label>
          <input
            type="email"
            label="Email address"
            className="form-control form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            label="Create password"
            className="form-control form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="password2">
            Repeat Password
          </label>
          <input
            type="password"
            label="password2"
            className="form-control form__input"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            placeholder="Repeat Password"
          />
        </div>

        <div className="form__group form__group-btns">
          <button
            className="btn btn-primary form__submit"
            type="submit"
            onClick={onSubmit}
          >
            {isLoading ? <Spinner /> : "Register"}
          </button>
          <ProceedWithGoogle />
          <p className="form__text">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
