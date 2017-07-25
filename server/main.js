import { Meteor } from 'meteor/meteor';

import { bucket_list } from '../imports/bucket_list.js'
import { shopping_list } from '../imports/shopping_list.js'
import { reminders } from '../imports/reminders.js'

import { rooms } from '../imports/rooms.js'

import { addBucketList, deleteBucketList, addShoppingList, deleteShoppingList, addReminders, deleteReminders, addRooms, deleteRooms, cleanRoom, resetCleaning } from '../imports/methods.js'

Meteor.startup(() => {
  // code to run on server at startup

});

Meteor.publish('bucket_list', function(){
	return Bucket_list.find({userId: this.userId});
});
Meteor.publish('shopping_list', function(){
	return Shopping_list.find({userId: this.userId});
});
Meteor.publish('reminders', function(){
	return Reminders.find({userId: this.userId});
});
Meteor.publish('rooms', function(){
	return Rooms.find({userId: this.userId});
});
