require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConn");

const app = express();

const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
