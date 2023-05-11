import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { FormControl, TextField, Button, Typography } from "@mui/material";

const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const userId = nanoid();

  const chatSubmit = (e) => {
    e.preventDefault();

    socket.emit("chat", {
      message: message,
      userName: "somnath",
      to: "Hitesh",
      userId: userId,
    });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (data) => {
      setChat([...chat, data]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2">Chat bot</Typography>
        {chat.map((data, index) => (
          <Typography key={index}>
            message : {data.message}
            {"  "}
            <Typography sx={{ background: "#f50057" }} variant="caption">
              Id : {data.userId}
            </Typography>
          </Typography>
        ))}
        <FormControl
          onSubmit={chatSubmit}
          component="form"
          sx={{ display: "flex", flexDirection: "row", gap: 2 }}
        >
          <TextField
            label="Enter your message"
            variant="standard"
            name="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></TextField>
          <Button type="submit" variant="contained" color="success">
            Send
          </Button>
        </FormControl>
      </header>
    </div>
  );
}

export default App;
