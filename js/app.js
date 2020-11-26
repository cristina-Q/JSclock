let currentColor = localStorage.getItem('setColor');
if (currentColor) {
  document.querySelector(':root').style.setProperty('--main-color', currentColor);
}

const date = document.querySelector('.date');
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
const colororiginal = document.querySelector('.logo');

colorchange.addEventListener('click', () => {
  let setcurrentColor = getRandomColor();
  document.querySelector(':root').style.setProperty('--main-color', setcurrentColor);
  localStorage.setItem(`setColor`, `${setcurrentColor}`);
});

colororiginal.addEventListener('click', (e) => {
  document.querySelector(':root').style.setProperty('--main-color', 'cyan');
  e.preventDefault();
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

//--------------  freez time   ----------------------

const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');

btnLeft.addEventListener('click', getFreez);

function getFreez(e) {
  clearInterval(startDisplayTime);
  let startfreez = new Date().getTime();
  time.textContent = 'FREEZ';
  document.querySelector('.freez-time').textContent = 'FREEZ ON';
  document.querySelector('.freez-time').style.color = 'var(--main-color)';
  document.querySelector('.alarm-time').textContent = 'DEFREEZ';

  //now the second button start to listen inside first event propagation
  btnRight.addEventListener('click', function foo(e) {
    document.querySelector('.wrapper-picktime').classList.add('d-none');
    let stopfreez = new Date().getTime();
    let difference = Math.abs(startfreez - stopfreez);
    time.textContent = getTimeDifference(difference);

    document.querySelector('.alarm-time').style.color = 'var(--main-color)';
    document.querySelector('.freez-time').textContent = 'to CLOCK';
    document.querySelector('.alarm-time').textContent = 'STILL COUNT';

    btnLeft.removeEventListener('click', getFreez);
    // btnRight.removeEventListener('click', foo);

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

//--------------  set alarm   ----------------------
btnRight.addEventListener('click', getAlarm);

function getAlarm(e) {
  clearInterval(startDisplayTime);
  btnLeft.removeEventListener('click', getFreez);

  date.textContent = 'please, set alarm';
  time.textContent = '';
  document.querySelector('.wrapper-picktime').classList.remove('d-none');
  document.querySelector('.alarm-time').style.color = 'var(--main-color)';
  document.querySelector('.alarm-time').textContent = 'ALARM MOD';
  document.querySelector('.freez-time').textContent = 'TO CLOCK';

  const inputlist = document.querySelector('#inputlist');
  inputlist.addEventListener('focus', (e) => {
    document.querySelector('.listampm').style.display = 'flex';
    e.preventDefault;
  });
  for (let option of listampm.options) {
    option.onclick = function () {
      inputlist.value = this.value;
      listampm.style.display = 'none';
    };
  }

  // datalist.style.width = input.offsetWidth + 'px';
  // datalist.style.left = input.offsetLeft + 'px';
  // datalist.style.top = input.offsetTop + input.offsetHeight + 'px';

  // get use only arrows/spinners on input

  // hourinput = document.querySelector('.pick-hour');
  // minuteinput = document.querySelector('.pick-minutes');

  // myInputTag.onkeydown = onlyUpDownKeys ;

  // function onlyUpDownKeys(e) {
  //   (e.keyCode===38 || e.keyCode===40) ? updateValue(e): e.preventDefault();
  // }
  // let inputvalhour = document.querySelector('.pick-hour').value;
  // let inputvalminute = document.querySelector('.pick-minutes').value;
  // let inputvalampm = document.querySelector('.pick-ampm').value;

  e.preventDefault();
}

// console.log(listampm.parentElement.nodeName) --> <form>
/*
  var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav");
		sound.loop = true;
let inputhour = document.createElement('div');
inputhour.setAttribute('type', 'number');

const temppickhour

const documentFragment = new DocumentFragment();
documentFragment.innerHTML = '';

const template =

documentFragment.innerHTML += template;
seatHand.innerHTML = documentFragment.innerHTML;
document.querySelector('.alarm-time').textContent = 'ALARM ON';
*/
