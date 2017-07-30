# UCSB Collaborate Labs App

Single-page Meteor.js application to the UCSB Collaborate Labs

## About

* You must have [Meteor](https://www.meteor.com/) and [MongoDB](https://www.mongodb.com/) installed to run the app
* Run on localhost:3000
* A web app dedicated for the hardworking friends at UCSB Collaborate Labs
* All-In-One record-keeping application for cleaning records, workshops signup, labs info, lab no show records, wireFrame entries, writeups, and much more to come.

## Features

* Register/Login system
* Admin(OpCo) and User(Cons) System
* Lab Wiki
	* Add/Delete labs (OpCos Only)
* Quarterly Workshops
	* Add/Delete workshops (OpCos Only)
	* Signup/Un-Signup
		* No editing access to other users' signup record
* Cleaning Record
	* Clean/Unclean labs
		* No editing access to other users' record
* Lab No-shows Record
	* Add/Delete lab no-shows record
* Wireframe Record
	* Add/Delete Wireframe record
* Writeup System
	* 3 Types of writeups: Good, Bad, and Late/Missed Shift
	* Add/Delete writeups (OpCos Only)
	* Sign writeups
* Cons Scheduling
	* Front-end implemented
* Night Mode
* Desktop/Tablet/Mobile Responsiveness

## Future Features

*	Admin function
* Back-end implementation of cons scheduling
* Cleaning reset automatically overnight
* Jeopardy back-end implementation
* Forms on modals to minimize use of space
* Limit the amount of workshops each user can sign up
* Export tables to .csv files
* Potentially move data tables to seperate routes to minimize use of resources, especially on mobile devices
* Random color for each user for scheduling purposes

## Bugs

* Nightmode then login, and table borders become black
	* Template where the tables are located is not loaded before the users signup, thus the problem
* Using keyboard to select writeup reason will not trigger excused selection
