import { DropDownMenu } from '/static/js/dropDown.js';

let weeklyMeetingDropDown = document.getElementById("wmContent");
let outdoorDropDown = document.getElementById("odContent");
let gymEvents = document.getElementById("geContent");

let wmButton = document.getElementById("wmButton");
let odButton = document.getElementById("odButton");
let geButton = document.getElementById("geButton");

new DropDownMenu(wmButton, weeklyMeetingDropDown, true, true);
new DropDownMenu(odButton, outdoorDropDown, true, true);
new DropDownMenu(geButton, gymEvents, true, true);


