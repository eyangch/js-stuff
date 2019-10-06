var wholeURL = window.location.href;
var i1;
for(i1 = 0; wholeURL[i1] != '?'; i1++){}
for(; wholeURL[i1] != '='; i1++){}
var dstring = "";
i1++;
for(; wholeURL[i1] != '&'; i1++){
	dstring += wholeURL[i1];
}
console.log(dstring);
for(; wholeURL[i1] != '='; i1++){}
var hstring = "";
i1++;
for(; wholeURL[i1] != '%'; i1++){
	hstring += wholeURL[i1];
}
for(; wholeURL[i1] != 'A'; i1++){}
var mstring = "";
i1++;
for(; i1 < wholeURL.length; i1++){
	mstring += wholeURL[i1];
}
console.log(hstring);
console.log(mstring);
var d = new Date(dstring);
console.log(d);
console.log(d.getTimezoneOffset());
var beginD = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
beginD.setHours(hstring);
beginD.setMinutes(mstring);
console.log(beginD);
function upd(){
	var seconds = new Date() - beginD;
	var minutes = 0;
	var hours = 0;
	var days = 0;
	seconds /= 1000;
	seconds = Math.floor(seconds);
	minutes = Math.floor(seconds / 60);
	seconds %= 60;
	hours = Math.floor(minutes / 60);
	minutes %= 60;
	days = Math.floor(hours / 24);
	hours %= 24;
	document.getElementById("days").innerHTML = days;
	if(days != 1){
		document.getElementById("days").innerHTML += " days,";
	}else{
		document.getElementById("days").innerHTML += " day,";
	}
	document.getElementById("hours").innerHTML = hours;
	if(hours != 1){
		document.getElementById("hours").innerHTML += " hours,";
	}else{
		document.getElementById("hours").innerHTML += " hour,";
	}
	document.getElementById("minutes").innerHTML = minutes;
	if(days != 1){
		document.getElementById("minutes").innerHTML += " minutes, and";
	}else{
		document.getElementById("minutes").innerHTML += " minute, and";
	}
	document.getElementById("seconds").innerHTML = seconds;
	if(days != 1){
		document.getElementById("seconds").innerHTML += " seconds";
	}else{
		document.getElementById("seconds").innerHTML += " second";
	}
}
setInterval(upd, 50);
