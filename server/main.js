import { Meteor } from 'meteor/meteor';

import { rooms } from '../imports/rooms.js';
import { labNoShows } from '../imports/labNoShows.js';
import { workshops } from '../imports/workshops.js';
import { wireFrame } from '../imports/wireFrame.js';
import { writeUps } from '../imports/writeUps.js';
import { schedules } from '../imports/schedules.js';

import { addReminders, deleteReminders, addRooms, deleteRooms, cleanRoom, resetCleaning, addLabNoShows, deleteLabNoShows, addWireFrame, deleteWireFrame, addWorkshops, deleteWorkshops, claimWorkshops, resetWorkshops, addWriteUps, deleteWriteUps, signWriteUps, addSchedules, removeSchedules, claimSchedules, deleteShifts } from '../imports/methods.js';

Meteor.startup(() => {
  // code to run on server at startup

});

// Meteor.publish('bucket_list', function(){
// 	return Bucket_list.find({userId: this.userId});
// });
Meteor.publish('rooms', function(){
	if (Meteor.user() === null){
		return false;
	}else {
		return Rooms.find();
	}
});
Meteor.publish('labNoShows', function(){
	if (Meteor.user() !== null){
		return LabNoShows.find();
	}
});
Meteor.publish('workshops', function(){
	if (Meteor.user() !== null){
		return Workshops.find();
	}
});
Meteor.publish('wireFrame', function(){
	if (Meteor.user() !== null){
		return WireFrame.find();
	}
});
Meteor.publish('schedules', function(){
	if (Meteor.user() !== null){
		return Schedules.find();
	}
});
Meteor.publish('writeUps', function(){
	//LIMIT WHO CAN ACCESS WRITEUPS
	if (Meteor.user() === null){
		return false;
	} else if (Meteor.user().emails[0].address == "test3@gmail.com"){
		return WriteUps.find();
	}else {
		return WriteUps.find({assignedTo: Meteor.userId() });
	}
	
});
Meteor.publish("userList", function() {
	if (Meteor.user() !== null){
    return Meteor.users.find({}, {fields: { emails: 1, profile: 1 } });
  }
});
