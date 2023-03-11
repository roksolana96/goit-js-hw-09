import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const button = document.querySelector('button');
const amount = document.querySelector('input[name="amount"]');
const step = document.querySelector('input[name="step"]');
const delay = document.querySelector('input[name="delay"]');

form.addEventListener('submit', submitForm)

function submitForm(event) {
  event.preventDefault();
  button.classList.add('disabled');
  const {
    elements: { amount, step, delay },
  } = event.currentTarget;
  let numDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, numDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    numDelay += Number(step.value);
  }
};


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}