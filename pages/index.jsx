import React, { useEffect, useState } from "react";
import SpinningWheel from "../components/SpinningWheel";
import WinnerBox from "../components/WinnerBox";
import Controls from "../components/Controls";
import axios from "axios";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [winner, setWinner] = useState("");

  const fetchEntries = async () => {
    const res = await axios.get("/api/wheel");
    setEntries(res.data);
  };

  const addToWheel = async (name, amount) => {
    await axios.post("/api/wheel", { name, amount });
    fetchEntries();
  };

  const clearWheel = async () => {
    await axios.post("/api/clear");
    setEntries([]);
    setWinner("");
  };

  useEffect(() => {
    fetchEntries();
    const interval = setInterval(async () => {
      await axios.post("/api/youtube-chat");
      fetchEntries();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Lolcow Reaper: Gifted Member Wheel</h1>
      <SpinningWheel entries={entries} setWinner={setWinner} />
      <WinnerBox winner={winner} />
      <Controls addToWheel={addToWheel} clearWheel={clearWheel} />
    </div>
  );
}
