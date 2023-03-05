import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Report } from 'notiflix/build/notiflix-report-aio';
// import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

let offerTime;

const  inputEl = document.querySelector('#datetime-picker');
const  startEl = document.querySelector('[data-start]');
const  daysEl = document.querySelector('[data-days]');
const  hoursEl = document.querySelector('[data-hours]');
const  minutesEl = document.querySelector('[data-minutes]');
const  secondsEl = document.querySelector('[data-seconds]');


startEl.addEventListener('click', () => {
  timer.start(offerTime);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    offerTime = selectedDates[0];
    if (selectedDates[0] < options.defaultDate) {
      startEl.classList.add('disabled');
      Notify.failure('Please choose a date in the future');
    } else {
      startEl.classList.remove('disabled');
    }
  },
};

const timer = {
  intervalId: null,
  isActive: false,

start() {
  const currentTime = Date.now();
  inputEl.classList.add('disabled');
  startEl.classList.add('disabled');
  this.intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = offerTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
      if (currentTime >= offerTime) {
        Notify.success('Success');
        this.stop();
        return;
      }
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }, 1000);
},

  stop() {
    clearInterval(this.intervalId);
  },
}

function  pad(value) {
    return String(value.toString().padStart(2, '0'));
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
  return { days, hours, minutes, seconds };
}

const fp = flatpickr(inputEl, options);
