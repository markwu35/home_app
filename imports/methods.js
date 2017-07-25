var blankName;
var blankLab;

(function(){
    blankName=function(name){
    	if(name==''){
    		alert('Item cannot be blank!');
        throw new Meteor.Error('Item cannot be blank!');
    	}
    };
}());

(function(){
    blankLab=function(lab){
    	for (i=0;i< lab.length;i++){
    		if (lab[i]==''){
    			alert('Item cannot be blank!');
        	throw new Meteor.Error('Item cannot be blank!');
    		}
    	}
    };
}());

Meteor.methods({
	addReminders: function(name){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		blankName(name);
		Reminders.insert({
			name: name,
			createdAt: new Date(),
			userId: Meteor.userId()
		});
	},
	deleteReminders: function(taskId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		Reminders.remove(taskId);
	},

	addRooms: function(roomId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		blankName(roomId);
		Rooms.insert({
			name: roomId,
			createdAt: new Date(),
			userId: Meteor.userId(),
			cleaned: false,
			cleanedAt: '',
			cleanedBy: ''
		});
		console.log("inserted room");
	},
	cleanRoom: function(roomId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		var d = new Date();
		var h = d.getHours();
		if (h<10){
			var hr = '0' + h;
		} else {
			var hr = h;
		}
		if (h <12){
			var APM = "AM";
		} else {
			var APM = "PM";
		}
		var m = d.getMinutes();
		if (m < 10){
			var mi = '0' + m;
		} else {
			var mi = m;
		}
		var time = hr + ":" + mi + " " + APM;
		Rooms.update({name: roomId}, { $set: { cleaned: true, cleanedAt: time, cleanedBy: Meteor.userId()}}, false, true);
	},
	deleteRooms: function(roomId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		Rooms.remove(roomId);
	},

	resetCleaning: function(){
		var rooms = Rooms.find({cleaned: true}).fetch();
 		for (i in rooms) {
 			var t = rooms[i].name;
			Rooms.update({name: t}, { $set: { cleaned: false, cleanedAt: '', cleanedBy: ''}}, false, true);
		}
	},

	addLabNoShows: function(lab){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		blankLab(lab);
		var d = new Date();
		var h = d.getHours();
		if (h<10){
			var hr = '0' + h;
		} else {
			var hr = h;
		}
		if (h <12){
			var APM = "AM";
		} else {
			var APM = "PM";
		}
		var m = d.getMinutes();
		if (m < 10){
			var mi = '0' + m;
		} else {
			var mi = m;
		}
		var time = hr + ":" + mi + " " + APM;
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		LabNoShows.insert({
			week: 'STUB',
			date: d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear(),
			day: days[d.getDay()],
			SEtime: lab[0],
			location: lab[1],
			className: lab[2],
			professorName: lab[3],
			recordedBy: Meteor.user().emails[0].address,
			time: time
		});
		console.log("inserted room");
	}
})
