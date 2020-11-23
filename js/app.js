let currentColor = localStorage.getItem('setColor');
if (currentColor) {
  document.querySelector(':root').style.setProperty('--main-color', currentColor);
}

const time = document.querySelector('#time');
const weekday = document.getElementById('dayname');
const month = document.getElementById('month');
const daynumber = document.getElementById('daynumber');
const year = document.getElementById('year');

function displayTime() {
  let date = new Date();

  let dayname = date.getDay();
  let monthnow = date.getMonth();
  let daynow = formatDigits(date.getDate());
  let yearnow = date.getFullYear();

  let hours = formatDigits(date.getHours());
  let minutes = formatDigits(date.getMinutes());
  let seconds = formatDigits(date.getSeconds());

  let daytime = 'am';
  if (hours > 12) {
    daytime = 'pm';
    hours = hours - 12;
  }

  if (hours === 0) {
    hours = 12;
  }

  let timenow = `${hours}:${minutes}:${seconds} ${daytime}`;
  time.textContent = timenow;

  let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

  daynumber.textContent = `${daynow}`;
  year.textContent = `${yearnow}`;
}
displayTime();
let startDisplayTime = setInterval(displayTime, 1000);

//--------------  change page accent color  ----------
const colorchange = document.querySelector('.change-color');

colorchange.addEventListener('click', () => {
  let setcurrentColor = getRandomColor();
  document.querySelector(':root').style.setProperty('--main-color', setcurrentColor);
  localStorage.setItem(`setColor`, `${setcurrentColor}`);
});

// --------------------------------------------------
//                 reuse functions
//---------------------------------------------------
function formatDigits(digit) {
  if (digit < 10) {
    digit = '0' + digit;
  }
  return digit;
}

function getRandomColor() {
  let chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

//--------------  freez time / alarm  ----------------------

const btnFreez = document.querySelector('.freez');
const btnAlarm = document.querySelector('.alarm');

btnFreez.addEventListener('click', clickHandler);

function clickHandler(e) {
  clearInterval(startDisplayTime);
  let startfreez = new Date().getTime();
  time.textContent = 'FREEZ';
  document.querySelector('.freez-time').textContent = 'FREEZ ON';
  document.querySelector('.freez-time').style.color = 'var(--main-color)';
  document.querySelector('.alarm-time').textContent = 'FREEZ FOR';

  btnAlarm.addEventListener('click', (e) => {
    document.querySelector('.alarm-time').style.color = 'var(--main-color)';
    let stopfreez = new Date().getTime();
    let difference = Math.abs(startfreez - stopfreez);

    time.textContent = getTimeDifference(difference);
    btnFreez.removeEventListener('click', clickHandler);
    document.querySelector('.freez-time').textContent = 'to CLOCK';

    btnAlarm.addEventListener('click', (e) => {
      document.querySelector('.alarm-time').textContent = 'STILL COUNT';
      e.preventDefault();
    });

    e.preventDefault();
  });

  e.preventDefault();
}

function getTimeDifference(diff) {
  let diffInHrs = diff / 3600000;
  let hours = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hours) * 60;
  let minutes = Math.floor(diffInMin);

  let diffInSec = (diffInMin - minutes) * 60;
  let seconds = Math.floor(diffInSec);

  let formattedhours = hours.toString().padStart(2, '0');
  let formattedminutes = minutes.toString().padStart(2, '0');
  let formattedseconds = seconds.toString().padStart(2, '0');

  return `${formattedhours} : ${formattedminutes} : ${formattedseconds}`;
}
