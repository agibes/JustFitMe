import { React } from 'react';

const Profile = ({isLoggedIn}) => {



    return (
        <>
        {isLoggedIn ? <h1>hello from profile</h1> : <h1>Please log in to view your profile</h1>}
        </>
    )
}

export default Profile;