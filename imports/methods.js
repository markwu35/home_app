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
			var APM = "AM";
		} else {
			var APM = "PM";
		}
		var time = h + ":" + d.getMinutes() + " " + APM;
		Rooms.update({name: roomId}, { $set: { cleaned: true, cleanedAt: time, cleanedBy: Meteor.userId()}}, true, true);
	},
	deleteRooms: function(roomId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		Rooms.remove(roomId);
	}
})

