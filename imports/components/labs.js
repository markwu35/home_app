import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { rooms } from './../dataCollection/rooms.js';
Meteor.subscribe('rooms');

Template.labs.helpers({
	rooms: function(){
		return Rooms.find({}, {sort: {createdAt: -1}});
	},
	isAdmin: function(){
		if (Meteor.user() === null) {
			return false;
		}
		if (Meteor.user().emails[0].address == "test3@gmail.com"){
			//console.log(Meteor.user().emails[0].address);
			return true;
		}
		return false;
	}
});
Template.labs.events({
  "submit .add-rooms": function(event){
    var name = event.target.name.value;
    var location = event.target.location.value;
    var entry = [name,location];
    Meteor.call('addRooms', entry, function(err,result){
      if (!err){
        event.target.name.value = '';
        Session.set("s_message","You have successfully added lab " + name + " !");
        Session.set('d_message', false);        
      } else {
        Session.set("d_message","You can't have blank fields!");
        Session.set("s_message", false);
      }
    });
    return false;
  },
  "click .delete-rooms": function(event){
    var confirm_name = "Delete room " + this.name + "?";
    if (confirm(confirm_name)) {
      Meteor.call('deleteRooms', this._id);
      Session.set("s_message","You have successfully deleted lab " + this.name + " !");
      Session.set('d_message', false);
    }
    return false;
  },

  "click #MUSIC-detail": function(event){
    var n = event.target.id.replace('-detail','');
    $(".lab-name").html(n);
    $(".help-desk").html('Yes');
    $(".print-spot").html('2');
    $(".computers").html('15');
    $(".lab-pic").attr("src","./music_ext.jpg");
  },
  "click #BSIF-detail": function(event){
    var n = event.target.id.replace('-detail','');
    $(".lab-name").html(n);
    $(".help-desk").html('No');
    $(".print-spot").html('0');
    $(".computers").html('0');
    $(".lab-pic").attr("src","./bsif.jpg");
  }
});
