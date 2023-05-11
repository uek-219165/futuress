import React from "react";

const BottomBar = (props) => {
  return (
    <div className="bottom-bar">
      <button className="btn add-btn neon" onClick={() => props.setShowMemo(true)}>
        <i className="bx bxs-plus-circle"></i>
      </button>
    </div>
  );
};

export default BottomBar;
