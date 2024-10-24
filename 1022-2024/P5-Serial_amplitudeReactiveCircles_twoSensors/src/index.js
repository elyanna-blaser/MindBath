import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "./sketches/sketch.js";

function App() {
  const [amplitude1, setAmplitude1] = useState(0);
  const [amplitude2, setAmplitude2] = useState(0);

  console.log("Attempting to connect to WebSocket");
  const socket = new WebSocket("ws://localhost:3001/");
  socket.onopen = () => {
    console.log("WebSocket connection opened");
  };

  socket.onmessage = (event) => {
    console.log("Received WebSocket data:", event.data);

    // Assuming the server sends two values separated by a comma, e.g., "200,300"
    const [newAmplitude1, newAmplitude2] = event.data.split(",").map(parseFloat);

    console.log("Parsed amplitudes:", newAmplitude1, newAmplitude2);
    setAmplitude1(newAmplitude1);
    setAmplitude2(newAmplitude2);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  return (
    <div className="App">
      <h1>React and p5.js Integration TEST</h1>
      <p>Current Amplitude 1: {amplitude1}</p>
      <p>Current Amplitude 2: {amplitude2}</p>
      <ReactP5Wrapper sketch={sketch} amplitude1={amplitude1} amplitude2={amplitude2} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;