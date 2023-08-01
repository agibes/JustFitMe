import { useNavigate } from "react-router-dom";
import { registerUser } from '../api/api';
import './Register.css';


const Register = ({user, setUser, isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword, setToken, }) => {
    const navigate = useNavigate();
    const handleRegister = async(event) => {
        event.preventDefault();
        const errorAlert = document.createElement("p")
        errorAlert.append('could not register')
        // errorAlert.setAttribute('id', 'errorAlert')
        // setUsername('');
        // setPassword('');

        // const errorMsg = document.getElementById('error')

        if ((username == '' || password == '') || password.length < 8) {
            // errorAlert.setAttribute('id', 'error')
            document.getElementById('registerForm').append(errorAlert)
        } else {
            // const ele = document.getElementById('errorAlert')
            // console.log(ele);
            console.log({username, password});
            console.log('a')
            await registerUser({username, password});
            console.log('b')

            const successAlert = document.createElement("p")
            successAlert.append('you have been registered, please log in')
            document.getElementById('registerForm').append(successAlert)
            // navigate('/login')

        }
        
        // console.log('nr->',newresponse);
        // setUsername('');
        // setPassword('');
    }
        
        return (
            <>

        {/* <div className="rt-bg-img"></div> */}
        <div className="main" id="register">
            
        <div id="register-form">
            <h1>Register</h1>
            <label>
                <input type='text' placeholder="username" onChange={(event) => setUsername(event.target.value)} required/>
            </label>
            <label>
                <input type='text' placeholder="password"onChange={(event) => setPassword(event.target.value)} required/>
            </label>
            <p>Password must be at least 8 characters long</p>
            <button id="register-button" type="submit" onClick={handleRegister}>Register</button>
            <p>Already a member?<a href="/login"> Login!</a></p>
        </div>
        </div>
        
        </>
    );
}

export default Register;