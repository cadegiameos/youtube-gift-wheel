import React from "react";
import ManualAdd from "./ManualAdd";

export default function Controls({ addToWheel, clearWheel }) {
  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <ManualAdd onAdd={addToWheel} />
      <button onClick={clearWheel} style={{ marginLeft: "10px", padding: "5px 10px" }}>Clear Wheel</button>
    </div>
  );
}
