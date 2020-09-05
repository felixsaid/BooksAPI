const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//books route
app.use("/v1", require("./routes/books"));

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});
