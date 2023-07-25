import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { useEffect } from "react";
import './Login.css';

const Login = ({user, setUser, isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword, setToken, token }) => {
    // console.log(user, isLoggedIn)

    const navigate = useNavigate();

    const handleLogin = async(event) => {
        event.preventDefault();
        const errorAlert = document.createElement("p")
        errorAlert.append("Please enter a valid username/password combination")
        
        if ((username == '' || password == '')) {
            // errorAlert.setAttribute('id', 'error')
            document.getElementById('loginForm').append(errorAlert)
        }
        const data = await loginUser({username, password}); 
        console.log('data--->' , data);
        // if(data.hasOwnProperty('message')) {
        //     document.getElementById('loginForm').append(errorAlert)

        // }
        if (data.token) {
            setUser(data.user);
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setIsLoggedIn(true);
            // console.log(user);
            // console.log(token);
            // console.log(isLoggedIn);
            navigate('/me');
        }
        // setPassword('');
    }
    
    // useEffect(()=> {

    //     },[user])
        
        return (
        <>
        <div className="rt-bg-img"></div>
        <div id="login">

        <div id="login-form">
            <h1>Login</h1>
            <label>
                <input type='text' placeholder="username" onChange={(event) => setUsername(event.target.value)} required/>
            </label>
            <label>
                <input type='text' placeholder="password"onChange={(event) => setPassword(event.target.value)} required/>
            </label>
            <p><a href="#">Forgot Password?</a></p>
            <button id="login-button" type="submit" onClick={handleLogin}>Login</button>
            <p>Not a member?<a href="#"> Sign up!</a></p>
        </div>
        </div>
        </>
    );
}


export default Login;