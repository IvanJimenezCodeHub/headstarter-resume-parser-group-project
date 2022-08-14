import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css';
import HRIcon from '../../src/Icons/HR_Representative_Icon.png';
import Apply from '../../src/Icons/Apply.png';
import blueBubble from '../../src/Icons/Blue_Chat_Bubble.png';
import whiteBubble from '../../src/Icons/White_Chat_Bubble.png';

const HomePage = () => {
    return (
        <div className='container'>
            <div className='container'>
                <img className='blue_bubble' alt='blue_bubble' src={blueBubble} ></img>
                <h3 className='title'> 
                    Welcome to the Resume Parser! Let's get started.
                    <br />
                    What Role best fits you?
                </h3>
            </div >
            <div className='second_container'>
                <img className='white_bubble' alt='white_bubble' src={whiteBubble}></img>
                <Link to="/HRDashboard">
                    <img className='hr_icon' alt='hr_icon' src={HRIcon} ></img>
                    <p className='hr_text'>
                        I'm an HR Representative
                    </p>
                </Link>
                <Link to="/Application">
                    <img className='apply_icon' alt='apply_icon' src={Apply}></img>
                    <p className='applicant_text'>
                        I am applying for a position
                    </p>
                </Link>
            </div>
        </div >
    )
}

export default HomePage