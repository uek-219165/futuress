import React from "react";

const Spinner = (props) => {
  return (
    <div
      className={`spinner-border ${props.dark ? "text-dark" : ""} spinner`}
      role="status"
    >
      <span className="sr-only"></span>
    </div>
  );
};

export default Spinner;
