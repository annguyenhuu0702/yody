const express = require("express");
const bodyParser = require("body-parser");
const configRoute = require("./route");
const cors = require("cors");
const { connectDB } = require("./config/connectDB");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const socketIO = require("./socket");
require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});
const port = process.env.PORT || 5000;

socketIO(io);

//Config app
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["duyphan"],
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//   })
// );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static(path.join(__dirname, "/public")));
// Config route
configRoute(app);

// Connect database
connectDB();

// App listening
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
