import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'
import '../imports/accounts-config.js'

import { rooms } from '../imports/rooms.js'
import { labNoShows } from '../imports/labNoShows.js'

import { addRooms, deleteRooms, cleanRoom, resetCleaning } from '../imports/methods.js'

import './main.html';

Meteor.subscribe('rooms');
Meteor.subscribe('labNoShows');
Meteor.subscribe("userList");



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

Template.body.onCreated(function(){
	//$("#msg").addClass("alert-warning");
});

Template.cleaning.onRendered(function(){
	if ($(".clean-room").html() != "---"){
		$(".clean-room").addClass("cleaned");
	}
});

Template.login.helpers({
  errorMessage: function() {
    return Session.get('errorMessage');
  }
});

Template.body.helpers({
	message: function(){
		if (Rooms.find({cleanedBy: Meteor.userId()}).count() == 0) {
			$("#msg").removeClass('alert-success');
    	$("#msg").addClass('alert-warning');
			return "Stop being lazy and go clean some rooms!";
		} else {
			$("#msg").removeClass('alert-warning');
    	$("#msg").addClass('alert-success');
			return "Keep up your good work!";
		}
	},

  showRegister() {
    return Session.get('showRegister');
  }
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

Template.home.helpers({
	current_user(){
		return Meteor.user().emails[0].address;
	}
});

Template.userList.helpers({
  allUsers(){
    return Meteor.users.find({});
  },
  email(){
    return this.emails[0].address;
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
	},

	p1530: function(){
		if (Rooms.findOne({name:'1530'}).cleaned == true){
			var user_id = Rooms.findOne({name:'1530'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			$("#1530").addClass('cleaned');
			return user_email + " at " + Rooms.findOne({name:'1530'}).cleanedAt;
		} else {
			$("#1530").removeClass('cleaned');
			return '---';
		}
	},

	p1529: function(){
		if (Rooms.findOne({name:'1529'}).cleaned == true){
			$("#1529").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1529'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1529'}).cleanedAt;
		} else {
			$("#1529").removeClass('cleaned');
			return '---';
		}
	},

	p1525: function(){
		if (Rooms.findOne({name:'1525'}).cleaned == true){
			$("#1525").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1525'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1525'}).cleanedAt;
		} else {
			$("#1525").removeClass('cleaned');
			return '---';
		}
	},

	p1521: function(){
		if (Rooms.findOne({name:'1521'}).cleaned == true){
			$("#1521").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1521'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1521'}).cleanedAt;
		} else {
			$("#1521").removeClass('cleaned');
			return '---';
		}
	},

	p1517: function(){
		if (Rooms.findOne({name:'1517'}).cleaned == true){
			$("#1517").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1517'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1517'}).cleanedAt;
		} else {
			$("#1517").removeClass('cleaned');
			return '---';
		}
	},

	p1513: function(){
		if (Rooms.findOne({name:'1513'}).cleaned == true){
			$("#1513").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1513'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1513'}).cleanedAt;
		} else {
			$("#1513").removeClass('cleaned');
			return '---';
		}
	},

	p1514: function(){
		if (Rooms.findOne({name:'1514'}).cleaned == true){
			$("#1514").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1514'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1514'}).cleanedAt;
		} else {
			$("#1514").removeClass('cleaned');
			return '---';
		}
	},

	p1518: function(){
		if (Rooms.findOne({name:'1518'}).cleaned == true){
			$("#1518").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1518'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1518'}).cleanedAt;
		} else {
			$("#1518").removeClass('cleaned');
			return '---';
		}
	},

	p1526: function(){
		if (Rooms.findOne({name:'1526'}).cleaned == true){
			$("#1526").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1526'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1526'}).cleanedAt;
		} else {
			$("#1526").removeClass('cleaned');
			return '---';
		}
	},

	HSSB: function(){
		if (Rooms.findOne({name:'HSSB'}).cleaned == true){
			$("#HSSB").addClass('cleaned');
			var user_id = Rooms.findOne({name:'HSSB'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'HSSB'}).cleanedAt;
		} else {
			$("#HSSB").removeClass('cleaned');
			return '---';
		}
	},

	s1005: function(){
		if (Rooms.findOne({name:'1005'}).cleaned == true){
			$("#1005").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1005'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1005'}).cleanedAt;
		} else {
			$("#1005").removeClass('cleaned');
			return '---';
		}
	},

	s1007: function(){
		if (Rooms.findOne({name:'1007'}).cleaned == true){
			$("#1007").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1007'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1007'}).cleanedAt;
		} else {
			$("#1007").removeClass('cleaned');
			return '---';
		}
	},

	s1301: function(){
		if (Rooms.findOne({name:'1301'}).cleaned == true){
			$("#1301").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1301'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1301'}).cleanedAt;
		} else {
			$("#1301").removeClass('cleaned');
			return '---';
		}
	},

	s1302: function(){
		if (Rooms.findOne({name:'1302'}).cleaned == true){
			$("#1302").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1302'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1302'}).cleanedAt;
		} else {
			$("#1302").removeClass('cleaned');
			return '---';
		}
	},

	s1303: function(){
		if (Rooms.findOne({name:'1303'}).cleaned == true){
			$("#1303").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1303'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1303'}).cleanedAt;
		} else {
			$("#1303").removeClass('cleaned');
			return '---';
		}
	},

	s1304: function(){
		if (Rooms.findOne({name:'1304'}).cleaned == true){
			$("#1304").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1304'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1304'}).cleanedAt;
		} else {
			$("#1304").removeClass('cleaned');
			return '---';
		}
	},

	l1804: function(){
		if (Rooms.findOne({name:'1804'}).cleaned == true){
			$("#1804").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1804'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1804'}).cleanedAt;
		} else {
			$("#1804").removeClass('cleaned');
			return '---';
		}
	},

	l1805: function(){
		if (Rooms.findOne({name:'1805'}).cleaned == true){
			$("#1805").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1805'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1805'}).cleanedAt;
		} else {
			$("#1805").removeClass('cleaned');
			return '---';
		}
	},

	l1806: function(){
		if (Rooms.findOne({name:'1806'}).cleaned == true){
			$("#1806").addClass('cleaned');
			var user_id = Rooms.findOne({name:'1806'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'1806'}).cleanedAt;
		} else {
			$("#1806").removeClass('cleaned');
			return '---';
		}
	},

	BSIF: function(){
		if (Rooms.findOne({name:'BSIF'}).cleaned == true){
			$("#BSIF").addClass('cleaned');
			var user_id = Rooms.findOne({name:'BSIF'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'BSIF'}).cleanedAt;
		} else {
			$("#BSIF").removeClass('cleaned');
			return '---';
		}
	},

	MUSIC: function(){
		if (Rooms.findOne({name:'MUSIC'}).cleaned == true){
			$("#MUSIC").addClass('cleaned');
			var user_id = Rooms.findOne({name:'MUSIC'}).cleanedBy;
			var user_email = Meteor.users.findOne({_id:user_id}).emails[0].address;
			return user_email + " at " + Rooms.findOne({name:'MUSIC'}).cleanedAt;
		} else {
			$("#MUSIC").removeClass('cleaned');
			return '---';
		}
	}
});

