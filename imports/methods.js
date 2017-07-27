var blankName;
var blankEntry;
var getTime;
var getDate;
var ifLoggedIn;

(function(){
    ifLoggedIn=function(){
			if(!Meteor.userId()){
				throw new Meteor.Error('No Access!');
			}
    };
}());

(function(){
    blankName=function(name){
    	if(name==''){
    		alert('Item cannot be blank!');
        throw new Meteor.Error('Item cannot be blank!');
    	}
    };
}());

(function(){
    blankEntry=function(entry){
    	for (i=0;i< entry.length;i++){
    		if (entry[i]==''){
    			alert('Item cannot be blank!');
        	throw new Meteor.Error('Item cannot be blank!');
    		}
    	}
    };
}());

(function(){
    getDate=function(){
			var d = new Date();
			return d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();
    };
}());

(function(){
    getTime=function(){
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
			return hr + ":" + mi + " " + APM;
    };
}());

Meteor.methods({
	addReminders: function(name){
		ifLoggedIn();
		blankName(name);
		Reminders.insert({
			name: name,
			createdAt: new Date(),
			userId: Meteor.userId()
		});
	},
	deleteReminders: function(taskId){
		ifLoggedIn();
		Reminders.remove(taskId);
	},

	addRooms: function(roomId){
		ifLoggedIn();
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
		ifLoggedIn();
		Rooms.update({name: roomId}, { $set: { cleaned: true, cleanedAt: getTime(), cleanedBy: Meteor.userId()}}, false, true);
	},
	deleteRooms: function(roomId){
		ifLoggedIn();
		Rooms.remove(roomId);
	},

	resetCleaning: function(labId){
		ifLoggedIn();
		if (labId == 'ALL'){
			var rooms = Rooms.find({cleaned: true}).fetch();
	 		for (i in rooms) {
	 			var t = rooms[i].name;
				Rooms.update({name: t}, { $set: { cleaned: false, cleanedAt: '', cleanedBy: ''}}, false, true);
			}
		} else {
			Rooms.update({name: labId}, { $set: { cleaned: false, cleanedAt: '', cleanedBy: ''}}, false, true);
		}
	},

	addLabNoShows: function(entry){
		ifLoggedIn();
		blankEntry(entry);
		var d = new Date();
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		LabNoShows.insert({
			week: 'STUB',
			date: d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear(),
			day: days[d.getDay()],
			SEtime: entry[0],
			location: entry[1],
			className: entry[2],
			professorName: entry[3],
			recordedBy: Meteor.user().emails[0].address,
			time: getTime()
		});
		console.log("inserted room");
	},
	deleteLabNoShows: function(labNoShowsId){
		ifLoggedIn();
		LabNoShows.remove(labNoShowsId);
	},

	addWireFrame: function(entry){
		ifLoggedIn();
		blankEntry(entry);
		WireFrame.insert({
			perm: entry[0],
			recordedAt: getDate() + " " + getTime(),
			recordedBy: Meteor.user().emails[0].address,
			checked: entry[1],
			comments: entry[2]
		});
		console.log("inserted room");
	},
	deleteWireFrame: function(wireFrameId){
		ifLoggedIn();
		WireFrame.remove(wireFrameId);
	},

	addWorkshops: function(entry){
		ifLoggedIn();
		blankEntry(entry);
		Workshops.insert({
			date: entry[0],
			name: entry[1],
			p1: "OPEN",
			p2: "OPEN"
		});
	},
	deleteWorkshops: function(workshopsId){
		ifLoggedIn();
		Workshops.remove(workshopsId);
	},
	claimWorkshops: function(workshopId){
		ifLoggedIn();
		var name = workshopId.slice(0, -1);
		var pos = workshopId.charAt(workshopId.length-1);
		if (pos == '1'){
			Workshops.update({name: name}, { $set: { p1: Meteor.user().emails[0].address}}, false, true);
		} else {
			Workshops.update({name: name}, { $set: { p2: Meteor.user().emails[0].address}}, false, true);
		}
	},
	resetWorkshops: function(workshopId){
		ifLoggedIn();
		if (workshopId == 'ALL'){
			var workshops = Workshops.find().fetch();
	 		for (i in workshops) {
	 			var t = workshops[i].name;
				Workshops.update({name: t}, { $set: { p1: 'OPEN', p2: 'OPEN'}}, false, true);
			}
		} else {
			var name = workshopId.slice(0, -1);
			var pos = workshopId.charAt(workshopId.length-1);
			if (pos == '1') {
				Workshops.update({name: name}, { $set: { p1: "OPEN"}}, false, true);
			} else {
				Workshops.update({name: name}, { $set: { p2: "OPEN"}}, false, true);
			}
		}
	},
	addWriteUps: function(entry){
		ifLoggedIn();
		var ini = [entry[0],entry[1],entry[2],entry[5]];
		blankEntry(ini);
		if (entry[1] == 'shift' && entry[4] == '') {
  		alert('Item cannot be blank!');
      throw new Meteor.Error('Item cannot be blank!');
		}
		WriteUps.insert({
			assignedTo: entry[0],
			type: entry[1],
			reason: entry[2],
			excused: entry[3],
			period: entry[4],
			assignedBy: Meteor.user().emails[0].address,
			date: entry[5],
			recordedAt: getDate() + " " + getTime(),
			signed: false
		});
	},
	deleteWriteUps: function(writeUpId){
		ifLoggedIn();
		WriteUps.remove(writeUpId);
	},
	signWriteUps: function(writeUpId){
		ifLoggedIn();
		WriteUps.update({_id: writeUpId}, { $set: { signed: true}}, false, true);
	}
})
