import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = (props) => {
  return (
    <div>
      {props.code} - {props.message}
      <NavLink to="/"></NavLink>
    </div>
  );
};

export default ErrorPage;
