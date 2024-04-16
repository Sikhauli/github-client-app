# SneakerShop

### Weblink: [Live Website](https://github-client-app.onrender.com)
## Image:
<img width="450px;" src="https://github.com/Sikhauli/SneakerShop/blob/main/src/assets/img/1.png?raw=true"/>

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contributing](#contributing)

## Introduction
  The GitHub Client App is a web application that allows users to authenticate with GitHub and view their user profile information and repository data. 
  This app is built using the MERN stack (MongoDB, Express, React, Node.js) and leverages the GitHub OAuth API for authentication and the GitHub REST API for data retrieval.

## Features
  - Auth: Leverages the GitHub OAuth API for authentication
  - Home: A home page that allows a user to see the updates on their repos 

## Technologies Used
- React.js: A JavaScript library for building user interfaces.
- HTML5 & Tailwindcss: Markup and styling languages for building web pages.
- JavaScript: A programming language for adding interactivity to web applications.
- Git: A version control system for tracking changes and collaborating on projects.
- GitHub 0Auth: A platform for hosting and deploying web applications.
- Github api : A github api that allows retrieval of data from github
- Nodejs:  executes JavaScript code on the server
- ExpressJs: facilitates server-side web application development.
- MongoDB: A versatile NoSQL database known for its scalability

# Installation
To get started with the github-client-app code, follow these steps:

1. Clone the repository to your local machine
2. Install the dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to (http://localhost:5173)
5. Install the server dependencies: `npm install Mongoose express`
6. Start the backend server: `npm start/ nodemon start`
7. Open your browser and navigate to (http://localhost:5000)
8. Configuration - Before running the app, you need to set up a GitHub OAuth App and obtain a client ID and client secret.
                   Follow the instructions in the official GitHub documentation to create a new OAuth app.
                   Once you have obtained your client ID and client secret, create a .env file in the server directory and add the following variables:
                   CLIENT_ID=<your_client_id>
                   CLIENT_SECRET=<your_client_secret>
                   REDIRECT_URI=http://localhost:5173/callback


## Contributing
Contributions are welcome! If you'd like to contribute to github-client-app please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature`
5. Open a pull request.

Thank you for choosing github-client-app! We hope you enjoy your experience.

