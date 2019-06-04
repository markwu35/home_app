import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { wireFrame } from './../dataCollection/wireFrame.js';
Meteor.subscribe("wireFrame");

Template.wireFrame.helpers({
  wireFrame: function(){
    return WireFrame.find({}, {sort: {createdAt: -1}});
  },
	isAdmin: function(){
		if (Meteor.user() === null) {
			return false;
		}
		if (Meteor.user().emails[0].address == "test3@gmail.com"){
			return true;
		}
		return false;
	},
	recordedBy: function(){
		return Meteor.users.findOne({_id: this.recordedBy}).profile.firstName + ' ' + Meteor.users.findOne({_id: this.recordedBy}).profile.lastName.charAt(0) + '.';
	}
});

Template.wireFrame.events({
  "submit .add-wireFrame": function(event){
    var perm = event.target.permNumber.value;
    var checked = event.target.checked.value;
    var comments = event.target.comments.value;

    var entry = [perm,checked,comments];
    Meteor.call('addWireFrame', entry, function(err,result){
    	if (!err){
		    event.target.permNumber.value = '';
		    event.target.checked.value = '';
		    event.target.comments.value = '';
		    Session.set("s_message","You have successfully added this entry!");
		    Session.set('d_message', false);   		
    	}else {
    		Session.set("d_message","You can't have blank fields!");
    		Session.set("s_message", false);
    	}
    });
    return false;
  },
 	"click .delete-wireFrame": function(event){
		var confirm_name = "Delete this entry?";
		if (confirm(confirm_name)) {
			Meteor.call('deleteWireFrame', this._id);
			Session.set("s_message","You have successfully deleted this entry!");
			Session.set('d_message', false);
		}
		return false;
	}
});
