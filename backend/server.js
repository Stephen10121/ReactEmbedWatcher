// Set port to 80 for development, 443 for production
const PORT = 443;
let https;
if (PORT == 80) {
  https = require("http");
} else {
  https = require("https");
}
// Import modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser')
const socketio = require('socket.io');
const app = express();
const cors = require('cors');

app.set('view engine', 'ejs');
app.use(
    cors(),
    express.json(),
    express.static('public'),
    express.urlencoded({ extended: true }),
    cookieParser()
    );

let server;
if (PORT == 80) {
  server = https.createServer(app);
} else {
  server = https.createServer(
      {
          key: fs.readFileSync(path.join(__dirname,"key.key")),
          cert: fs.readFileSync(path.join(__dirname,"cert.crt"))
      },
      app
  );
}

app.get("/", (req, res) => {
  res.render("index3");
});

app.get("/message", (req, res) => {
  res.render("index3");
});

const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    console.log(`New user: ${socket.id}`);
    socket.on("message", (message2) => {
        io.emit("message", message2);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));