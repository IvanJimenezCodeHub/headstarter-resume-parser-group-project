const express = require("express");
const app = express();

const fileRequestRoutes = require("./routes/fileRequests");
const cors = require("cors");
app.use(cors({ origin: "*" }));

// to log incoming request path & method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// use fileRequests.js to handle requests
app.use("/api/fileRequests", fileRequestRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
