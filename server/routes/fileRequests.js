const express = require("express");
const router = express.Router();
const fs = require("fs");

const fileUpload = require("express-fileupload");
const { response } = require("express");

const textFilesPath = "./uploads/textFiles";
const spreadsheetPath = "./uploads/spreadsheets";

router.use(fileUpload({}));

// GET all files
router.get("/", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree", "userFour"] });
  // This is just dummy data
});

// GET all txt files
router.get("/plainText", (req, res) => {
  fs.readdir(textFilesPath, (err, files) => {
    if (err) {
      console.error(err);
    }
    let candidate = [];
    let closedCounter = 0;

    files.forEach((fileName, index) => {
      // send an array of objects to client
      let obj = { name: "", skills: "", experience: "", contact: "" };
      const input = fs.createReadStream(`${textFilesPath}/${fileName}`);
      const rl = require("readline").createInterface({
        input: input,
        terminal: false,
      });

      rl.on("line", (line) => {
        if (line.includes("Name")) {
          obj.name = line.slice(line.indexOf(": ") + 2);
        }

        if (line.includes("Skills")) {
          obj.skills = line.slice(line.indexOf(": ") + 2);
        }
        if (line.includes("Experience")) {
          obj.experience = line.slice(line.indexOf(": ") + 2);
        }

        if (line.includes("Contact")) {
          obj.contact = line.slice(line.indexOf(": ") + 2);
          candidate.push(obj);

          if (index === files.length - 1) {
            console.log("file length");
          }
        }
      });
      rl.on("close", () => {
        closedCounter++;
        if (closedCounter === files.length - 1) {
          res.json({ candidate });
        }
      });
    });
  });
});

// POST a file
router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ mssg: "no file uploaded" });
  }
  const file = req.files.file; // '.file' comes from the frontend formdata.append
  // case: file is a .txt
  if (file.mimetype === "text/plain") {
    console.log("plain text");
    file.mv(`${__dirname}/uploads/textFiles/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: file.name,
        filePath: `/uploads/textFiles/${file.name}`,
      });
    });
  }
  // case: file is a .numbers or .xlsx. Can also switch this to a general else clause.
  else if (
    file.mimetype === "application/octet-stream" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    file.mv(`${__dirname}/uploads/spreadsheets/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: file.name,
        filePath: `/uploads/spreadsheets/${file.name}`,
      });
    });
  }
  // case: other file mimetypes. NOTE - didn't add support for .xls, xlsb, etc from excel
  else {
    console.log("file not supported");
    // need to send error
  }
  //console.log(file.data.toString());
});

// console.log(file) -> 'data' property is a buffer. can do buffer.toString(), might be useful later.

module.exports = router;
