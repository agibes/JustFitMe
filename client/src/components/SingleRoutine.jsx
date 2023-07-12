import { React } from 'react';
import { updateRoutine, deleteRoutine } from '../api/api'
import { useNavigate } from 'react-router-dom';

const SingleRoutine = ({token, user, isLoggedIn, singleRoutine, name, goal, setGoal, isPublic, setIsPublic, setName}) => {
    const navigate = useNavigate();
    const updateFields = {
        id:singleRoutine.id,
        creatorId:singleRoutine.creatorId,
        isPublic,
        name,
        goal
    }
    
    const handleUpdate = () => {
    if (!name) {
        updateFields.name = singleRoutine.name;
    }
    if (!goal) {
        updateFields.goal = singleRoutine.goal;
    }
    console.log(updateFields);
    console.log('we are working on updating with your desired changes')
    updateRoutine(token, updateFields);
}
const handleDelete = async () => {
    console.log('we are working on deleting this routine')
    console.log(singleRoutine.id, token)
    await deleteRoutine(singleRoutine.id, token);
    console.log('routine deleted');
    navigate(`/${user.username}/routines`);
}
return (
    <>
    {isLoggedIn ? 
        <>
        <p>this is the routine you want to edit</p>
        <form key={singleRoutine.id}>
            <label htmlFor="">Name:
                <input type="text" placeholder={singleRoutine.name} onChange={(event)=>setName(event.target.value)}/>
            </label>            
            <label htmlFor="">Goal:
                <input type="text" placeholder={singleRoutine.goal} onChange={(event)=>setGoal(event.target.value)}/>
            </label>

            <label>Make Public
                <input type="checkbox" onChange={(event)=>setIsPublic(event.target.checked)}/> 
            </label>

        </form>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        </>
        :
        <p>you must be logged in to edit</p>
    }
    </>
)
}

export default SingleRoutine;