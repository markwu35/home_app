Meteor.methods({
	addBucketList: function(name){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
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
	}
})
