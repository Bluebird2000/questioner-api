#### Project Title

Server side application that provides Questioner UI client with data.
Questioner is a crowd-source questions for meetups which helps people interact with one another, It helps share great times with wonderful experience.
Users can create an account or login if they already have one, vote on asked questions and they bubble to the top or bottom of the log.

#### Build Status

Build status of continuous integration i:e travis.

[![Build Status](https://travis-ci.org/Bluebird2000/questioner-api.svg?branch=develop)](https://travis-ci.org/Bluebird2000/questioner-api)
[![Coverage Status](https://coveralls.io/repos/github/Bluebird2000/questioner-api/badge.svg?branch=develop&cacheBuster=1)](https://coveralls.io/github/Bluebird2000/questioner-api?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/b860b2923b24cbb6607b/maintainability)](https://codeclimate.com/github/Bluebird2000/questioner-api/maintainability)

#### Key Features of this Application

+ Users can Register
+ Users that are registered can Log in
+ Users can post question on a specific meetup
+ Users can comment on a particular meetup question
+ Users can upvote and downvote qestions
+ Users can rsvp on a meetup
+ Admin can create a meetup
+ Admin can delete a meetup record

#### Endpoints

* POST /meetups create a new meetup record
* GET /meetups Fetch all meetups record
* GET /meetups/:id Fetch meetup single meetup record
* GET /meetups/upcoming Fecth upcoming meetups
* PUT /meetups/:id Update single meetup record
* DELETE /meetups/:id Delete single meetup record
* POST /meetups/:id/rsvps Create rsvp for a meetup
* POST /users Create a new user account
* GET /users/:id Fetch a single user record
* PUT /users/:id Update a single user record
* POST /questions Create a new meetup question
* GET /questions/:id Fetch a single meetup question
* PUT /question/upvote/:id Upvote a meetup question
* PUT /questions/downvote/:id Downvote a meetup question

#### Local Installation Guide

* Ensure Node is installed
* clone the repository 
* Run `npm install` to install all the application dependencies listed in package.json
* To test the application, run `npm run test`
* On your development machine Run `npm run dev` to start the server in dev mode and visit `http://localhost:4000`

*P.S:* See package.json for project dependencies

#### Deployment on Heroku Server

* Create an account on Heroku
* Ensure you have the Heroku cli installed
* Add Heroku as a remote origin to the project
* git push heroku develop:master
* Access endpoints on https://questioner-api-server.herokuapp.com/api/v1

#### Technologies

* [ECMAScript 2015 - ES6](http://es6-features.org/): This is the newest version of JavsScript with new features such as arrow functions, spread and rest operators and many more.
* [Babel:](https://babeljs.io/)  Babel is used to transpile es6+ js code down to es5.
* [Mocha:](https://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser.

#### Requirements

+ Node 
+ Git 
+ Postman
+ Browser (Google Chrome recommended)

#### Coding Style

- Airbnb 

#### Author

- Ahmad Lateef

#### Acknowledgments
- Andela Developer Challenge
- EPIC
