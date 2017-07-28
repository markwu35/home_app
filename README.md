# UCSB Collab App for Cons

Meteor application to the UCSB Collab App.

## About

* You must have [Meteor](https://www.meteor.com/) and [MongoDB](https://www.mongodb.com/) installed to run the app
* Run on localhost:3000
* A web app dedicated for the cons at UCSB Collab
* All-In-One record-keeping application for cleaning records, workshops signup, labs info, lab no show records, and wireFrame entries

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
* Night Mode
* Desktop/Tablet/Mobile Responsiveness

## Future Features

* implement scheduling
* cleaning reset automatically overnight
* change emails into name
* jeopardy backend implementation
* forms on modals to minimize use of space
* enhance write up signing UI

## Bugs

* Jquery doesn't work when you reload, it doesnt update td to class cleaned
* nightmode then login, and table borders become black
* Limit who can access writeups in server main.js and client main.js helpers
* add reset workshop button
* dont rely on html to determine if sign or delete
* dynamic template.body.events clicking implementation
