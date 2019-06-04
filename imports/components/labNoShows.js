import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { labNoShows } from './../dataCollection/labNoShows.js';
Meteor.subscribe('labNoShows');

Template.labNoShows.helpers({
  labNoShows: function(){
    return LabNoShows.find({}, {sort: {createdAt: -1}});
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

Template.labNoShows.events({
  "submit .add-labNoShows": function(event){
    var SEtime = event.target.startEndTime.value;
    var location = event.target.location.value;
    var className = event.target.className.value;
    var professorName = event.target.professorName.value;

    var entry = [SEtime,location,className,professorName];
    Meteor.call('addLabNoShows', entry, function(err,result){
    	if (!err){
		    event.target.startEndTime.value = '';
		    event.target.location.value = '';
		    event.target.className.value = '';
		    event.target.professorName.value = '';
		    Session.set("s_message","You have successfully added this entry!");
		    Session.set('d_message', false);  		
    	}else {
		    Session.set("d_message","You can't have blank fields!");
		    Session.set("s_message", false);
    	}
    });
    return false;
  },
 	"click .delete-labNoShows": function(event){
		var confirm_name = "Delete this entry?";
		if (confirm(confirm_name)) {
			Meteor.call('deleteLabNoShows', this._id);
			Session.set("s_message","You have successfully deleted this entry!");
			Session.set('d_message', false);
		}
		return false;
	}
});
