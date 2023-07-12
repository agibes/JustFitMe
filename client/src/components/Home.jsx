import { useNavigate } from "react-router-dom";
import './Home.css'


// As an unregistered visitor I want to:
//**************************************** complete ****************************************// see a Sign Up/Sign In form in the header/footer, on a tab (with or without matching route) or in a modal
//**************************************** complete ****************************************// be able to sign up for a new account with valid username/password combination
// see meaningful messages if there are errors during registration, so that I may correct them
//**************************************** complete ****************************************// see tabbed navigation for Routines and Activities (with matching routes)

// As a registered user I want to:
//**************************************** complete ****************************************//be able to log in with my username/password combination
// see meaningful messages if there are errors during login, so that I may correct them
// stay logged in between page visits (for example, if I close my browser, and come back later)
//**************************************** complete ****************************************// be able to log out if I am logged in
//**************************************** complete ****************************************//see tabbed navigation for Routines, My Routines (once logged in), and Activities (with matching routes)
// 
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
            <div class="bg-img">
                {/* <img src="boxing.jpg" alt="" /> */}
            </div>
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