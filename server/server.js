const express = require("express");
const app = express();

const fileRequestRoutes = require("./routes/fileRequests");

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
