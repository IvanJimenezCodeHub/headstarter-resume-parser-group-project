import React, { useState } from 'react'
import './Application.css'
import Home2 from '../../Icons/Home2.png'
import changeRole2 from '../../Icons/changeRole2.png'
import Line2 from '../../Icons/line2.png'
import Apply2 from '../../Icons/Apply2.png'
import addFile from '../../Icons/addFile.png'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import Progress from '../Progress'

const Application = () => {
    axios.defaults.baseURL = "http://localhost:8080";
    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
    const [files, setFiles] = useState([])
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            setFiles((oldFiles) => [...oldFiles, { id: uuidv4(), file: selectedFile }])
        }
        console.log(files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prevFiles = [...files]
        const file = prevFiles.find(file => file.id === e.target[0].value)
        const updatedFiles = prevFiles.filter(file => file.id !== e.target[0].value)
        setFiles(updatedFiles)

        const formData = new FormData();
        formData.append("file", file.file);

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
        catch(err) {
            if(err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
            setUploadPercentage(0)
        }
    }

    return (
        <div> 
            <h1 className='heading'>
                Application
            </h1>
            <Link to='/'>
                <img className='home' alt='home' src={Home2}></img>
                <h5 className='home_text'>Home</h5>
            </Link>
            <Link to='/HRDash'>
                <img className='change_role' alt='change_role' src={changeRole2}></img>
                <h5 className='change_role_text'>Change Role</h5>
            </Link>
            <img className='line' alt='line' src={Line2}></img>
            <img className='apply' alt='apply' src={Apply2}></img>
            <h3 className='apply_text'>Applicant</h3>

            <div className='box'>
                <label className='upload_img_box' htmlFor='uploadFile'>
                    <img className='add_file' alt='add_file' src={addFile} />
                    <p>Upload File</p>
                </label>
                <input className="upload_file" type="file" id="uploadFile" onChange={handleFile} />
            </div>
            <Progress percentage={uploadPercentage} />
            <h3 className='recent_files'>Recent Files</h3>
            <table className="table_style table-bordered">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Date</th>
                        <th>Upload</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.id}>
                            <td>{file.file.name}</td>
                            <td>{date}</td>
                            <td>
                                <form onSubmit={handleSubmit}>
                                    <input type='hidden' name='file_id' value={file.id} />
                                    <button className='table_upload_btn' type='submit'>Upload</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Application