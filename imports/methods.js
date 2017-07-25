var blankName;

(function(){
    blankName=function(name){
    	if(name==''){
    		alert('Item cannot be blank!');
        throw new Meteor.Error('Item cannot be blank!');
    	}
    };
}());

Meteor.methods({
	addBucketList: function(name){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		blankName(name);
		Bucket_list.insert({
			name: name,
			createdAt: new Date(),
			userId: Meteor.userId()
		});
	},
	deleteBucketList: function(taskId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		Bucket_list.remove(taskId);
	},

	addShoppingList: function(name){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		blankName(name);
		Shopping_list.insert({
			name: name,
			createdAt: new Date(),
			userId: Meteor.userId()
		});
	},
	deleteShoppingList: function(taskId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		Shopping_list.remove(taskId);
	},

	addReminders: function(name){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		blankName(name);
		Reminders.insert({
			name: name,
			createdAt: new Date(),
			userId: Meteor.userId()
		});
	},
	deleteReminders: function(taskId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		Reminders.remove(taskId);
	},

	addRooms: function(roomId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		blankName(roomId);
		Rooms.insert({
			name: roomId,
			createdAt: new Date(),
			userId: Meteor.userId(),
			cleaned: false,
			cleanedAt: '',
			cleanedBy: ''
		});
		console.log("inserted");
	},
	cleanRoom: function(roomId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		var d = new Date();
		var h = d.getHours();
		if (h <12){
			var hr = '0' + h;
			var APM = "AM";
		} else {
			var hr = h;
			var APM = "PM";
		}
		var m = d.getMinutes();
		if (m < 10){
			var mi = '0' + m;
		} else {
			var mi = m;
		}
		var time = hr + ":" + mi + " " + APM;
		Rooms.update({name: roomId}, { $set: { cleaned: true, cleanedAt: time, cleanedBy: Meteor.userId()}}, false, true);
	},
	deleteRooms: function(roomId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		Rooms.remove(roomId);
	},

	resetCleaning: function(){
		var rooms = Rooms.find({cleaned: true}).fetch();
 		for (i in rooms) {
 			var t = rooms[i].name;
			Rooms.update({name: t}, { $set: { cleaned: false, cleanedAt: '', cleanedBy: ''}}, false, true);
		}
	}

})
