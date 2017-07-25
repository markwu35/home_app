import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { bucket_list } from '../imports/bucket_list.js'
import { shopping_list } from '../imports/shopping_list.js'
import { reminders } from '../imports/reminders.js'

import { rooms } from '../imports/rooms.js'

import { addBucketList, deleteBucketList, addShoppingList, deleteShoppingList, addReminders, deleteReminders, addRooms, deleteRooms, cleanRoom } from '../imports/methods.js'

import './main.html';

Meteor.subscribe('bucket_list');
Meteor.subscribe('shopping_list');
Meteor.subscribe('reminders');
Meteor.subscribe('rooms');

var ni = false;

Template.clock.onCreated(function(){
  var instance = this;
  instance.now = new ReactiveVar();
  instance.hrs = new ReactiveVar();
  instance.min = new ReactiveVar();
  instance.sec = new ReactiveVar();
  instance.interval = Meteor.setInterval(function(){
    var now = new Date();
    instance.now.set( now.toDateString() );
    instance.hrs.set( now.getHours() );
    instance.min.set( now.getMinutes() );
    instance.sec.set( now.getSeconds() );
  }, 1000);
});

Template.clock.helpers({
  date(){
    return Template.instance().now.get();
  },

  dc(){
    var min = Template.instance().min.get();
    if (min < 10) {
      var cur_min = '0' + min;
    } else {
      var cur_min = min;
    }
    return Template.instance().hrs.get() + ":" + cur_min;
  },

  dc_hour(){
  	if (Template.instance().hrs.get() > 12) {
  		return 'PM';
  	} else {
  		return 'AM';
  	}
  },

  dc_second(){
  	var cur_sec = Template.instance().sec.get();
  	if (cur_sec < 10) {
  		return '0' + cur_sec;
  	} else {
  		return cur_sec;
  	}
  }
});

Template.cleaning.helpers({
	cleaning_duty(){
		var d = new Date();
		var today = d.getDay();
		if (today == 1){
			return "surfaces";
		} else if (today == 2){
			return "monitors & dry-erase area";
		} else if (today == 3){
			return "keyboards & mice";
		} else if (today == 4){
			return "monitors & dry-erase area";
		} else if (today == 5){
			return "check email for cleaning duty";
		} else {
			return "what are you doing here? It's weekend!";
		}
	},

	rooms_cleaned: function(){
		return Rooms.find({cleanedBy: Meteor.userId()}).count();
	}

});

Template.labs.helpers({
	rooms: function(){
		return Rooms.find({}, {sort: {createdAt: -1}});
	}
});

Template.clock.onDestroyed(function(){
  var instance = this;
  if(instance.interval) Meteor.clearInterval(instance.interval);
});

Template.bucket_list.helpers({
	bucket_list: function(){
		return Bucket_list.find({}, {sort: {createdAt: -1}});
	}
});

Template.shopping_list.helpers({
	shopping_list: function(){
		return Shopping_list.find({}, {sort: {createdAt: -1}});
	}
});

Template.reminders.helpers({
	reminders_list: function(){
		return Reminders.find({}, {sort: {createdAt: -1}});
	}
});

Template.bucket_list.events({
	"submit .add-bucket-list": function(event){
		var name = event.target.name.value;
		Meteor.call('addBucketList', name);
		event.target.name.value = '';
		return false;
	},

	"click .delete-bucket-list": function(event){
		var confirm_name = "Delete " + this.name + "?";
		if (confirm(confirm_name)) {
			Meteor.call('deleteBucketList', this._id);
		}
		return false;
	}
});

Template.shopping_list.events({
	"submit .add-shopping-list": function(event){
		var name = event.target.name.value;
		
		Meteor.call('addShoppingList', name);
		event.target.name.value = '';
		return false;
	},

	"click .delete-shopping-list": function(event){
		var confirm_name = "Delete " + this.name + "?";
		if (confirm(confirm_name)) {
			Meteor.call('deleteShoppingList', this._id);
		}
		return false;
	}
});

Template.reminders.events({
	"submit .add-reminders": function(event){
		var name = event.target.name.value;
		Meteor.call('addReminders', name);
		event.target.name.value = '';
		return false;
	},

	"click .delete-reminders": function(event){
		var confirm_name = "Delete " + this.name + "?";
		if (confirm(confirm_name)) {
			Meteor.call('deleteReminders', this._id);
		}
		return false;
	}
});

Template.labs.events({
	"submit .add-rooms": function(event){
		var name = event.target.name.value;
		Meteor.call('addRooms', name);
		event.target.name.value = '';
		return false;
	},
	"click .delete-rooms": function(event){
		var confirm_name = "Delete room " + this.name + "?";
		if (confirm(confirm_name)) {
			Meteor.call('deleteRooms', this._id);
		}
		return false;
	}
});

Template.cleaning.events({
	"click .clean-room": function(event){
		var d = new Date();
		var confirm_name = "You have cleaned " + event.target.id + " at " + d + "?";
		if (confirm(confirm_name)) {
			Meteor.call('cleanRoom', event.target.id);
		}
		return false;
	}
});

Template.body.events({
	'click #HOME'(e) {
    $('.tab.active').removeClass('active');
    $("#HOME").addClass('active');
    var ax = $(e.target).html();
    $('.gin').hide();
    $('#gin-' + "HOME").show();
  },

  'click #BL'(e) {
    $('.tab.active').removeClass('active');
    $("#BL").addClass('active');
    var ax = $(e.target).html();
    $('.gin').hide();
    $('#gin-' + "BL").show();
  },

  'click #SL'(e) {
    $('.tab.active').removeClass('active');
    $("#SL").addClass('active');
    var ax = $(e.target).html();
    $('.gin').hide();
    $('#gin-' + "SL").show();
  },

  'click #RE'(e) {
    $('.tab.active').removeClass('active');
    $("#RE").addClass('active');
    var ax = $(e.target).html();
    $('.gin').hide();
    $('#gin-' + "RE").show();
  },

  'click #CL'(e) {
    $('.tab.active').removeClass('active');
    $("#CL").addClass('active');
    var ax = $(e.target).html();
    $('.gin').hide();
    $('#gin-' + "CL").show();
  },

  'click #LA'(e) {
    $('.tab.active').removeClass('active');
    $("#LA").addClass('active');
    var ax = $(e.target).html();
    $('.gin').hide();
    $('#gin-' + "LA").show();
  },

  // Night Mode
  'click #night'(e) {
    if($('#night').is(":checked")) {
    		$(".navbar").removeClass('navbar-default');
        $(".navbar").addClass('navbar-inverse bg-inverse');
        $('body').css('background-color', 'black');
        $('body').css('color', 'white');
        $('.navbar-brand').css('filter', "invert(100%)");
        $('.navbar-brand').css('-webkit-filter', "invert(100%)");
        $('#clean-table table').css('border', '1px solid white');
        $('#clean-table td').css('border', '1px solid white');
        ni = true;
    }else{
        $(".navbar").removeClass('navbar-inverse bg-inverse');
        $(".navbar").addClass('navbar-default');
        $('body').css('background-color', 'white');
        $('body').css('color', 'black');
        $('.navbar-brand').css('filter', "invert(0%)");
        $('.navbar-brand').css('-webkit-filter', "invert(0%)");
				$('#clean-table table').css('border', '1px solid black');
        $('#clean-table td').css('border', '1px solid black');
        ni = false;
    }
  }
});
