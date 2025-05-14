import React from 'react' 
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from '../Assets/vig_logo.jpg'


const Navbar = () => {
    const navigate = useNavigate(); // Initialize navigate function

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
                <li onClick={() => navigate("/")}>HOME</li>
                    <li>ACADEMICS</li>
                    <li>ADMISSIONS</li>
                    <li>NOTIFICATIONS</li>
                    <li>PEOPLE</li>
                    <li>RESEARCH</li>
                    <li>UNIVERSITY LIFE</li>
                    <li>ABOUT US</li>
                </ul>
            </div>
            <style>{`
            .navbar{
                display:block;
                box-shadow: 0px 1px 3px -2px black;
            }
            .bar1{
                display: flex;
                align-items: center; /* Centers content vertically */
                justify-content: space-between; /* Centers content horizontally */
                height: 30px;
                padding: 0 10px; /* Add slight padding to avoid text touching edges */
                overflow: hidden;
                background-color: rgb(242, 131, 52);
            }
            .bar1 p{
                margin: 0; /* Removes default margin */
                padding: 0; /* Ensures no extra spacing */
                text-align:left;
                font-size: 14px;
            }
            .intro1{
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                list-style: none;
                gap: 20px;
            }
            .intro1 li{
                display: flex;
                align-items: center;
                list-style: none;
                gap: 20px;
                cursor: pointer;
            }
            .bar2{
                display: flex;
                align-items: center; /* Centers content vertically */
                justify-content: space-between; /* Centers content horizontally */
                height: 70px;
                padding: 0 10px; /* Add slight padding to avoid text touching edges */
            }
            .intro2{
                display: flex;
                align-items: left;
                justify-content: space-evenly;
                list-style: none;
                gap: 20px;
            }
            .viglogo img {
                display: block;
                width: 150px; /* Adjust size */
                height: 60px;
            }
            .intro2 li{
                display: flex;
                font-size: 14px;
                font-weight: bold;
                align-items: center;
                list-style: none;
                cursor: pointer;
            }
            `}</style>
        </div>
    )
}
export default Navbar