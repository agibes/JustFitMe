//As an unregistered visitor on the Activities tab, I want to:

// see a list of all activities which have been created
// As a registered user on the Activities tab, I want to:

// be shown a form to create a new activity (by name and description)
// be shown an error if the activity already exists

import React from 'react';
import './Activities.css'

const Activities = ({allActivities}) => {  

    return (
        <>
        <div className="rt-bg-img"></div>

        <div id="activities">
            <h1>Activities</h1>
            <p id="activities-info">Adding variety to your fitness routine is crucial to staying motivated and engaged in your workouts. By incorporating these dynamic fitness activities into your regimen, you'll not only achieve your fitness goals but also have a blast along the way.</p>
        <div id="activities-browse">

        <img id="body-img" src="body.png" alt="body" />
        
         <div id="activity-carousel">

            {allActivities.map(activity => {
                return(

                <div key={activity.id} class="activity-card">
                    <img src="#" alt="" />
                    <div class="activity-info">
                        <p>Name: {activity.name}</p>
                        <p>Description: {activity.description}</p>
                        <br/>
                    </div>
                </div>
                )
            })}

         </div>
        
        </div>
        <button id="create-button-a">Create An Activity</button>
        </div>

        </>
        )
        
}

export default Activities;