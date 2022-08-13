import React from 'react'
import './ApplicationStyles.css'
import Home2 from '../../Icons/Home2.png'
import changeRole2 from '../../Icons/changeRole2.png'
import Line2 from '../../Icons/line2.png'
import Apply2 from '../../Icons/Apply2.png'
import addFile from '../../Icons/addFile.png'
import { Link } from 'react-router-dom'


const Application = () => {



    return (
        <div>
            <h1 className='heading1'>
                Application
            </h1>
            <Link to='/'>
                <img className='Home2' alt='Home' src={Home2}></img>
            </Link>
            <h5 className='homeText2'>Home</h5>
            <Link to='/HRDash'>
                <img className='changeRole2' alt='changerole' src={changeRole2}></img>
            </Link>
            <h5 className='changeroleText2'>Change Role</h5>
            <img className='line2' alt='line' src={Line2}></img>
            <img className='Apply2' alt='Apply2' src={Apply2}></img>
            <h3 className='applyText'>Applicant</h3>
            <div className='box'>
                <img className='addFile' alt='addFile' src={addFile}></img>
            </div>
            <form >
                <input className="uploadFile" type="file" id="uploadFile"

                />
                <label className='uploadFile2' htmlFor='uploadFile' hidden>

                </label>

            </form>

            <h3 className='ProgressBarHolder'>Dynamic Progress Bar</h3>
            <h3 className='recentFiles'>Recent Files</h3>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" style={{ borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px" }}>File Name</th>
                        <th scope="col">Date</th>
                        <th scope="col" style={{ borderTopRightRadius: "15px", borderBottomRightRadius: "15px" }}>Upload</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >File 1.txt</td>
                        <td >08/12/22</td>
                        <td ><button className='tableUploadButton'>Upload</button></td>

                    </tr>
                    <tr>
                        <td >File 2.txt</td>
                        <td >08/12/22</td>
                        <td ><button className='tableUploadButton'>Upload</button></td>

                    </tr>
                    <tr>
                        <td >File 3.txt</td>
                        <td >08/12/22</td>
                        <td ><button className='tableUploadButton'>Upload</button></td>
                    </tr>

                </tbody>
            </table>



        </div >
    )
}

export default Application