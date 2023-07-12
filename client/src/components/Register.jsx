import { useNavigate } from "react-router-dom";
import { registerUser } from '../api/api';


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
            await registerUser({username, password});
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
            
        <div id="registerForm">
            <label>
                <input type='text' placeholder="username" onChange={(event) => setUsername(event.target.value)} required/>
            </label>
            <label>
                <input type='text' placeholder="password"onChange={(event) => setPassword(event.target.value)} required/>
            </label>
            <button type="submit" onClick={handleRegister}>Register</button>
        </div>
        <h1>This is register Page</h1>
        </>
    );
}

export default Register;