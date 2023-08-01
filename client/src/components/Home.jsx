import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = ({user, setUser, isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword, setToken, }) => {
    // console.log(user, isLoggedIn)
    // const navigate = useNavigate();
    // const handleLogin = async (event) => {
    //     event.preventDefault();
    //     navigate('/login');
    //     // const userToAuth={user:{username,password}};
    //     // const data = await loginUser(userToAuth);
    //     // if (data.token) {
    //     //     setToken(data.token);
    //     //     setUser(data);
    //     //     setIsLoggedIn(true);
    //     // }
    // }

    // const handleRegister = async(event) => {
    //     event.preventDefault();
    //     navigate('/register');
    //     // const userToAuth={user:{username,password}};
    //     // const data = createUser(userToAuth);
    //     // if (data.token) {
    //     //     setToken(data.token);
    //     //     setUser(data);
    //     //     setIsLoggedIn(true);
    //     }
        return (
        <>
            <div className="bg-img"></div>
            <div id="hero">
                <h1>Find your path to better health today.</h1>
                <p id="hr"></p>
                <p>Whether you're a fitness enthusiast or a beginner looking to embark on a wellness journey, we're here to guide and inspire you every step of the way.</p>
                <button>Discover More</button>
            </div>
        </>
    );
}


export default Home;