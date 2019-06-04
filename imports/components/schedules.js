import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { schedules } from './../dataCollection/schedules.js';

Template.scheduling.helpers({
  isAdmin: function(){
    if (Meteor.user() === null) {
      return false;
    }
    if (Meteor.user().emails[0].address == "test3@gmail.com"){
      return true;
    }
    return false;
  },
  schResult: function(){
		Meteor.subscribe("schedules", Session.get("searchSchEntry"));
		if (Schedules.find().fetch()){
			return Schedules.find();
		}else{
			return null;
		}
  },
  note: function(){
  	if (this.note == 'perm'){
  		return "Permanent";
  	} else if(this.note == 'first'){
  		return "First Week";
  	} else {
  		return "Finals Week";
  	}
  },
  cm8t9a: function(){
  	var uid = Schedules.findOne({_id: this._id}).m8t9a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m8t9a: function(){
  	var uid = Schedules.findOne({_id: this._id}).m8t9a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct8t9a: function(){
  	var uid = Schedules.findOne({_id: this._id}).t8t9a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t8t9a: function(){
  	var uid = Schedules.findOne({_id: this._id}).t8t9a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw8t9a: function(){
  	var uid = Schedules.findOne({_id: this._id}).w8t9a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w8t9a: function(){
  	var uid = Schedules.findOne({_id: this._id}).w8t9a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth8t9a: function(){
  	var uid = Schedules.findOne({_id: this._id}).th8t9a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th8t9a: function(){
  	var uid = Schedules.findOne({_id: this._id}).th8t9a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cf8t9a: function(){
  	var uid = Schedules.findOne({_id: this._id}).f8t9a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  f8t9a: function(){
  	var uid = Schedules.findOne({_id: this._id}).f8t9a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm9t10a: function(){
  	var uid = Schedules.findOne({_id: this._id}).m9t10a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m9t10a: function(){
  	var uid = Schedules.findOne({_id: this._id}).m9t10a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct9t10a: function(){
  	var uid = Schedules.findOne({_id: this._id}).t9t10a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t9t10a: function(){
  	var uid = Schedules.findOne({_id: this._id}).t9t10a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw9t10a: function(){
  	var uid = Schedules.findOne({_id: this._id}).w9t10a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w9t10a: function(){
  	var uid = Schedules.findOne({_id: this._id}).w9t10a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth9t10a: function(){
  	var uid = Schedules.findOne({_id: this._id}).th9t10a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th9t10a: function(){
  	var uid = Schedules.findOne({_id: this._id}).th9t10a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cf9t10a: function(){
  	var uid = Schedules.findOne({_id: this._id}).f9t10a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  f9t10a: function(){
  	var uid = Schedules.findOne({_id: this._id}).f9t10a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm10t11a: function(){
  	var uid = Schedules.findOne({_id: this._id}).m10t11a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m10t11a: function(){
  	var uid = Schedules.findOne({_id: this._id}).m10t11a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct10t11a: function(){
  	var uid = Schedules.findOne({_id: this._id}).t10t11a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t10t11a: function(){
  	var uid = Schedules.findOne({_id: this._id}).t10t11a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw10t11a: function(){
  	var uid = Schedules.findOne({_id: this._id}).w10t11a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w10t11a: function(){
  	var uid = Schedules.findOne({_id: this._id}).w10t11a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth10t11a: function(){
  	var uid = Schedules.findOne({_id: this._id}).th10t11a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th10t11a: function(){
  	var uid = Schedules.findOne({_id: this._id}).th10t11a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cf10t11a: function(){
  	var uid = Schedules.findOne({_id: this._id}).f10t11a;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  f10t11a: function(){
  	var uid = Schedules.findOne({_id: this._id}).f10t11a;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm11t12p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m11t12p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m11t12p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m11t12p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct11t12p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t11t12p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t11t12p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t11t12p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw11t12p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w11t12p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w11t12p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w11t12p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth11t12p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th11t12p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th11t12p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th11t12p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cf11t12p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f11t12p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  f11t12p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f11t12p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm12t1p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m12t1p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m12t1p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m12t1p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct12t1p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t12t1p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t12t1p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t12t1p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw12t1p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w12t1p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w12t1p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w12t1p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth12t1p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th12t1p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th12t1p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th12t1p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cf12t1p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f12t1p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  f12t1p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f12t1p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm1t2p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m1t2p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m1t2p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m1t2p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct1t2p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t1t2p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t1t2p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t1t2p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw1t2p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w1t2p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w1t2p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w1t2p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth1t2p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th1t2p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th1t2p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th1t2p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cf1t2p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f1t2p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  f1t2p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f1t2p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm2t3p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m2t3p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m2t3p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m2t3p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct2t3p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t2t3p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t2t3p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t2t3p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw2t3p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w2t3p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w2t3p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w2t3p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth2t3p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th2t3p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th2t3p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th2t3p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cf2t3p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f2t3p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  f2t3p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f2t3p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm3t4p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m3t4p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m3t4p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m3t4p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct3t4p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t3t4p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t3t4p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t3t4p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw3t4p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w3t4p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w3t4p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w3t4p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth3t4p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th3t4p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th3t4p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th3t4p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cf3t4p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f3t4p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  f3t4p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f3t4p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm4t5p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m4t5p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m4t5p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m4t5p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct4t5p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t4t5p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t4t5p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t4t5p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw4t5p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w4t5p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w4t5p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w4t5p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth4t5p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th4t5p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th4t5p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th4t5p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cf4t5p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f4t5p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  f4t5p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f4t5p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm5t6p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m5t6p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m5t6p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m5t6p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct5t6p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t5t6p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t5t6p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t5t6p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw5t6p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w5t6p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w5t6p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w5t6p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth5t6p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th5t6p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th5t6p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th5t6p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cf5t6p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f5t6p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  f5t6p: function(){
  	var uid = Schedules.findOne({_id: this._id}).f5t6p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm6t7p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m6t7p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m6t7p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m6t7p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct6t7p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t6t7p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t6t7p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t6t7p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw6t7p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w6t7p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w6t7p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w6t7p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth6t7p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th6t7p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th6t7p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th6t7p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm7t8p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m7t8p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m7t8p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m7t8p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct7t8p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t7t8p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t7t8p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t7t8p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw7t8p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w7t8p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w7t8p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w7t8p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth7t8p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th7t8p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th7t8p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th7t8p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm8t9p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m8t9p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m8t9p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m8t9p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct8t9p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t8t9p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t8t9p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t8t9p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw8t9p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w8t9p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w8t9p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w8t9p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth8t9p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th8t9p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th8t9p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th8t9p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cm9t10p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m9t10p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  m9t10p: function(){
  	var uid = Schedules.findOne({_id: this._id}).m9t10p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  ct9t10p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t9t10p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  t9t10p: function(){
  	var uid = Schedules.findOne({_id: this._id}).t9t10p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cw9t10p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w9t10p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  w9t10p: function(){
  	var uid = Schedules.findOne({_id: this._id}).w9t10p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  },
  cth9t10p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th9t10p;
  	var color = Meteor.users.findOne({_id: uid}).profile.color;
  	return color;
  },
  th9t10p: function(){
  	var uid = Schedules.findOne({_id: this._id}).th9t10p;
  	return Meteor.users.findOne({_id: uid}).profile.firstName + " " + Meteor.users.findOne({_id: uid}).profile.lastName.charAt(0) + ".";
  }
});

Template.scheduling.events({
  'click #add-schedule-btn': function(event){
    var location = $("#add-schedule-location").val();
    var quarter = $("#add-schedule-quarter").val();
    var year = $("#add-schedule-year").val();
    var note = $("#add-schedule-note").val();

    var entry = [location,quarter,year,note];
    if (Schedules.findOne({location: entry[0], quarter: entry[1], year: entry[2], note: entry[3]})){
      Session.set("d_message","This schedule already exists!");
      Session.set("s_message", false);
    }else {
      Meteor.call('addSchedules', entry, function(err,result){
        if (!err){
          $("#add-schedule-location").val('');
          $("#add-schedule-quarter").val('');
          $("#add-schedule-year").val('');
          $("#add-schedule-note").val('');
          Session.set("s_message","You have successfully added this schedule!");
          $("#msgs").fadeTo(2000, 500).slideUp(500, function(){
            $("#msgs").slideUp(500);
          }); 
          Session.set('d_message', false);
        }else {
          Session.set("d_message","You can't have blank fields!");
          Session.set("s_message", false);
        }
      });
    }
    return false;
  },
  "click .delete-schedules": function(event){
    var confirm_name = "Delete all schedules?";
    if (confirm(confirm_name)) {
      Meteor.call('deleteSchedules', 'ALL');
      Session.set("s_message","You have successfully deleted all schedules!");
      Session.set('d_message', false);
    }
    return false;
  },
  "click .sch-blk": function(event){
  	var sch_id = this._id;
  	var shift = event.target.id;
  	var entry = [sch_id,shift];
  	var cur_shift = Schedules.findOne({_id: sch_id})[shift];
  	if (cur_shift){
  		if (cur_shift != Meteor.userId()){
  			Session.set("d_message","This shift is already taken!");
	    	Session.set('s_message', false);
  		} else {
  			Meteor.call('deleteShifts', entry);
		  	Session.set("s_message","You have successfully removed this shift!");
		  	Session.set('d_message', false);
  		}
  	}else {
	  	Meteor.call('claimSchedules', entry);
	  	Session.set("s_message","You have successfully claimed this shift!");
	    Session.set('d_message', false);
  	}
  	return false;
  },
  "click .search-schedules": function(event){
  	var location = $("#sel-lab-sch").val();
  	var quarter = $("#sel-qua-sch").val();
  	var year = $("#sel-yea-sch").val();
  	var note = $("#sel-not-sch").val();
  	if (quarter =='' || year == '' || note == ''){
  		Session.set("d_message","Please enter all required search queries!");
	    Session.set('s_message', false);
  	} else {
			Session.set("d_message",false);
	    Session.set('s_message', false);
  		var searchEntry = [location,quarter,year,note];
  		Session.set("searchSchEntry", searchEntry);
  	}
    return false;
  }
});
