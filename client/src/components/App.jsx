import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {Header, Routines, Home, Register, Login, Profile, MyRoutines, SingleRoutine} from './index';
import { getPublicRoutines, getUserRoutines } from '../api/api';

// const user = [
//     {id: 71, username: 'a'}
// ]
// setUser([])
// const user =[

// ]
const App = () => {
    // const [routines, setRoutines] = useState([]);
    const [publicRoutines, setPublicRoutines] = useState([])
    const [user, setUser] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [singleRoutine, setSingleRoutine] = useState([]);
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');    
    const [isPublic, setIsPublic] = useState(false);  
    // const [userRoutines, setUserRoutines] = useState([]);
    useEffect(() => {

        const getData = async () => {
            const fetchedRoutines = await getPublicRoutines();
            // const userRoutines = await getUserRoutines(token);
            // console.log('userRoutines--->', userRoutines)
            // setPublicRoutines(fetchedRoutines.filter(routine => routine.isPublic))

            setPublicRoutines(fetchedRoutines);
            // setUserRoutines(userRoutines);
        }
        getData();
}, [])
    //    console.log(publicRoutines);
       
return (

    <div>
        <Header user={user} username={username} password={password} setUsername={setUsername} setPassword={setPassword} token={token} setUser={setUser} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
            <Route path='/' element={<Home user={user} isLoggedIn={isLoggedIn} setToken={setToken} setUser={setUser} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}></Route>
            <Route path='/register' element={<Register user={user} isLoggedIn={isLoggedIn} setToken={setToken} setUser={setUser} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}></Route>
            <Route path='/login' element={<Login token={token} user={user} isLoggedIn={isLoggedIn} setToken={setToken} setUser={setUser} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}></Route>
            <Route path='/me' element={<Profile user={user} isLoggedIn={isLoggedIn} setToken={setToken} setUser={setUser} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}></Route>
            <Route path='/routines' element={<Routines name={name} goal={goal} setIsPublic={setIsPublic} isPublic={isPublic} setGoal={setGoal} setName={setName} token={token} publicRoutines={publicRoutines} setPublicRoutines={setPublicRoutines} user={user} isLoggedIn={isLoggedIn}/>}></Route>
            <Route path='/:username/routines' element={<MyRoutines setSingleRoutine={setSingleRoutine} isLoggedIn={isLoggedIn} user={user} token={token}/>}></Route>
            <Route path='/activities' element={<h1>This is activities33</h1>}></Route>
            <Route path='/:routineId' element={<SingleRoutine user={user} token={token} isPublic={isPublic} setIsPublic={setIsPublic} name={name} goal={goal} isLoggedIn={isLoggedIn} singleRoutine={singleRoutine} setGoal={setGoal} setName={setName}/>}></Route>
        </Routes>
    </div>

)
}

export default App;