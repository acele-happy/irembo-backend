[![Coverage Status](https://coveralls.io/repos/github/acele-happy/irembo-backend/badge.svg?branch=master)](https://coveralls.io/github/acele-happy/irembo-backend?branch=master)
# ZipUrl

This project aims to a shorter and unique
alias given a long URL.

# Prerequisites
Node.js installed on your machine. You can download it here.
MongoDB installed and running locally or a MongoDB instance to connect to.
Git installed on your machine. You can download it here.
Installation
Clone the repository to your local machine:

git clone https://github.com/acele-happy/irembo-backend/
Navigate to the project directory:

cd project-directory
Install dependencies:

npm install
Configuration
Create a .env file in the root directory of the project.

Add the following environment variables to the .env file:

plaintext
Copy code
PORT=3000
MONGODB_URI=<your-mongodb-uri>
SECRET_KEY=<your-secret-key>
Running the Application
To start the application, run the following command:

npm start
The server will start running at http://localhost:3000.

Testing
To run tests, execute the following command:
npm test
This will run the test suite and display the results.
