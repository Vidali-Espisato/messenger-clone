import React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import "./Message.css";

function Message({ username, message }) {
  const isUser = username === message.user;
  return (
    <div className={`message__card ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent className="card_content">
          <Typography color="white" variant="h6" component="h5">
            {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Message;
