const hrs = document.getElementById('hrs');
const mins = document.getElementById('mins');
const secs = document.getElementById('secs');
const dayWeek = document.getElementById('weekDay');
const amPM = document.getElementById('amPM');
const dayOrNight = document.getElementById('dayOrNight');
const date = document.getElementById('date')
const hrMenu = document.getElementById('hrMenu');
const minMenu = document.getElementById('minMenu');
const secMenu = document.getElementById('secMenu');
const liItem = document.getElementById('alarmItem')
let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const alarmBtn = document.getElementById('alarmBtn')
let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
let counter = 0;
let counterTwo = 0;
let counterThree = 0;
let arrOne = [];
let arrTwo = [];
let arrThree = [];
let interval;
while (counter <= 24) {
  arrOne.push(counter)
  counter++
}
while (counterTwo <= 59) {
  arrTwo.push(counterTwo)
  counterTwo++;
}
while (counterThree <= 59) {
  arrThree.push(counterThree)
  counterThree++
}

function renderOptions(array, parentEl) {
  for (var i = 0; i < array.length; i++) {
    const opt = document.createElement('option')
    opt.innerHTML = `${array[i] < 10 ? 0:""}${array[i]}`
    parentEl.appendChild(opt)
  }
}


window.addEventListener('load', () => {
  setInterval(() => {
    getTime(hrs, mins, secs)
  }, 1000)
  renderOptions(arrOne, hrMenu)
  renderOptions(arrTwo, minMenu)
  renderOptions(arrThree, secMenu)
})

function getTime(hours, minutes, seconds, milsecs) {
  const d = new Date();
  const day = d.getDay();
  hours.innerHTML = `${d.getHours() < 10 ? 0:""}${d.getHours()}`;
  minutes.innerHTML = `${d.getMinutes() < 10 ? 0:""}${d.getMinutes()}`;
  seconds.innerHTML = `${d.getSeconds() < 10 ? 0:""}${d.getSeconds()}`;
  dayWeek.innerHTML = `${daysOfWeek[day]},`;
  amPM.innerHTML = `${d.getHours() < 12 ? "AM" :"PM"}`;
  date.innerHTML = ` ${months[d.getMonth()]} ${d.getDate()}`;
  dayOrNight.innerHTML = `${d.getHours() < 12 ? '<i class="fa fa-sun-o" aria-hidden="true"></i>': '<i class="fa fa-moon-o" aria-hidden="true"></i>'}`
}

alarmBtn.addEventListener('click', () => {
  getAlarm(hrMenu, minMenu, secMenu)
})

function getAlarm(hr, min, sec) {
  const h = hr.options[hr.selectedIndex].value;
  const m = min.options[min.selectedIndex].value;
  const s = sec.options[sec.selectedIndex].value;
  const userAlarm = {
    alarm: `${h}:${m}:${s}`
  }
  renderHTML(userAlarm)
  interval = setInterval(() => {
    checkTime(userAlarm)
  }, 1000)
}

function renderHTML(element) {
  liItem.innerHTML = `<small><i class="fa fa-bell" aria-hidden="true"></i></small> ${element.alarm}`;
}

function checkTime(alarm){
  const d2 = new Date();
  const hr = `${d2.getHours() < 10 ? 0:""}${d2.getHours()}`;
  const min = `${d2.getMinutes() < 10 ? 0:""}${d2.getMinutes()}`;
  const sec = `${d2.getSeconds() < 10 ? 0:""}${d2.getSeconds()}`;
  const currentTime = {
    time: `${hr}:${min}:${sec}`
  }
  const compare = alarm.alarm == currentTime.time ? true : false;
  fetchAlarm(compare)
  clearInterv(compare)
}

function clearInterv(alarm) {
  if (alarm) {
    clearInterval(interval)
  } else {
    return;
  }
}

function fetchAlarm(element){
  if(element){
    const audio = document.getElementById('audio');
    //audio.setAttribute('controls','controls')
    audio.setAttribute('src','resources/spirit-blossom.mp3')
    audio.autoplay = true;
    setTimeout(()=>{
      audio.pause()
      audio.currentTime = 0;
    },15000)
  } else {
    return;
  }
}
