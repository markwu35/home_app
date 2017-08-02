# UCSB Collaborate Printing Labs App

Single-page Meteor.js application to the UCSB Collaborate Printing Labs

## About

* You must have [Meteor](https://www.meteor.com/) and [MongoDB](https://www.mongodb.com/) installed to run the app
* Run on localhost:3000
* A web app dedicated for the hardworking friends at UCSB Collaborate Printing Labs
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
	* Personal color selection for each user
	* Click and pick style of shift selection
	* Search function
* Night Mode
* Desktop/Tablet/Mobile responsiveness

## Future Features

*	Admin function
* Cleaning reset automatically overnight
* Jeopardy back-end implementation (Twitter API?)
* Admin Panel for adding/deleting records
* Limit the amount of workshops each Cons can sign up
* Ability to export tables to .csv files
* Potentially move data tables to seperate pages to minimize use of resources, especially on mobile devices
* Scheduling
	* Groups A, B, C for signup priority
	* Rules implementation, for example no one hour gap, no more than 6 hours each signup session
* Workshop attendance and feedback

## Bugs

* Nightmode then login, and table borders become black
	* Template where the tables are located is not loaded before the users signup, thus the problem
* Using keyboard to select writeup reason will not trigger excused selection
* Schedule table nightmode
* Register button doesn't work after logged out
