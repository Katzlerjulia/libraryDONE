const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));


// port
const PORT = 3000;
server.listen(PORT, () => { // LYSSNA på port
    console.log('Listening on port*:' + PORT);
});

app.get('/', (req, res) => { // HANTERA GET-request

    res.sendFile(__dirname + '/index.html'); // SKICKA fil
});

app.get('/chat', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/chat.html'); // SKICKA fil
});

// lägger till create endpoint för add (create)
app.get("/create", (req, res) => {
  // HANTERA GET-request

  res.sendFile(__dirname + "/create.html"); // SKICKA fil
});

// lägger till endpoint för UPDATE

app.get("/update", (req, res) => {
  // HANTERA GET-request

  res.sendFile(__dirname + "/update.html"); // SKICKA fil
});

app.get('/search', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/search.html'); // SKICKA fil
});

app.get('/api-test', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/api-test.html'); // SKICKA fil
});

// DELETE
app.get("/delete", (req, res) => {
  // HANTERA GET-request

  res.sendFile(__dirname + "/delete.html"); // SKICKA fil
});

//nedan är chat koden

const mainRoom = "main room";
const waitingRoom = "waiting room";
let peopleInMainRoom = 0;

io.on('connection', (socket) => {

  peopleInMainRoom++;


  // om antalet i chatten endast är 2 - börja chatta
  if(peopleInMainRoom <= 2) {

    socket.join(mainRoom);

    socket.emit('server message', 'Välkommen till chattrummet')

    console.log("Antal personer i main room: " + peopleInMainRoom);
  }
  else { // fler än två - man hamnar i kö
    socket.join(waitingRoom);
    socket.emit('server message', 'Välkommen till chatten ')
    socket.emit('server message', 'Du är placerad i kö...')
  }

  socket.on('disconnect', () => {
    console.log('Användaren lämnade');
    peopleInMainRoom--;
  });

  socket.on('chat message', (message) => {

    io.to(mainRoom).emit('chat message', message);
  })
});
