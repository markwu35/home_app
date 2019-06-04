import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Meteor.subscribe("userList");

Template.register.helpers({
  errorMessage: function() {
    return Session.get('errorMessage');
  }
});
Template.register.events({
  'submit .register': function(event){
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;
    var firstName = event.target.firstName.value;
    var lastName = event.target.lastName.value;
    var color = event.target.color.value;
    if (firstName == '' || lastName == ''){
      Session.set('errorMessage', "Names can't be blanked");
      throw new Meteor.Error("Names can't be blanked");
    }
    Accounts.createUser({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      color: color
    }, function(err) {
      if (err) {
        Session.set('errorMessage', err.message);
      } else {
        Session.set('errorMessage', false);
        Session.set('s_message', "Welcome, " + email + " !");
      }
    });
  },

  'click .s-login'(event) {
    Session.set('errorMessage', false);
    $('#r-p').hide();
    $('#l-p').show();
  },
  'click .close'(e) {
    Session.set('errorMessage', false);
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
      } else {
        Session.set('errorMessage', false);
        Session.set('s_message', "Welcome back, " + email + " !");
      }
    });
  },
  'click .s-register'(event) {
    Session.set('errorMessage', false);
    $('#l-p').hide();
    $('#r-p').show();
  },
  'click .close'(e) {
    Session.set('errorMessage', false);
  }
});
Template.login.helpers({
  errorMessage: function() {
    return Session.get('errorMessage');
  }
});


Template.home.helpers({
	isAdmin: function(){
		if (Meteor.user() === null) {
			return false;
		}
		if (Meteor.user().emails[0].address == "test3@gmail.com"){
			return true;
		}
		return false;
	},
	current_user(){
		return Meteor.user().profile.firstName;
	}
});
Template.home.events({
  "submit .j-ans": function(event){
    //STUB
    Session.set("s_message","You have successfully submmited an answer!");
    Session.set('d_message', false);
    return false;
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
Template.userList.helpers({
  userList: function(){
    return userList.find({}, {sort: {createdAt: -1}});
  }
});
