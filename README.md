## School Management

Overview
This system is a web-based API that enables teachers to manage administrative functions for their students. Teachers and students are uniquely identified by their email addresses. The API will be developed using Node.js, TypeScript,  with modern practices such as RESTful principles and secure data handling.

## Technologies used
    a. NodeJs<br />
    b. ExpressJs : ^4.21.2<br />
    c. TypeScript<br />
    d. MySQL<br />

## Unit tests  
Unit tests are written by using 'Jest' and 'supertest'.

## Getting Started
Clone the project or download the zip file

step 1: Install the dependencies using `npm i` or `yarn i`

step 2: Database setup<br />
    a. Run the SQL dump (school_management.sql) provided in the repository in the sql environment. It will create database and Tables required to run the application.<br />
    b. Update the credentials in the .env file<br />

step 3: Build the application `npm run build`

step 4: Run the application `npm start`. It will start the app at http://localhost:8000

step 5: Running the unit tests `npm run test`

