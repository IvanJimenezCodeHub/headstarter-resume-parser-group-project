import React, { useState } from 'react'
import './Application.css'
import Home2 from '../../Icons/Home2.png'
import changeRole2 from '../../Icons/changeRole2.png'
import Line2 from '../../Icons/line2.png'
import Apply2 from '../../Icons/Apply2.png'
import addFile from '../../Icons/addFile.png'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

const Application = () => {
    const [files, setFiles] = useState([])
    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;

    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            setFiles((oldFiles)=>[...oldFiles, {id: uuidv4(), file: selectedFile}])
        }
        console.log(files);
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
            <h3 className='progress_bar'>Dynamic Progress Bar</h3>
            <h3 className='recent_files'>Recent Files</h3>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">File Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Upload</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.id}>
                            <td>{file.file.name}</td>
                            <td>{date}</td>
                            <td>
                                <button className='table_upload_btn'>Upload</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Application