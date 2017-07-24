import { Meteor } from 'meteor/meteor';
import { bucket_list } from '../imports/bucket_list.js'
import { addBucketList, deleteBucketList } from '../imports/methods.js'

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('bucket_list', function(){
	return Bucket_list.find({userId: this.userId});
});
