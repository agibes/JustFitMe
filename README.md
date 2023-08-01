# JustFitMe

an API for a new fitness empire, JustFitMe, using node, express, and postgresql

# Overview

Welcome to JustFitMe, the ultimate fitness and activity tracking app designed to help you lead a healthier and more active lifestyle. With its user-friendly interface and powerful features, JustFitMe caters to both unregistered visitors and registered users, providing a seamless experience for all fitness enthusiasts.

# Key Features:

## Activities Tab:

Unregistered Visitors: As an unregistered visitor, you can explore a comprehensive list of all activities that have been created by our community. Discover a wide range of activities to inspire your fitness journey.
Registered Users: Once you sign up, you gain access to creating new activities effortlessly. The app presents a form where you can specify the activity's name and description. In case the activity already exists, the app displays an error prompt, ensuring each activity is unique.

## Sign Up/Sign In:

Unregistered Visitors: The header and footer of the app prominently display a Sign Up/Sign In form to welcome new users. The form can also appear as a tab or within a modal for added convenience.
Registered Users: After successfully signing up, registered users can log in using their username/password combination. Meaningful error messages assist users during login, enabling easy corrections. Users remain logged in between page visits, even if they close their browsers and return later. For added security, a log-out option is available.

## Tabbed Navigation:

The app features tabbed navigation for convenient access to different sections. Users can effortlessly switch between Routines, My Routines (available once logged in), and Activities, each with matching routes.

## Routines Tab:

All users, registered or not, can access the Routines tab to view a list of public routines. The routines display the routine name, goal, and the username of the creator. Additionally, the list includes the activities associated with each routine, providing their names, descriptions, and either duration or count, as relevant.

## My Routines Tab:

For registered users, the My Routines tab offers personalized features. You can create a new routine using a form that includes text fields for the routine name and goal. Additionally, users can update the name and goal for any routine owned by them, delete entire routines, and manage the activities within each routine.
To add activities to a routine, a small form appears, presenting a dropdown list of all available activities. Users can input the count and duration for each activity.
Furthermore, registered users can update the duration or count of any activity within their routines and remove activities from their routines as needed.

## Getting Started

Install Packages

    npm i

Initialize Database

    createdb fitness-dev

Run Seed Script

    npm run seed:dev

## Automated Tests

**NOTE:** At first, there will be too many errors for the tests to even run. Start by running the seed:dev script above, until it is working.

Once you've resolved all errors in your console, we recommend running the DB tests first, and move to API next. When you open the test files, you'll notice that the `it()` blocks defining tests are all prefaced with an `x`. Adding and removing the `x` lets you decide to set some tests as _skipped_, meaning they won't run. To get the tests to run remove the `x`.

If you'd like to remove all of them in a file at once you can use the `CMD + f` on Mac or `CTRL + f` on Windows to begin a search. In the search bar type `xit` and select the drop down arrow at the left of the search bar. You'll see a placeholder in another bar that says replace. In this bar type `it`. Lastly, look to the right hand side and hover your cursor over the icons to find the one that will replace all. Typically this is the last one on the right. Then save the file. If you have run the test script below, you should see the tests begin running in the terminal.

If you only want to run one or two tests, you can add `.only` after `it` and `describe` to isolate that particular test. That is, to run only the tests in a particular `describe` block, use: the syntax `describe.only()`. To isolate one or more `it` blocks, use `it.only()`.

Make sure to read the tests and comments in this repo carefully, they offer some hints every now and again that could save you hours!

To run all the tests in watch mode (re-runs on code update), run

    npm run test:watch

### DB Methods

    npm run test:watch db

### API Routes (server must be running for these to pass)

    npm run test:watch api
