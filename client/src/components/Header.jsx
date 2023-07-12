import React, { useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './Header.css';

const Header = ({isLoggedIn, username, setUsername, password, setPassword, setToken, setUser, setIsLoggedIn, user, token}) => {
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        navigate('/login');
        // const userToAuth={user:{username,password}};
        // const data = await loginUser(userToAuth);
        // if (data.token) {
        //     setToken(data.token);
        //     setUser(data);
        //     setIsLoggedIn(true);
        // }
    }

    const handleRegister = async(event) => {
        event.preventDefault();
        navigate('/register');
        // const userToAuth={user:{username,password}};
        // const data = createUser(userToAuth);
        // if (data.token) {
        //     setToken(data.token);
        //     setUser(data);
        //     setIsLoggedIn(true);
        }

   

    const handleLogout = async(event) => {
        event.preventDefault();
        setToken('');
        setUser([]);
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');

        localStorage.removeItem('token');

        console.log(token);
        console.log(user);
        console.log(isLoggedIn);

        navigate('/');
    }
   

    return (
        <div id='header'>
            <NavLink to="/"><h1>JustFitMe</h1></NavLink>
            <nav>
                <NavLink to="/routines">Routines</NavLink>
                <NavLink to="/activities">Activities</NavLink>
                <>
                {isLoggedIn ? 
                <>
                <button type="submit" onClick={handleLogout}>Logout</button>
                </>
                :
                <>
                <button type="submit" onClick={handleLogin}>Login</button>
                <button type="submit" onClick={handleRegister}>Register</button>
                </>
                }
                </>
            </nav>
        </div>
    )
}

export default Header;