import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { rooms } from './../dataCollection/rooms.js';
Meteor.subscribe('rooms');

Template.cleaning.onCreated(function(){
	if ($(".clean-room").html() != "---"){
		$(".clean-room").addClass("cleaned");
	}
});


Template.cleaning.helpers({
	isAdmin: function(){
		if (Meteor.user() === null) {
			return false;
		}
		if (Meteor.user().emails[0].address == "test3@gmail.com"){
			return true;
		}
		return false;
	},
	cleaning_duty(){
		var d = new Date();
		var today = d.getDay();
		if (today == 1){
			return "Surfaces";
		} else if (today == 2){
			return "Monitors & dry-erase area";
		} else if (today == 3){
			return "Keyboards & mice";
		} else if (today == 4){
			return "Surfaces";
		} else if (today == 5){
			return "Check email for cleaning duty";
		} else {
			return "what are you doing here? It's weekend!";
		}
	},

	rooms_cleaned: function(){
		return Rooms.find({cleanedBy: Meteor.userId()}).count();
	},

	phelps: function(){
		return Rooms.find({location: "Phelps"});
	},

	hssb: function(){
		return Rooms.find({location: "HSSB"});
	},

	ssms: function(){
		return Rooms.find({location: "SSMS"});
	},

	lifeSci: function(){
		return Rooms.find({location: "LifeSci"});
	},

	bsif: function(){
		return Rooms.find({location: "BSIF"});
	},
	music: function(){
		return Rooms.find({location: "Music"});
	},

	clean_info: function(){
		if(this.cleaned){
			return Meteor.users.findOne({_id: this.cleanedBy}).profile.firstName + " " + Meteor.users.findOne({_id: this.cleanedBy}).profile.lastName.charAt(0) + ". at " + this.cleanedAt;
		}else {
			return '---';
		}
	},

	cleaned_class: function(){
		if(this.cleaned){
			return "cleaned";
		}else {
			return '';
		}
	}
});

Template.cleaning.events({
	"click .clean-room": function(event){
		var room = event.target.id;
		if (Rooms.findOne({name: room}).cleaned == false){
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
			var confirm_name = "You have cleaned " + room + " at " + time + "?";
			if (confirm(confirm_name)) {
				Meteor.call('cleanRoom', room);
				var location = Rooms.findOne({name: room}).location;
				console.log(location);
				if (location != 'Music' || location != 'HSSB'){
					Session.set('s_message', "You have cleaned " + location + " " + room +" !");
				}else {
					Session.set('s_message', "You have cleaned " + room +" !");
				}
				Session.set('d_message', false);
			}
			return false;
		} else {
			var confirm_name = "Delete this cleaning entry?";
			if (confirm(confirm_name)) {
				Meteor.call('resetCleaning', event.target.id, function(err,result){
					if (!err){
						Session.set('s_message', "You have deleted this cleaning record!");
						Session.set('d_message', false);
					} else {
						Session.set('d_message', err.message);
						Session.set('s_message', false);
					}
				});
			}
			return false;
		}
	},

	"click .reset-cleaning": function(event){
			var d = new Date();
			var confirm_name = "Are you sure ?";
			if (confirm(confirm_name)) {
				Meteor.call('resetCleaning', 'ALL');
				Session.set('s_message', "You have reset all cleaning record!");
				Session.set('d_message', false);
			}
			return false;
	}
});
