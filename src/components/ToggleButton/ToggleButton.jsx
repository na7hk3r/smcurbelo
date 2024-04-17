import React from "react";
import "./ToggleButton.css";

const ToggleButton = () => {
  return (
    <label className="switch">
      <input type="checkbox" defaultChecked />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleButton;
