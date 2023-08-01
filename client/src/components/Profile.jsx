import { React } from 'react';
import './Profile.css'

const Profile = ({isLoggedIn, user}) => {

    console.log(user);

    return (
        <>
        {isLoggedIn ? 
        <>
        {/* <div className="rt-bg-img"></div> */}
        <div className="main" id="profile">

        <h1>Welcome back {user.username}!</h1> 
        <p>Jump back into your routines:</p>
        <div className="routine-activities">
            {user.routines.map(routine=>{
                return(
                    <div className="routine">
                        <h2>{routine.name}</h2>
                        <div id="grid">
                            <h3>Acitivities</h3>
                            <h4>Count</h4>
                            <h4>Duration</h4>
                        {routine.activities.map(activity => {
                            return(
                                <>
                                <p>{activity.name}</p>
                                <p>{activity.duration}</p>
                                <p>{activity.count}</p>
                                </>
                            )
                        })}
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
        </>
        : <h1>Please log in to view your profile</h1>}
        </>
    )
}

export default Profile;