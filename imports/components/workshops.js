import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';


import { workshops } from './../dataCollection/workshops.js';
Meteor.subscribe("workshops");

Template.workshops.helpers({
  workshops: function(){
    return Workshops.find({}, {sort: {date: -1}});
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
	name_w_s: function (){
		return this.name.replace(/_/g, " ");
	},
	p1: function (){
		if (this.p1 != ''){
			return Meteor.users.findOne({_id: this.p1}).profile.firstName + " " + Meteor.users.findOne({_id: this.p1}).profile.lastName.charAt(0) + '.';	
		} else {
			return 'OPEN';
		}
	},
	p2: function (){
		if (this.p2 != ''){
			return Meteor.users.findOne({_id: this.p2}).profile.firstName + " " + Meteor.users.findOne({_id: this.p2}).profile.lastName.charAt(0) + '.';
		} else {
			return 'OPEN';
		}
	}
});

Template.workshops.events({
  "click #add-workshop-btn": function(event){
    console.log("here");
    var date = $("#add-workshop-date").val();
    var name = $("#add-workshop-name").val().replace(/\s/g, '_');
    //var p1 = event.target.p1.value;
    //var p2 = event.target.p2.value;

    var entry = [date,name];
    Meteor.call('addWorkshops', entry, function (err,result){
    	if (!err){
				Session.set("s_message","You have successfully added " + $("#add-workshop-name").val() + " !");
        Session.set('d_message', false);
		    $("#add-workshop-date").val('');
		    $("#add-workshop-name").val('');
		    //event.target.p1.value = '';
		    //event.target.p2.value = '';    		
    	}else {
    		Session.set("d_message","You can't have blank fields!");
    		Session.set("s_message", false);
    	}
    });
    return false;
  },
 	"click .delete-workshops": function(event){
		var confirm_name = "Delete this workshop?";
		if (confirm(confirm_name)) {
			Meteor.call('deleteWorkshops', this._id);
    	Session.set("s_message","You have successfully deleted this workshop!");
    	Session.set('d_message', false);
		}
		return false;
	},
	"click .ws-open": function(event){
		var name = event.target.id.slice(0, -1);
		var pos = event.target.id.charAt(event.target.id.length-1);
		if (pos == 1){
			if (Workshops.findOne({name: name}).p1 == ''){
				var str = event.target.id.slice(0, -1);
				str = str.replace(/_/g, " ");
				var confirm_name = "Are you teaching the " + str + " workshop?";
				if (confirm(confirm_name)) {
					Meteor.call('claimWorkshops', event.target.id);
					Session.set("s_message","You have successfully signed up for " + str + " !");
					Session.set('d_message', false);
				}
				return false;
			} else {
				var confirm_name = "Delete this entry?";
				if (confirm(confirm_name)) {
					Meteor.call('resetWorkshops', event.target.id, function(err,result){
						if (!err) {
							Session.set("s_message","You have successfully deleted this workshop signup!");
							Session.set('d_message', false);
						}else {
							Session.set('d_message', err.message);
							Session.set('s_message', false);
						}
					});
				}
				return false;
			}
		} else {
			if (Workshops.findOne({name: name}).p2 == ''){
				var str = event.target.id.slice(0, -1);
				str = str.replace(/_/g, " ");
				var confirm_name = "Are you teaching the " + str + " workshop?";
				if (confirm(confirm_name)) {
					Meteor.call('claimWorkshops', event.target.id);
					Session.set("s_message","You have successfully signed up for " + str + " !");
					Session.set('d_message', false);
				}
				return false;
			} else {
				var confirm_name = "Delete this entry?";
				if (confirm(confirm_name)) {
					Meteor.call('resetWorkshops', event.target.id, function(err,result){
						if (!err) {
							Session.set("s_message","You have successfully deleted this workshop signup!");
							Session.set('d_message', false);
						}else {
							Session.set('d_message', err.message);
							Session.set('s_message', false);
						}
					});
				}
				return false;
			}			
		}
	},

	"click .reset-workshops": function(event){
			var d = new Date();
			var confirm_name = "Are you sure ?";
			if (confirm(confirm_name)) {
				Meteor.call('resetWorkshops', 'ALL');
				Session.set("s_message","You have successfully reset all workshop signups!");
				Session.set('d_message', false);
			}
			return false;
	}
});
