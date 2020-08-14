import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, input]);
    setInput("");
  };
  console.log(input);
  console.log(messages);
  return (
    <div className="App">
      <form>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit" onClick={sendMessage}>
          Touch me
        </button>
      </form>
      {messages.map((message) => (
        <p>{message}</p>
      ))}
    </div>
  );
}

export default App;
