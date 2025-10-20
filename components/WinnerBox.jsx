import React from "react";

export default function WinnerBox({ winner }) {
  return (
    <div style={{
      marginTop: "15px",
      padding: "10px",
      border: "2px solid #ccc",
      borderRadius: "10px",
      width: "200px",
      marginLeft: "auto",
      marginRight: "auto",
      fontWeight: "bold",
      fontSize: "1.2rem",
      backgroundColor: "#f5f5f5"
    }}>
      {winner ? `Winner: ${winner}` : "Winner will appear here"}
    </div>
  );
}
