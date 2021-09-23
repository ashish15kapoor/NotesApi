const express = require("express");
// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 3001;

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res, next) => {
  res.json({
    message:
      "This is MyNotes. Add notes quickly daily to set goals and complete them.",
  });

  next();
});

app.all("*", (req, res, next) => {
  console.log(
    "New request: path -> ",
    req.path,
    " method -> ",
    req.method,
    " time -> ",
    Date.now()
  );
  next();
});

require("./app/routes/note.routes.js")(app);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});
