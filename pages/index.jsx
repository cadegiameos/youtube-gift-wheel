import React, { useState, useEffect } from "react";

// Placeholder components
function SpinningWheel({ entries, setWinner }) {
  return (
    <div style={{ height: "300px", border: "2px solid #ccc", borderRadius: "10px", margin: "20px", textAlign: "center" }}>
      <p>Wheel placeholder</p>
      <p>{entries.length} entries</p>
      <button onClick={() => setWinner(entries[Math.floor(Math.random() * entries.length)] || "")}>
        Spin
      </button>
    </div>
  );
}

function WinnerBox({ winner }) {
  return (
    <div style={{ marginTop: "10px", fontWeight: "bold" }}>
      {winner ? `Winner: ${winner}` : "Winner will appear here"}
    </div>
  );
}

function ManualAdd({ onAdd }) {
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

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [winner, setWinner] = useState("");

  const addToWheel = (name, amount) => {
    const newEntries = [...entries];
    for (let i = 0; i < amount; i++) newEntries.push(name);
    setEntries(newEntries);
  };

  const clearWheel = () => {
    setEntries([]);
    setWinner("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Lolcow Reaper: Gifted Member Wheel</h1>
      <SpinningWheel entries={entries} setWinner={setWinner} />
      <WinnerBox winner={winner} />
      <ManualAdd onAdd={addToWheel} />
      <button onClick={clearWheel} style={{ marginTop: "10px", padding: "5px 10px" }}>Clear Wheel</button>
    </div>
  );
}
