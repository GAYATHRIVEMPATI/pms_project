import React from 'react' 
import './Navbar.css'
import logo from '../Assets/vig_logo.jpg'


const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='bar1'>
                <p>Vignan's Foundation for Science, Technology & Research (Deemed to be University)</p>
                <ul className='intro1'>
                    <li>International Students</li>
                    <li>New Student</li>
                    <li>Parent</li>
                    <li>Alumni</li>
                    <li>Quick link</li>
                </ul>
            </div>
            <div className='bar2'>
                <div className='viglogo'>
                <img src={logo} alt="Vignan_logo"/></div>
                <ul className='intro2'>
                    <li>HOME</li>
                    <li>ACADEMICS</li>
                    <li>ADMISSIONS</li>
                    <li>NOTIFICATIONS</li>
                    <li>PEOPLE</li>
                    <li>RESEARCH</li>
                    <li>UNIVERSITY LIFE</li>
                    <li>ABOUT US</li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar