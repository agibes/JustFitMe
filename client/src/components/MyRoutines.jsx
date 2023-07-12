import { React, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { getPublicRoutines, getUserRoutines } from '../api/api';

const MyRoutines = ({isLoggedIn, user, token, setSingleRoutine}) => {
    const navigate = useNavigate();
    const {username} = useParams();

    const [userRoutines, setUserRoutines] = useState([]);

    useEffect(()=> {
        const userRoutinesFuction = async (token) => {
            const userRoutines = await getUserRoutines(username, token);
            // console.log(userRoutines);
            setUserRoutines(userRoutines)
        }
        userRoutinesFuction(token);
    }, [])

    console.log('userroutines--->',userRoutines);
    return (
        <>
        <div id="routines">

        {!isLoggedIn ?
            <h1>Please login to view your routines</h1>
            : 
            <h1>All of {username}'s Routines</h1>
        }
        
        {isLoggedIn && userRoutines.length && 
            userRoutines.map(routine => {
                return (
                    
                    <div key={routine.id}>
                        <button id={routine.id} onClick={()=>{
                            setSingleRoutine(routine);
                            navigate(`/:${routine.id}`);
                        }}>&#9998;</button>
                        <p>Name: {routine.name}</p>
                        <p>Goal: {routine.goal}</p>
                        <p>Creator ID: {routine.creatorId}</p>
                        <br/>
                    </div>
                    
                    )
                })}
                
        {!userRoutines &&
            <p>You have no routines to display yet!</p>
        }
        </div>
        </>
    )
}

export default MyRoutines