const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const cors = require('cors');
const app = express();
const port = 2000;

app.use(express.json());
app.use(cors({origin:'http://localhost:3000'}))
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tokens", require("./routes/tokens"));
app.use("/api/movies", require("./routes/movies"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
