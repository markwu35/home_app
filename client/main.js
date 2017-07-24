import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { bucket_list } from '../imports/bucket_list.js'
import { shopping_list } from '../imports/shopping_list.js'
import { reminders } from '../imports/reminders.js'

import { addBucketList, deleteBucketList, addShoppingList, deleteShoppingList, addReminders, deleteReminders } from '../imports/methods.js'

import './main.html';

Meteor.subscribe('bucket_list');
Meteor.subscribe('shopping_list');
Meteor.subscribe('reminders');

var ni = false;

Template.home.helpers({
	time: function(){
		var now = new Date();
		var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
		var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
		var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
		function fourdigits(number) {
		    return (number < 1000) ? number + 1900 : number;
		}
		today =  days[now.getDay()] + ", " +
         months[now.getMonth()] + " " +
         date + ", " +
         (fourdigits(now.getYear())) ;
    return today;
	}
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
		console.log('HERERE');
		var name = event.target.name.value;
		Meteor.call('addBucketList', name);
		event.target.name.value = '';
		//return false;
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
		//return false;
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

  // Night Mode
  'click #night'(e) {
    if($('#night').is(":checked")) {
    		$(".navbar").removeClass('navbar-default');
        $(".navbar").addClass('navbar-inverse bg-inverse');
        $('body').css('background-color', 'black');
        $('body').css('color', 'white');
        ni = true;
    }else{
        $(".navbar").removeClass('navbar-inverse bg-inverse');
        $(".navbar").addClass('navbar-default');
        $('body').css('background-color', 'white');
        $('body').css('color', 'black');
        ni = false;
    }
  }
});
