import React, { useState } from "react";
import { Button, Input, FormControl, InputLabel } from "@material-ui/core";
import "./App.css";
import Message from "./Message";

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
        <FormControl>
          <InputLabel>Type here...</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            Touch me
          </Button>
        </FormControl>
      </form>
      {messages.map((message) => (
        <Message text={message} />
      ))}
    </div>
  );
}

export default App;
