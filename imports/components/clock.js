import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';

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
    var hr = Template.instance().hrs.get();
    if (min < 10) {
      var cur_min = '0' + min;
    } else {
      var cur_min = min;
    }
    if (hr < 10) {
      var cur_hr = '0' + hr;
    } else {
      var cur_hr = hr;
    }
    return cur_hr + ":" + cur_min;
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

Template.clock.onDestroyed(function(){
  var instance = this;
  if(instance.interval) Meteor.clearInterval(instance.interval);
});
