const time = document.getElementById('time');

const weekday = document.getElementById('dayname');
const month = document.getElementById('month');
const daynumber = document.getElementById('daynumber');
const year = document.getElementById('year');

function displayTime() {
  let date = new Date();

  let dayname = date.getDay(); // get a number aka 0 -> Sunday, 1 -> Monday etc.
  let monthnow = date.getMonth();
  let daynow = date.getDate();
  let yearnow = date.getFullYear();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let daytime = 'am';
  if (hours > 12) {
    daytime = 'pm';
    hours = hours - 12;
  }

  if (hours === 0) {
    hours = 12;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }

  let timenow = `${hours}:${minutes}:${seconds} ${daytime}`;
  time.textContent = timenow;

  let weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  dayname = weekdays[dayname];
  weekday.textContent = `${dayname} -`;

  monthnow = months[monthnow];
  month.textContent = `${monthnow}`;

  if (daynow < 10) {
    daynow = '0' + daynow;
  }
  daynumber.textContent = `${daynow}`;
  year.textContent = `${yearnow}`;
}
displayTime();

setInterval(displayTime, 1000);

const colorchange = document.getElementsByClassName('change-color');

function randomColor() {
  return Math.floor(Math.random() * 255);
}
