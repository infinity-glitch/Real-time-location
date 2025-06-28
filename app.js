const express = require("express");
const app = express();
const path = require("path");
const http = require("http");

const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

// Set up EJS and static folder
app.set("view engine", "ejs");
// This line tells Express to serve static files (like your script.js) from the 'public' directory.
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO logic
io.on("connection", function (socket) {
    console.log("User connected:", socket.id);

    // When a client sends their location
    socket.on("send-location", function (data) {
        // Broadcast the received location to all connected clients (including the sender)
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // When a client disconnects
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        // Optionally, you might want to emit an event here to remove the marker from other clients' maps
        // io.emit("user-disconnected", socket.id);
    });
});

// Route for the homepage
app.get("/", (req, res) => {
    // Renders the 'index.ejs' file
    res.render("index");
});

// Start the server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});