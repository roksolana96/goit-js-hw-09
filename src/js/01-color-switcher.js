function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }


const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector('body');


let timerId = null;
isActive = false;

startBtn.addEventListener("click", startBtnColor);
stopBtn.addEventListener("click", stopBtnColor);

function startBtnColor() {
  if (isActive) {
  return;
};
  isActive = true;
    startBtn.classList.add('button-color');
    stopBtn.classList.remove('button-color');

  timerId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
};


function stopBtnColor() {
  isActive = false;

    stopBtn.classList.add('button-color');
    startBtn.classList.remove('button-color');
  clearInterval(timerId);
};
