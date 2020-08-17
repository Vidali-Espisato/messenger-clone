import React, { useState, useEffect } from "react";
import { Input, FormControl, InputLabel, IconButton } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import { db } from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

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
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  });

  useEffect(() => {
    setUsername(prompt("Who are you?"));
  }, []);

  return (
    <div className="App">
      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Type here...</InputLabel>
          <Input
            className="app__input"
            value={input}
            color="secondary"
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
