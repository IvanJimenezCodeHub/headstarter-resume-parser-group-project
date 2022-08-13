const express = require("express");
const router = express.Router();
const fs = require("fs");
const XLSX = require("xlsx");

const fileUpload = require("express-fileupload");

const uploadPath = "./uploads/uploadedFiles";

router.use(fileUpload({}));

// GET all files
router.get("/", (req, res) => {
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error(err);
    }
    const candidates = [];
    let readCounter = 0;
    files.forEach((fileName, index) => {
      if (fileName.includes(".txt")) {
        let obj = { name: "", skills: "", experience: "", contact: "" };
        const input = fs.createReadStream(`${uploadPath}/${fileName}`);
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
            candidates.push(obj);
          }
        });
        rl.on("close", () => {
          readCounter++;
          if (readCounter === files.length - 1) {
            res.json({ candidates });
          }
        });
      } else {
        const wb = XLSX.readFile(`${uploadPath}/${fileName}`);
        const sheetName = wb.SheetNames[0];
        const ws = wb.Sheets[sheetName];

        const data = XLSX.utils.sheet_to_json(ws, { raw: false });
        candidates.push(...data);
        readCounter++;
      }
      if (readCounter === files.length - 1) {
        res.json({ candidates });
      }
    });
  });
});

// POST a file
router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ mssg: "no file uploaded" });
  }
  const file = req.files.file; // '.file' comes from the frontend formdata.append

  if (
    file.mimetype === "text/plain" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype === "application/msexcel" ||
    file.mimetype === "application/x-msexcel" ||
    file.mimetype === "application/x-ms-excel" ||
    file.mimetype === "application/x-excel" ||
    file.mimetype === "application/x-dos_ms_excel" ||
    file.mimetype === "application/xls" ||
    file.mimetype === "application/x-xls" ||
    file.mimetype === "application/octet-stream"
  ) {
    console.log("supported file");
    file.mv(`${__dirname}/uploads/uploadedFiles/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: file.name,
        filePath: `/uploads/uploadedFiles/${file.name}`,
      });
    });
  } else {
    console.log("unsupported file");
    res.status(400).json({ error: "filetype not supported" });
  }
});

module.exports = router;
