// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser, createUserRoutine, getAllUsers, createActivity, createRoutine, getRoutinesWithoutActivities, getAllActivities, getAllRoutines, createRoutineActivity, attachRoutineActivitiesToRoutines} = require('./');
const client = require("./client")

//////////////////

//the next thing im trying to do is attach the userRoutines to the user. (succesfully created the user routines) but my function to attach it and to get all the users are not working as expected

////////////////////////

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    
    DROP TABLE IF EXISTS routine_activities;
    DROP TABLE IF EXISTS user_routines;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL CHECK (length(password) > 7)
      );

      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES users(Id),
        "isPublic" BOOLEAN DEFAULT false,
        name VARCHAR(255) UNIQUE NOT NULL,
        goal VARCHAR(255) NOT NULL,
        img VARCHAR(255) NOT NULL
      );

      CREATE TABLE routine_activities (
        id SERIAL PRIMARY KEY,
        "routineId" INTEGER REFERENCES routines(Id),
        "activityId" INTEGER REFERENCES activities(Id),
        duration INTEGER,
        count INTEGER,
        UNIQUE ("routineId", "activityId")
      );

      CREATE TABLE user_routines (
        id SERIAL PRIMARY KEY,
        "routineId" INTEGER REFERENCES routines(Id),
        "userId" INTEGER REFERENCES users(Id),
        UNIQUE ("routineId", "userId")
      );
    `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    
    const usersToCreate = [
      { username: "albert", password: "bertie99" },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
    ]

    // await Promise.all(usersToCreate.map(createUser));
    
    const users = await Promise.all(usersToCreate.map(createUser))
    // console.log("Users created:")
    // console.log(users)

    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
}

async function createInitialUserRoutines() {
  console.log('starting to create initial user routines...');
  const userRoutinesToCreate = [
    {routineId: 1, userId: 1},
    {routineId: 2, userId: 1},
    {routineId: 1, userId: 2},
    {routineId: 2, userId: 3},
    {routineId: 3, userId: 3}
  ]

  await Promise.all(userRoutinesToCreate.map(createUserRoutine))




  console.log('finished creating userRoutines!')
}

async function createInitialActivities() {
  try {
    console.log("Starting to create activities...")

    const activitiesToCreate = [
      { name: "Wide-grip Standing Barbell Curl", description: "Unlike the traditional barbell curl, the wide grip places more emphasis on the outer portion of the biceps, providing a well-rounded arm workout."},
      { name: "Incline Dumbbell Hammer Curl", description: "The incline dumbbell hammer curl is a variation of the traditional bicep curl that targets not only the biceps but also the brachialis, contributing to overall arm development. The incline angle increases the range of motion and places more tension on the muscle fibers."},
      { name: "Bench Press", description: "The bench press is a classic compound exercise that primarily targets the chest, shoulders, and triceps."},
      { name: "Push Ups", description: "Push-ups are a classic bodyweight exercise that target the chest, shoulders, triceps, and core muscles. They can be performed anywhere and are an excellent way to build upper body strength and endurance." },
      { name: "Squats", description: "Squats are a fundamental compound exercise that targets multiple muscle groups, including the quadriceps, hamstrings, glutes, and core. They are highly effective for building lower body strength, power, and stability." },
      { name: "Running", description: "Running is a natural and effective form of cardiovascular exercise that provides numerous health benefits, including improved cardiovascular fitness, increased stamina, and stress relief." },
      { name: "Stair Climbing", description: "It is an effective cardiovascular workout that targets various muscles in your lower body, providing excellent benefits for your overall fitness and stamina." },
    ]
    
    await Promise.all(activitiesToCreate.map(createActivity));

    // const activities = await Promise.all(activitiesToCreate.map(createActivity))
    // console.log("activities created:")
    // console.log(activities)

    console.log("Finished creating activities!")
  } catch (error) {
    console.error("Error creating activities!")
    throw error
  }
}

async function createInitialRoutines() {
  console.log("starting to create routines...")

  const routinesToCreate = [
    {
      creatorId: 2,
      isPublic: true,
      name: "Biceptacles: Lift to Believe",
      goal: "Work the Back and Biceps.",
      img: "bicep.jpg"
    },
    {
      creatorId: 1,
      isPublic: true,
      name: "The Muscle Hustle",
      goal: "To beef up the Chest and Triceps!",
      img: "chest.jpg"
    },
    {
      creatorId: 1,
      isPublic: true,
      name: "Legs-ercise",
      goal: "Running, stairs, squats",
      img: "leg.jpg"
    },
    {
      creatorId: 2,
      isPublic: true,
      name: "Fly Like a Butterfly",
      goal: "Jump Rope, Boxing, Stuff that gets your heart pumping!",
      img: "cardio.jpg"
    },
  ]

  await Promise.all(routinesToCreate.map((routine) => createRoutine(routine)));

  // const routines = await Promise.all(
  //   routinesToCreate.map((routine) => createRoutine(routine))
  // )
  // console.log("Routines Created: ", routines)
  console.log("Finished creating routines.")
}

async function createInitialRoutineActivities() {
  console.log("starting to create routine_activities...")

  const routineActivitiesToCreate = [
    {
      routineId: 1,
      activityId: 1,
      count: 10,
      duration: 3
    },
    {
      routineId: 1,
      activityId: 2,
      count: 8,
      duration: 2
    },
    {
      routineId: 1,
      activityId: 3,
      count: 10,
      duration: 2
    },
    {
      routineId: 1,
      activityId: 4,
      count: 6,
      duration: 4
    },
    {
      routineId: 2,
      activityId: 1,
      count: 10,
      duration: 2
    },
    {
      routineId: 2,
      activityId: 2,
      count: 8,
      duration: 3
    },
    {
      routineId: 2,
      activityId: 3,
      count: 10,
      duration: 2
    },
    {
      routineId: 2,
      activityId: 4,
      count: 8,
      duration: 3
    },
    {
      routineId: 3,
      activityId: 5,
      count: 10,
      duration: 3
    },
    {
      routineId: 3,
      activityId: 6,
      count: 0,
      duration: 20
    },
    {
      routineId: 3,
      activityId: 7,
      count: 0,
      duration: 20
    },
    {
      routineId: 4,
      activityId: 4,
      count: 6,
      duration: 4
    },
    {
      routineId: 4,
      activityId: 6,
      count: 0,
      duration: 25
    }
  ]

  await Promise.all(routineActivitiesToCreate.map((routineActivity) => createRoutineActivity(routineActivity)))

  // const routineActivities = await Promise.all(
  //   routineActivitiesToCreate.map((routineActivity) => createRoutineActivity(routineActivity))
  // )
  // console.log("routine_activities created: ", routineActivities)

  const routines = await getAllRoutines();

  const routinesToReturn = await attachRoutineActivitiesToRoutines(routines)

  // console.log('routinestoReturn', routinesToReturn)
  console.log("Finished creating routine_activities!")
}

async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialActivities()
    await createInitialRoutines()
    await createInitialUserRoutines()
    await createInitialRoutineActivities()
    await getAllUsers();

  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
}