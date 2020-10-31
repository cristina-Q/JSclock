const time = document.getElementById('time');

function displayTime() {
  let date = new Date();
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
}
displayTime();

setInterval(displayTime, 1000);
