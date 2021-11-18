// Set port to 80 for development, 443 for production
const PORT = 80;
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

app.set('view engine', 'ejs');
app.use(
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
  res.render("index");
});

const io = socketio(server);

io.on('connection', socket => {
    socket.on("message", (data) => {
        io.emit("message", (data));
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));