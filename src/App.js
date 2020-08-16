import React, { useState, useEffect } from "react";
import { Button, Input, FormControl, InputLabel } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import { db } from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      text: input,
      user: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  });

  useEffect(() => {
    setUsername(prompt("Who are you?"));
  }, []);

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
        <Message username={username} message={message} />
      ))}
    </div>
  );
}

export default App;
