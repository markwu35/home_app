import { Meteor } from 'meteor/meteor';

import { rooms } from '../imports/rooms.js'
import { labNoShows } from '../imports/labNoShows.js'

import { addReminders, deleteReminders, addRooms, deleteRooms, cleanRoom, resetCleaning } from '../imports/methods.js'

Meteor.startup(() => {
  // code to run on server at startup

});

// Meteor.publish('bucket_list', function(){
// 	return Bucket_list.find({userId: this.userId});
// });
Meteor.publish('rooms', function(){
	return Rooms.find();
});
Meteor.publish('labNoShows', function(){
	return LabNoShows.find();
});
Meteor.publish("userList", function() {
    return Meteor.users.find({}, {fields: { emails: 1, profile: 1 } });
});
