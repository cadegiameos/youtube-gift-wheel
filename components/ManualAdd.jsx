import React, { useState } from "react";

export default function ManualAdd({ onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);

  const handleAdd = () => {
    if (!name || amount < 1) return;
    onAdd(name, amount);
    setName("");
    setAmount(1);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "5px", marginRight: "5px" }}
      />
      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        style={{ width: "60px", padding: "5px", marginRight: "5px" }}
      />
      <button onClick={handleAdd} style={{ padding: "5px 10px" }}>Add Name</button>
    </div>
  );
}
