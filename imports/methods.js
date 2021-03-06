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
        throw new Meteor.Error('Item cannot be blank!');
    	}
    };
}());

(function(){
    blankEntry=function(entry){
    	for (i=0;i< entry.length;i++){
    		if (entry[i]==''){
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

	addRooms: function(entry){
		ifLoggedIn();
		blankEntry(entry);
		Rooms.insert({
			name: entry[0],
			location: entry[1],
			createdAt: new Date(),
			userId: Meteor.userId(),
			cleaned: false,
			cleanedAt: '',
			cleanedBy: ''
		});
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
			if (Meteor.userId() != Rooms.findOne({name: labId}).cleanedBy) {
				throw new Meteor.Error("You can't delete someone else's cleaning record!");
			} else {
				Rooms.update({name: labId}, { $set: { cleaned: false, cleanedAt: '', cleanedBy: ''}}, false, true);
			}
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
			recordedBy: Meteor.userId(),
			time: getTime()
		});
	},
	deleteLabNoShows: function(labNoShowsId){
		ifLoggedIn();
		LabNoShows.remove(labNoShowsId);
	},

	addWireFrame: function(entry){
		ifLoggedIn();
		var ini = [entry[0],entry[1]];
		blankEntry(ini);
		WireFrame.insert({
			perm: entry[0],
			recordedAt: getDate() + " " + getTime(),
			recordedBy: Meteor.userId(),
			checked: entry[1],
			comments: entry[2]
		});
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
			p1: "",
			p2: ""
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
			Workshops.update({name: name}, { $set: { p1: Meteor.userId()}}, false, true);
		} else {
			Workshops.update({name: name}, { $set: { p2: Meteor.userId()}}, false, true);
		}
	},
	resetWorkshops: function(workshopId){
		ifLoggedIn();
		if (workshopId == 'ALL'){
			var workshops = Workshops.find().fetch();
	 		for (i in workshops) {
	 			var t = workshops[i].name;
				Workshops.update({name: t}, { $set: { p1: '', p2: ''}}, false, true);
			}
		} else {
			var name = workshopId.slice(0, -1);
			var pos = workshopId.charAt(workshopId.length-1);
			if (pos == '1') {
				if (Meteor.userId() != Workshops.findOne({name: name}).p1) {
					throw new Meteor.Error("You can't delete someone else's workshop signup!");
				}else {
					Workshops.update({name: name}, { $set: { p1: ""}}, false, true);
				}
			} else {
				if (Meteor.userId() != Workshops.findOne({name: name}).p2){
					throw new Meteor.Error("You can't delete someone else's workshop signup!");
				}else {
					Workshops.update({name: name}, { $set: { p2: ""}}, false, true);
				}
			}
		}
	},
	addWriteUps: function(entry){
		ifLoggedIn();
		var ini = [entry[0],entry[1],entry[2],entry[5]];
		blankEntry(ini);
		if (Meteor.users.find({ "emails.address" : entry[0] }).count() == '0'){
			throw new Meteor.Error("Can't find this user!");
		}
		var recv_id = Meteor.users.findOne({'emails.address': entry[0]})._id;
		if (entry[1] == 'shift' && entry[4] == '') {
      throw new Meteor.Error('Period cannot be blank!');
		}
		if (entry[1] == 'bad' && entry[3] == '') {
      throw new Meteor.Error('Excused? cannot be blank!');
		}
		WriteUps.insert({
			assignedTo: recv_id,
			type: entry[1],
			reason: entry[2],
			excused: entry[3],
			period: entry[4],
			assignedBy: Meteor.userId(),
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
	},

	addSchedules: function(entry){
		ifLoggedIn();
		blankEntry(entry);
		Schedules.insert({
			location: entry[0],
			quarter: entry[1],
			year: entry[2],
			note: entry[3],
			m8t9a: '',
			m9t10a: '',
			m10t11a: '',
			m11t12p: '',
			m12t1p: '',
			m1t2p: '',
			m2t3p: '',
			m3t4p: '',
			m4t5p: '',
			m5t6p: '',
			m6t7p: '',
			m7t8p: '',
			m8t9p: '',
			m9t10p: '',
			t8t9a: '',
			t9t10a: '',
			t10t11a: '',
			t11t12p: '',
			t12t1p: '',
			t1t2p: '',
			t2t3p: '',
			t3t4p: '',
			t4t5p: '',
			t5t6p: '',
			t6t7p: '',
			t7t8p: '',
			t8t9p: '',
			t9t10p: '',
			w8t9a: '',
			w9t10a: '',
			w10t11a: '',
			w11t12p: '',
			w12t1p: '',
			w1t2p: '',
			w2t3p: '',
			w3t4p: '',
			w4t5p: '',
			w5t6p: '',
			w6t7p: '',
			w7t8p: '',
			w8t9p: '',
			w9t10p: '',
			th8t9a: '',
			th9t10a: '',
			th10t11a: '',
			th11t12p: '',
			th12t1p: '',
			th1t2p: '',
			th2t3p: '',
			th3t4p: '',
			th4t5p: '',
			th5t6p: '',
			th6t7p: '',
			th7t8p: '',
			th8t9p: '',
			th9t10p: '',
			f8t9a: '',
			f9t10a: '',
			f10t11a: '',
			f11t12p: '',
			f12t1p: '',
			f1t2p: '',
			f2t3p: '',
			f3t4p: '',
			f4t5p: '',
			f5t6p: ''
		});
	},
	deleteSchedules: function(input){
		ifLoggedIn();
		if (input == 'ALL'){
			Schedules.remove({});
		}else {
			Schedules.remove(writeUpId);
		}
	},
	claimSchedules: function(entry){
		ifLoggedIn();
		Schedules.update({_id: entry[0]}, { $set: { [entry[1]]: Meteor.userId()}}, false, true);
	},
	deleteShifts: function(entry){
		ifLoggedIn();
 		Schedules.update({_id: entry[0]}, { $set: { [entry[1]]: ''}}, false, true);
 	}
})
