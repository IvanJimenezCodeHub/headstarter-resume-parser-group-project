import React from 'react'
import './HRStyles.css'
import Home from '../../Icons/Home.png'
import changeRole from '../../Icons/changeRole.png'
import Line from '../../Icons/line.png'
import HRIcon2 from '../../Icons/HRIcon2.png'
import whiteBubble2 from '../../Icons/whiteBubble.png'
import blueBubble2 from '../../Icons/blueBubble.png'
import { Link } from 'react-router-dom'

const HRDash = () => {
    return (
        <div>
            <h1 className='heading'>
                HR Resume Parser
            </h1>
            <Link to='/'>
                <img className='Home' alt='Home' src={Home}></img>
            </Link>
            <h5 className='homeText'>Home</h5>
            <Link to='/Application'>
                <img className='changeRole' alt='changerole' src={changeRole}></img>
            </Link>
            <h5 className='changeroleText'>Change Role</h5>
            <img className='line' alt='line' src={Line}></img>
            <img className='HRIcon2' alt='HRIcon2' src={HRIcon2}></img>
            <h3 className='HRText'>HR Representative</h3>
            <img className='blueBubble2' alt='blueBubble2' src={blueBubble2}></img>
            <h2 className='HRText2'>
                Welcome HR representative! To get started with <br />the resume parser, please upload an Excel file.
            </h2>
            <img className='whiteBubble2' alt='whiteBubble2' src={whiteBubble2}></img>
            <img className='blueBubble3' alt='blueBubble3' src={blueBubble2}></img>
            <button className='fileSelect'>Select File...</button>
            <img className='blueBubble4' alt='blueBubble4' src={blueBubble2}></img>
            <button className='cancel'>Cancel</button>




        </div>
    )
}

export default HRDash