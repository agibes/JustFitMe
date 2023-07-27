import { React } from 'react';
import './Profile.css'

const Profile = ({isLoggedIn, user}) => {



    return (
        <>
        {isLoggedIn ? 
        <>
        <div className="rt-bg-img"></div>
        <div id="profile">

        <h1>Welcome back {user.username}!</h1> 
        <p>Jump back into your routine activities:</p>
        <div className="routine-activities">
            <div className="routine-activities-card">

            </div>
        </div>
        </div>
        </>
        : <h1>Please log in to view your profile</h1>}
        </>
    )
}

export default Profile;