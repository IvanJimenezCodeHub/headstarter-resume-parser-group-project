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
                <h3 className='title'> Welcome to resume parser! <br />
                    What Role best fits you?
                </h3>
            </div >
            <img className='whiteBubble' alt='whiteBubble' src={whiteBubble}></img>

            <img className='HRIcon' alt='HRIcon' src={HRIcon} ></img>
            <Link to="/HRDash">
                <button className='button1'>I am an HR Representative</button>
            </Link>
            <img className='Apply' alt='Apply' src={Apply} ></img>
            <Link to="/Application">
                <button className='button2'>I am applying for a position</button>
            </Link>


        </div >
    )
}

export default HomePage