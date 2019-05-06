let countdown;
let workSeconds = 1500;
let breakSeconds = 300;
let seconds = workSeconds;

let onBreak = false;
let isStarted = true;
let isPaused;
let isResumed;
let timerDisplay = document.querySelector(".display__time-left");

const incrementWork = document.getElementById("increase-work");
const decrementWork = document.getElementById("decrease-work");
const incrementBreak = document.getElementById("increase-break");
const decrementBreak = document.getElementById("decrease-break");
const startTimer = document.getElementById("start-timer");
const stopTimer = document.getElementById("stop-timer");
const display = document.querySelector(".display");
const text = document.getElementById("text");
const background = document.querySelector("body");
const alarm = document.createElement('audio'); 
const now = Date.now();
const then = now + seconds * 1000;
render();

startTimer.addEventListener("click", () => {
	if (isStarted) {
		startCountdown();
		startTimer.textContent = "❚❚";
		isPaused = true;
		isStarted = false;
	} else if (isPaused) {
		clearInterval(countdown);
		startTimer.textContent = "▶";
		isResumed = true;
		isPaused = false;
		secondsLeft = Math.round((then - Date.now()) / 1000);
	} else if (isResumed) {
		startTimer.textContent = "❚❚";
		startCountdown();
		isResumed = false;
		isPaused = true;
	}
});

alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

stopTimer.addEventListener("click", () => {
  stopCountdown();
	seconds = workSeconds;
	render();
});

incrementWork.addEventListener("click", () => {
  seconds += 60;
  workSeconds += 60;
	render();
});

decrementWork.addEventListener("click", () => {
	if (seconds <= 60) {
		return;
	} else {
  seconds -= 60;
  workSeconds -= 60;
	}
  render();
});

incrementBreak.addEventListener("click", () => {
  breakSeconds += 60;
	render();
});

decrementBreak.addEventListener("click", () => {
		if (breakSeconds <= 60) {
		return;
		} else {
  breakSeconds -= 60;
	}
	render();
});

function startCountdown() {
	countdown = setInterval(() => {
    seconds--;
		if(seconds < 1 && onBreak) {
			seconds = workSeconds;
			display.style.backgroundColor = "#00A6A6";
			text.textContent = "Keep working!"
			onBreak = false;
			alarm.play();
    } else if (seconds < 1) {
			alarm.play();
			onBreak = true;
			text.textContent = "Enjoy your break!"
			display.style.backgroundColor = "#F08700";
			seconds = breakSeconds;
		}
    render();
	}, 1000);
}

function stopCountdown() {
	clearInterval(countdown);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function render() {
  const workSession = document.getElementById("work-session");
  const breakSession = document.getElementById("break-session");
	
	displayTimeLeft(seconds);
	workSession.textContent = Math.floor(workSeconds / 60);
	breakSession.textContent = Math.floor(breakSeconds / 60);
}