Template.labs.helpers({
	rooms: function(){
		return Rooms.find({}, {sort: {createdAt: -1}});
	},
	isAdmin: function(){
		if (Meteor.user() === null) {
			return false;
		}
		if (Meteor.user().emails[0].address == "markwu35@yahoo.com"){
			//console.log(Meteor.user().emails[0].address);
			return true;
		}
		return false;
	}
});

Template.labNoShows.helpers({
  labNoShows: function(){
    return LabNoShows.find({}, {sort: {createdAt: -1}});
  }
});

Template.clock.onDestroyed(function(){
  var instance = this;
  if(instance.interval) Meteor.clearInterval(instance.interval);
});

Template.userList.helpers({
	userList: function(){
		return userList.find({}, {sort: {createdAt: -1}});
	}
});

// Template.bucket_list.events({
// 	"submit .add-bucket-list": function(event){
// 		var name = event.target.name.value;
// 		Meteor.call('addBucketList', name);
// 		event.target.name.value = '';
// 		return false;
// 	},

// 	"click .delete-bucket-list": function(event){
// 		var confirm_name = "Delete " + this.name + "?";
// 		if (confirm(confirm_name)) {
// 			Meteor.call('deleteBucketList', this._id);
// 		}
// 		return false;
// 	}
// });

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

