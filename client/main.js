import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import '../imports/accounts-config.js';
//import { addRooms, deleteRooms, cleanRoom, resetCleaning, addLabNoShows, deleteLabNoShows, addWireFrame, deleteWireFrame, addWorkshops, deleteWorkshops, claimWorkshops, resetWorkshops, addSchedules, removeSchedules, claimSchedules, deleteShifts, addWriteUps, deleteWriteUps, signWriteUps } from '../imports/methods.js';

import '../imports/components/clock.js';
import '../imports/components/writeUps.js';
import '../imports/components/wireFrame.js';
import '../imports/components/workshops.js';
import '../imports/components/cleaning.js';
import '../imports/components/labNoShows.js';
import '../imports/components/schedules.js';
import '../imports/components/home.js';
import '../imports/components/labs.js';

import './main.html';

var ni = false;
Template.body.onRendered(function(){
	Session.set("s_message", false);
	Session.set('d_message', false);
});

Template.body.events({
  'click .nav a'(e) {
    //console.log(e.currentTarget);
    console.log(e.target.className);
    if (e.target.className != 'login-link-text') {
      if($('.navbar-toggle').css('display') !='none'){
        $(".navbar-toggle").trigger( "click" );
      }
    }
  },

  'click .tab'(e) {
    $('.tab.active').removeClass('active');
    console.log(e.target);
    $(e.currentTarget).addClass('active');
    var ax = $(e.target).html().replace(/\s+/g, '');
    $('.gin').hide();
    $('#gin-' + ax).show();
    Session.set('s_message', false);
    Session.set('d_message', false);
  },

  // Night Mode
  'click #night'(e) {
    if($('#night').is(":checked")) {
        $(".navbar").removeClass('navbar-default');
        $(".navbar").addClass('navbar-inverse bg-inverse');
        //$('body').css('background', 'linear-gradient(#222222,#333)');
        $('body').css('background', '#333');  
        $('body').css('transition', 'background-color 0.25s');
        $('body').css('color', 'white');
        $('.clean-table table').css('border', '1px solid white');
        $('.clean-table td').css('border', '1px solid white');
        $('.clean-table th').css('border', '1px solid white');
        $('.workshops-table table').css('border', '1px solid white');
        $('.workshops-table td').css('border', '1px solid white');
        $('.workshops-table th').css('border', '1px solid white');
        ni = true;
    }else{
        $(".navbar").removeClass('navbar-inverse bg-inverse');
        $(".navbar").addClass('navbar-default');
        $('body').css('background', 'white');
        $('body').css('color', 'black');
        $('.clean-table table').css('border', '1px solid black');
        $('.clean-table td').css('border', '1px solid black');
        $('.clean-table th').css('border', '1px solid black');
        $('.workshops-table table').css('border', '1px solid black');
        $('.workshops-table td').css('border', '1px solid black');
        $('.workshops-table th').css('border', '1px solid black');
        ni = false;
    }
  },
  'click #close_s'(e) {
    Session.set('s_message', false);
  },
  'click #close_d'(e) {
    Session.set('d_message', false);
  }
});

Template.body.helpers({
  s_message: function(){
    return Session.get('s_message');
  },
  showRegister() {
    return Session.get('showRegister');
  },
  d_message: function(){
    return Session.get('d_message');
  }
});




























