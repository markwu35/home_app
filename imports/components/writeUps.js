import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { writeUps } from './../dataCollection/writeUps.js';


Meteor.subscribe("writeUps");

Template.writeUps.helpers({
	isAdmin: function(){
		if (Meteor.user() === null) {
			return false;
		}
		if (Meteor.user().emails[0].address == "test3@gmail.com"){
			return true;
		}
		return false;
	},
	numGoodWriteUps: function (){
		return WriteUps.find({type: 'good',assignedTo: Meteor.userId()}).count();
	},
	numBadWriteUps: function (){
		return WriteUps.find({type: 'bad',assignedTo: Meteor.userId()}).count();
	},
	numMissedShifts: function (){
		return WriteUps.find({type: 'shift',assignedTo: Meteor.userId()}).count();
	},
  writeUps: function (){
    return WriteUps.find({}, {sort: {createdAt: -1}});
  },
  goodWriteUps: function (){
    return WriteUps.find({type: 'good',assignedTo: Meteor.userId()}, {sort: {createdAt: -1}});
  },
  badWriteUps: function (){
    return WriteUps.find({type: 'bad',assignedTo: Meteor.userId()}, {sort: {createdAt: -1}});
  },
  missedShifts: function (){
    return WriteUps.find({type: 'shift',assignedTo: Meteor.userId()}, {sort: {createdAt: -1}});
  },
  unSigned: function (){
    if (this.signed === false) {
      return true;
    }
    return false;
  },
  period: function (){
    if (this.period == '') {
      return '-';
    }
    return this.period;
  },
  excused: function (){
  	if (this.excused == '') {
  		return 'no';
  	}
  	return this.excused;
  },
  type: function (){
  	if (this.type == 'bad') {
  		return 'Bad';
  	} else if (this.type == 'good'){
  		return 'Good';
  	} else if (this.type == 'shift'){
  		return 'Late/Missed Shift';
  	} else {
  		return this.type;
  	}
  },
  class_signed: function(){
    if(this.signed){
      return 'cleaned';
    } else {
      return 'un-signed';
    }
  },
	assignedTo: function(){
		return Meteor.users.findOne({_id: this.assignedTo}).profile.firstName + ' ' + Meteor.users.findOne({_id: this.assignedTo}).profile.lastName.charAt(0) + '.';
	},
	assignedBy: function(){
		return Meteor.users.findOne({_id: this.assignedBy}).profile.firstName + ' ' + Meteor.users.findOne({_id: this.assignedBy}).profile.lastName.charAt(0) + '.';
	}
});

Template.writeUps.events({
	'click #writeUpType': function(event){
		$('#writeUpType').change(function() {
			$('#bad').toggle($(this).val() == 'bad');
		}).change();
		$('#writeUpType').change(function() {
		   $('#shift').toggle($(this).val() == 'shift');
		}).change();
	},
  "submit .add-writeUps": function(event){
    var email = event.target.email.value;
    var type = event.target.type.value;
    var reason = event.target.reason.value;
    var excused = event.target.excused.value;
    var period = event.target.period.value;
    var date = event.target.date.value;

    var entry = [email,type,reason,excused,period,date];
    Meteor.call('addWriteUps', entry, function(err,result){
    	if (!err) {
		    event.target.email.value = '';
		    event.target.type.value = '';
		    event.target.reason.value = '';
		    event.target.excused.value = '';
		    event.target.period.value = '';
		    event.target.date.value = '';
		    Session.set("s_message","You have successfully submmited a writeup!");
		    Session.set('d_message', false);
		    $('#bad').css("display","none");
		    $('#shift').css("display","none");
    	}else {
    		Session.set("d_message",err.message);
    		Session.set("s_message", false);
    	}
    });

    return false;
  },
  "click .delete-writeUps": function(event){
    var confirm_name = "Delete this writeup?";
    if (confirm(confirm_name)) {
      Meteor.call('deleteWriteUps', this._id);
      Session.set("s_message","You have successfully deleted this writeup!");
      Session.set('d_message', false);
    }
    return false;
  },
  "click .sign-writeUps": function(event){
    event.preventDefault();
    var confirm_name = "Have you read and agreed with this writeup?";
    if (confirm(confirm_name)) {
      Meteor.call('signWriteUps', this._id);
      $(event.target).parent().parent().addClass('cleaned');
      Session.set("s_message","You have successfully signed this writeup!");
      Session.set('d_message', false);
    }
    return false;
  }
});
