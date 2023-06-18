const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const cors = require('cors');
const app = express();
const port = 2000;

app.use(express.json());
app.use(cors({origin:'*/*'}))
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tokens", require("./routes/tokens"));
app.use("/api/movies", require("./routes/movies"));

app.get("/",  async (req, res) => {
  try {
    res.status(200).json("Hello");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
