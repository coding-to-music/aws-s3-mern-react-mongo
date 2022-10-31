const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./models");
// const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const db = process.env.MONGO_URI;
const anotherPort = process.env.PORT;

console.log("app.js: db ", db);
console.log("app.js: anotherPort ", anotherPort);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

// mongoose.connect(
//   process.env.MONGO_URI
// );
// mongoose.Promise = Promise;

app.use(morgan("dev")); // very nice logger for debugging

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

console.log(`app.js: port `, port);
console.log(`app.js: process.env.PORT `, process.env.PORT);

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
