import React, { useState } from "react";
import "./HRStyles.css";
import Home from "../../Icons/Home.png";
import changeRole from "../../Icons/changeRole.png";
import Line from "../../Icons/line.png";
import HRIcon2 from "../../Icons/HRIcon2.png";
import whiteBubble2 from "../../Icons/whiteBubble.png";
import blueBubble2 from "../../Icons/blueBubble.png";
import { Link } from "react-router-dom";
import searchMag from "../../Icons/SearchMag.png";
import filter from "../../Icons/filter.png";
import axios from "axios";

const HRDash = () => {
  axios.defaults.baseURL = "http://localhost:8080";
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedfile] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/fileRequests/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { fileName, filePath } = res.data;
      setUploadedfile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("problem w. server");
      } else {
        console.log(err.response.data.mssg);
      }
    }
  };

  return (
    <div>
      <h1 className="heading">HR Resume Parser</h1>
      <Link to="/">
        <img className="Home" alt="Home" src={Home}></img>
      </Link>
      <h5 className="homeText">Home</h5>
      <Link to="/Application">
        <img className="changeRole" alt="changerole" src={changeRole}></img>
      </Link>
      <h5 className="changeroleText">Change Role</h5>
      <img className="line" alt="line" src={Line}></img>
      <img className="HRIcon2" alt="HRIcon2" src={HRIcon2}></img>
      <h3 className="HRText">HR Representative</h3>
      <img className="blueBubble2" alt="blueBubble2" src={blueBubble2}></img>
      <h2 className="HRText2">
        Welcome HR representative! To get started with <br />
        the resume parser, please upload an Excel file.
      </h2>
      <img className="whiteBubble2" alt="whiteBubble2" src={whiteBubble2}></img>
      <div>
        <input
          className="form-control form-control-lg"
          id="formFileLg"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name);
            console.log(e.target.files[0].name);
          }}
        />
      </div>
      <img className="blueBubble3" alt="blueBubble3" src={blueBubble2}></img>
      <form onSubmit={onSubmit}>
        <input type="submit" value="Upload" className="upload" />
        <button className="upload">Upload</button>
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center"> {uploadedFile.fileName} </h3>
          </div>
        </div>
      ) : null}
      <button className="cancel">Cancel</button>

      <h3 className="fileLoadingHolder">FileName.txt is loading...</h3>
      <h3 className="ProgressBarHolder2">Dynamic Progress Bar</h3>

      <form className="d-flex" role="search">
        <input
          className="form-control2 me-2"
          type="search"
          placeholder="Search..."
          aria-label="Search"
        />
      </form>
      <img className="searchMag" alt="searchMag" src={searchMag}></img>
      <img className="filter" alt="filter" src={filter}></img>

      <table className="table2 table-bordered">
        <thead>
          <tr>
            <th
              style={{
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
              }}
            >
              Candidate Name
            </th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Contact</th>
            <th>Contact Status</th>
            <th
              style={{
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px",
              }}
            >
              Interview Status
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <td>Candidate Name</td>
            <td>Skills</td>
            <td>Experience</td>
            <td>Contact</td>
            <td>
              <button type="button" className="contactedButton">
                Contacted
              </button>
            </td>
            <td>
              <button type="button" className="interviewButton">
                Interview
              </button>
            </td>
          </tr>
          <tr>
            <td>Candidate Name</td>
            <td>Skills</td>
            <td>Experience</td>
            <td>Contact</td>
            <td>
              <button type="button" className="contactedButton">
                Contacted
              </button>
            </td>
            <td>
              <button type="button" className="interviewButton">
                Interview
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HRDash;
