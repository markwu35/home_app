import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { bucket_list } from '../imports/bucket_list.js'
import { addBucketList, deleteBucketList } from '../imports/methods.js'

import './main.html';

//
Meteor.subscribe('bucket_list');

Template.bucket_list.helpers({
	bucket_list: function(){
		return Bucket_list.find({}, {sort: {createdAt: -1}});
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
  }
});
