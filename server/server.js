const express = require('express');
const app = express()

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})