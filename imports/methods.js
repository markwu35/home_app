var blankName;
var blankEntry;

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

	resetCleaning: function(labId){
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
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		blankEntry(entry);
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
			SEtime: entry[0],
			location: entry[1],
			className: entry[2],
			professorName: entry[3],
			recordedBy: Meteor.user().emails[0].address,
			time: time
		});
		console.log("inserted room");
	},
	deleteLabNoShows: function(labNoShowsId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		LabNoShows.remove(labNoShowsId);
	},

	addWireFrame: function(entry){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		blankEntry(entry);
		var d = new Date();
		var date = d.toString().slice(0, -33); 
		WireFrame.insert({
			perm: entry[0],
			createdAt: date,
			recordedBy: Meteor.user().emails[0].address,
			checked: entry[1],
			comments: entry[2]
		});
		console.log("inserted room");
	},
	deleteWireFrame: function(wireFrameId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		WireFrame.remove(wireFrameId);
	},

	addWorkshops: function(entry){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		blankEntry(entry);
		Workshops.insert({
			date: entry[0],
			name: entry[1],
			p1: "OPEN",
			p2: "OPEN"
		});
		console.log("inserted room");
	},
	deleteWorkshops: function(workshopsId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		Workshops.remove(workshopsId);
	},
	claimWorkshops: function(workshopId){
		if(!Meteor.userId()){
			throw new Meteor.Error('No Access!');
		}
		var name = workshopId.slice(0, -1);
		var pos = workshopId.charAt(workshopId.length-1);
		if (pos == '1'){
			Workshops.update({name: name}, { $set: { p1: Meteor.user().emails[0].address}}, false, true);
		} else {
			Workshops.update({name: name}, { $set: { p2: Meteor.user().emails[0].address}}, false, true);
		}
	},
	resetWorkshops: function(workshopId){
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
	}
})
