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
	}
})
