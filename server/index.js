const path = require("path");
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const initializeDBConnection = require("./config/db.connect");
const errorHandlerRoute = require("./middlewares/errorHandler");
const notFoundHandlerRoute = require("./middlewares/routeHandler");
const constants = require("./config/constant");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(helmet()); // Secure our Express apps by setting various HTTP headers.
app.use(compression()); // Compress routes
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Connect to Database.
initializeDBConnection();

// Routes

if (constants.general.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // anything that is not in our api.. will go to client
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hey, Welcome to the backend!");
  });
}

// Not found route Middleware
app.use(notFoundHandlerRoute);
// Error Handler Route Middleware
app.use(errorHandlerRoute);

app.listen(constants.general.PORT, () => {
  console.log("Backend Server is running.");
});
