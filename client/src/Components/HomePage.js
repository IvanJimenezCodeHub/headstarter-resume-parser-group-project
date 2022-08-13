import React from 'react'
import './HomeStyles.css';
import HRIcon from '../../src/Icons/HR_Representative_Icon.png';
import Apply from '../../src/Icons/Apply.png'
import blueBubble from '../../src/Icons/Blue_Chat_Bubble.png'
import whiteBubble from '../../src/Icons/White_Chat_Bubble.png'
import { Link } from 'react-router-dom';

const HomePage = () => {


    return (
        <div className='container'>

            <div class="container">
                <img className='blueBubble' alt='blueBubble' src={blueBubble} ></img>
                <h3 className='title'> Welcome to the Resume Parser! Let's get started.<br />
                    What Role best fits you?
                </h3>
            </div >
            <div className='container2'>
                <img className='whiteBubble' alt='whiteBubble' src={whiteBubble}></img>
                <Link to="/HRDash">
                    <img className='HRIcon' alt='HRIcon' src={HRIcon} ></img>
                    <p className='text'>I'm an HR Representative</p>
                </Link>
                <Link to="/Application">
                    <img className='Apply' alt='Apply' src={Apply} ></img>
                    <p className='text2'>I am applying for a position</p>
                </Link>
            </div>

        </div >
    )
}

export default HomePage