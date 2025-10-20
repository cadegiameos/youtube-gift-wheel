import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { rainbowColors } from "../utils/colors";

export default function SpinningWheel({ entries, setWinner }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpin = () => {
    const number = Math.floor(Math.random() * entries.length);
    setPrizeNumber(number);
    setMustSpin(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={entries.map((name) => ({
          option: name,
          style: { backgroundColor: rainbowColors[Math.floor(Math.random() * rainbowColors.length)] }
        }))}
        onStopSpinning={() => {
          setWinner(entries[prizeNumber]);
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpin} style={{ marginTop: "10px", padding: "10px 20px" }}>Spin</button>
    </div>
  );
}