Template.labNoShows.events({
  "submit .add-labNoShows": function(event){
    var SEtime = event.target.startEndTime.value;
    var location = event.target.location.value;
    var className = event.target.className.value;
    var professorName = event.target.professorName.value;

    var lab = [SEtime,location,className,professorName];
    console.log(lab);
    Meteor.call('addLabNoShows', lab);
    event.target.startEndTime.value = '';
    event.target.location.value = '';
    event.target.className.value = '';
    event.target.professorName.value = '';
    return false;
  },
});

Template.cleaning.events({
	"click .clean-room": function(event){
		if ($("#" + event.target.id ).html() == "---"){
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
			var confirm_name = "You have cleaned " + event.target.id + " at " + time + "?";
			if (confirm(confirm_name)) {
				Meteor.call('cleanRoom', event.target.id);
				$(".alert").show();
				//Meteor.call('changeTableCSS', event.target.id);
			}
			return false;
		} else {
			alert("This lab is already cleaned today!");
		}
	},

	"click .reset-cleaning": function(event){
			var d = new Date();
			var confirm_name = "Are you sure ?";
			if (confirm(confirm_name)) {
				Meteor.call('resetCleaning');
				//Meteor.call('changeTableCSS', event.target.id);
			}
			return false;
	}
});

Template.body.events({

	'click .close'(e) {
    $("#msg").hide();
  },

	'click #HOME'(e) {
    $('.tab.active').removeClass('active');
    $("#HOME").addClass('active');
    var ax = $(e.target).html();
    $('.gin').hide();
    $('#gin-' + "HOME").show();
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

  'click #WS'(e) {
    $('.tab.active').removeClass('active');
    $("#WS").addClass('active');
    var ax = $(e.target).html();
    $('.gin').hide();
    $('#gin-' + "WS").show();
  },

  'click #LNS'(e) {
    $('.tab.active').removeClass('active');
    $("#LNS").addClass('active');
    var ax = $(e.target).html();
    $('.gin').hide();
    $('#gin-' + "LNS").show();
  },

  // Night Mode
  'click #night'(e) {
    if($('#night').is(":checked")) {
    		$(".navbar").removeClass('navbar-default');
        $(".navbar").addClass('navbar-inverse bg-inverse');
        $('body').css('background-color', 'black');
        $('body').css('color', 'white');
        $('#clean-table table').css('border', '1px solid white');
        $('#clean-table td').css('border', '1px solid white');
        $('#clean-table th').css('border', '1px solid white');
        ni = true;
    }else{
        $(".navbar").removeClass('navbar-inverse bg-inverse');
        $(".navbar").addClass('navbar-default');
        $('body').css('background-color', 'white');
        $('body').css('color', 'black');
				$('#clean-table table').css('border', '1px solid black');
        $('#clean-table td').css('border', '1px solid black');
        $('#clean-table th').css('border', '1px solid black');
        ni = false;
    }
  }
});

Template.register.events({
  'submit .register': function(event){
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;
    Accounts.createUser({
      email: email,
      password: password
    });
  },

  'click .s-login'(event) {
    $('#r-p').hide();
    $('#l-p').show();
  }
});

Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;
    Meteor.loginWithPassword(email, password, function(err) {
  		if (err) {
    		Session.set('errorMessage', err.message);
  		}
		});
  },
  'click .s-register'(event) {
    $('#l-p').hide();
    $('#r-p').show();
  }
});
