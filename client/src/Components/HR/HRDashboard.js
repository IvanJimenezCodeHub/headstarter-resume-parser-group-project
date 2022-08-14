import React, { useState, useEffect } from "react";
import "./HRDashboard.css";
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
import Progress from '../Progress';

const HRDashboard = () => {
  axios.defaults.baseURL = "http://localhost:8080";
  const [file, setFile] = useState("");
  const [files, setFiles] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [searchTerm, setSearchTerm] = useState([])

  useEffect(() => {
    let fetched = true;
    const getFiles = async () => {
      const filesFromServer = await fetchFiles();
      if (fetched) {
        setFiles(filesFromServer);
      }
    };
    getFiles();
    return () => (fetched = false);
  }, []);
  const fetchFiles = async () => {
    try {
      const response = await fetch("api/fileRequests/");
      const json = await response.json();
      if (response.ok) {
        console.log("ok");
        return json;
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log("problem with server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/api/fileRequests/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(Math.round((progressEvent.loaded * 100) /
              progressEvent.total)));
        }
      });
      setTimeout(() => setUploadPercentage(0), 3000);
    }
    catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
      setUploadPercentage(0)
    }
  };

  const search = (data) => {
    return data.filter((item) => item.Skills.toLowerCase().includes(searchTerm.toString().toLowerCase()));
  };

  return (
    <div>
      <h1 className="heading_3">
        HR Resume Parser
      </h1>

      <Link to="/">
        <img className="home_3" alt="home_3" src={Home} />
        <h5 className="home_text_3">Home</h5>
      </Link>

      <Link to="/Application">
        <img className="change_role_3" alt="change_role_3" src={changeRole} />
        <h5 className="change_role_text_3">Change Role</h5>
      </Link>

      <img className="line_3" alt="line_3" src={Line} />
      <img className="hr_icon_3" alt="hr_icon_3" src={HRIcon2} />


      <h3 className="hr_text_2">HR Representative</h3>
      <img className="blue_bubble_3" alt="blue_bubble_3" src={blueBubble2} />

      <h2 className="hr_text_3">
        Welcome HR representative! To get started with
        <br />
        the resume parser, please upload an Excel file
        <br />
        or a Text file
      </h2>
      <img className="white_bubble_3" alt="white_bubble_3" src={whiteBubble2} />

      <div>
        <input
          className="form_control_3 form-control-lg"
          id="form_file_lg"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      </div>

      <form onSubmit={onSubmit}>
        <input type="submit" value="Upload" className="upload_3" />
        <button className="upload_3">Upload</button>
      </form>

      <form className="d-flex" role="search">
        <input
          className="form_control_2"
          type="search"
          placeholder="Search..."
          aria-label="Search"
        />
      </form>

      <img className="search_mag" alt="search_mag" src={searchMag} />
      <img className="filter" alt="filter" src={filter} />

      <Progress percentage={uploadPercentage} />
      {files && (
        <table className="table table-bordered">
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
            {files.candidates.map((candidateObject) => (
              <tr>
                <td>{candidateObject.name}</td>
                <td>{candidateObject.skills}</td>
                <td>{candidateObject.experience}</td>
                <td>{candidateObject.contact}</td>
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HRDashboard;
