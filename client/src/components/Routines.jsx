import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createRoutine } from '../api/api';
import './Routines.css'

// As any user on the Routines tab, I want to:
// see a list of all public routines showing:
//**************************************** complete ****************************************// The routine name, goal, and creator's username
// A list of activities for the routine, including their name, description, and duration and/or count

// As a registered user on the My Routines tab, I want to:
//**************************************** complete ****************************************// be shown a form to create a new routine
//**************************************** complete ****************************************// the form should have text fields for name and goal

// for each routine which is owned by me I should
//**************************************** complete ****************************************// be able to update the name and goal for the routine
//**************************************** complete ****************************************// be able to delete the entire routine
// be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
// be able to update the duration or count of any activity on the routine
// be able to remove any activity from the routine

const Routines = ({publicRoutines, setPublicRoutines, isLoggedIn, user, token, setGoal, name, goal, setName, isPublic, setIsPublic}) => {  

    const navigate = useNavigate();
    const navigationLink = '/' + user.username + '/routines'

    const handleNavigate = () => {
        navigate(navigationLink);
    }

    // const routineToCreate = {
    //     creatorId: user.id,
    //     isPublic,
    //     name,
    //     goal
    // }

    // const handleCreateNewRoutine = async(event) => {
    //     event.preventDefault();
    //     // console.log('routine to create---->',routineToCreate)
    //     const newRoutine = await createRoutine(routineToCreate, token);
    //     // console.log('new routine---->',newRoutine);
    //     setPublicRoutines([newRoutine,...publicRoutines])
    //     console.log('public routines from create--------->',{publicRoutines})
    //     navigate('/me');
    // }

    const [active, setActive] = useState(publicRoutines[Math.floor(publicRoutines.length/2)]);
    const [prev, setPrev] = useState({});
    const [next, setNext] = useState({});

    useEffect(()=> {
        if (publicRoutines[(publicRoutines.indexOf(active) + 1)]) {
            setNext(publicRoutines[(publicRoutines.indexOf(active) + 1)])
        }
        console.log('next', next);
    
        if (publicRoutines[(publicRoutines.indexOf(active) - 1)]) {
            setPrev(publicRoutines[(publicRoutines.indexOf(active) - 1)])
        }

    }, [])

    function loadPrev() {
        if (publicRoutines[(publicRoutines.indexOf(active) - 1)]) {
            if (publicRoutines[(publicRoutines.indexOf(prev) - 1)]) {
                setPrev(publicRoutines[(publicRoutines.indexOf(prev) - 1)])
            } else {
                setPrev({})
            }
            setNext(publicRoutines[publicRoutines.indexOf(active)])
            setActive(publicRoutines[(publicRoutines.indexOf(active) - 1)])
        }
    }

    function loadNext() {
        if (publicRoutines[(publicRoutines.indexOf(active) + 1)]) {
            console.log(Object.keys(next).length)
            if (publicRoutines[(publicRoutines.indexOf(next) + 1)]) {
                setNext(publicRoutines[(publicRoutines.indexOf(next) + 1)])
            } else {
                setNext({})
            }
            setPrev(publicRoutines[publicRoutines.indexOf(active)])
            setActive(publicRoutines[(publicRoutines.indexOf(active) + 1)])
        }
    }

    return (
        <>
        <div className="rt-bg-img"></div>

        <div id="routines">
            <h1>Routines</h1>
            <p id="routines-info">We offer a variety of workout routines tailored to different fitness levels and objectives. Whether you're aiming to build strength, lose weight, improve flexibility, or enhance athletic performance, our diverse range of programs ensures there's something for everyone.</p>
        <div id="routines-browse">

         <div id="routine-carousel">
            <button id="prev" onClick={loadPrev}>&#60;</button>
            {Object.keys(prev).length > 0 &&
                <div className="routine-card" id="routine-prev">
                    <img src={prev.img} alt="" />
                    <div class="routine-info">
                        <p>Name: {prev.name}</p>
                        <p>Goal: {prev.goal}</p>
                        <p>Creator ID: {prev.creatorName}</p>
                        <br/>
                    </div>
                </div>
            }

            {Object.keys(prev).length == 0 &&
                <div className="routine-card" id="routine-last">
                    <img src={prev.img} alt="" />
                </div>
            }

            <div class="routine-card" id="routine-active">
                <img src={active.img} alt="" />
                <div className="routine-info">
                    <p>Name: {active.name}</p>
                    <p>Goal: {active.goal}</p>
                    <p>Creator ID: {active.creatorName}</p>
                    <br/>
                </div>
            </div>

            {Object.keys(next).length > 0 &&
                <div className="routine-card" id="routine-next">
                    <img src={next.img} alt="" />
                    <div className="routine-info">
                        <p>Name: {next.name}</p>
                        <p>Goal: {next.goal}</p>
                        <p>Creator ID: {next.creatorName}</p>
                        <br/>
                    </div>
                </div>
            }

            {Object.keys(next).length == 0 &&
                <div className="routine-card" id="routine-last">
                    <img src={next.img} alt="" />
                </div>
            }


             <button id="next" onClick={loadNext}>&#62;</button>
         </div>
        
        </div>
        <button id="create-button">Create A Routine</button>
        </div>

        </>
        )
        
}

export default Routines;

        // {isLoggedIn &&
        // <>
        // <button onClick={handleNavigate}>My Routines</button>
        // <div id="createNewRoutineForm">
        // <form>
        //     <label>
        //         <input type="text" placeholder='name' onChange={(event)=>setName(event.target.value)} required/>
        //     </label>
        //     <label>
        //         <input type="text" placeholder='goal' onChange={(event)=>setGoal(event.target.value)} required/>
        //     </label>            
        //     <label>Make Routine Public
        //         <input type="checkbox" onChange={(event)=>setIsPublic(event.target.checked)}/>
        //     </label>
        // <button onClick={handleCreateNewRoutine}>Create New Routine</button>

        // </form>
        // </div>
        // </>
        // }
        // {/* {console.log(publicRoutines)} */}




        // <div id="routine-carousel">
        //     <button id="prev" onClick={loadPrev}>&#60;</button>
        //     {publicRoutines.length && publicRoutines != undefined && 
        //     publicRoutines.map(routine => {
        //         // setSingleRoutine(routine)
        //         return (
        //             <>
        //             <div key={routine.id} class="routine-card">
        //                 <img src="#" alt="" />
        //                 <div class="routine-info">
        //                     <p>Name: {routine.name}</p>
        //                     <p>Goal: {routine.goal}</p>
        //                     <p>Creator ID: {routine.creatorName}</p>
        //                     <br/>
        //                 </div>
        //             </div>
        //             </>
        //             )
        //         })
        //     }
        //     <button id="next" onClick={loadNext}>&#62;</button>
        // </div>