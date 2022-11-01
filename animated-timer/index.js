const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
// stroke-dasharray & stroke-dashoffset
circle.setAttribute('stroke-dasharray', perimeter);

let duration;

// offset = (perimeter * timeRemaining) / totalDuration - perimeter

const timer = new Timer(durationInput, startButton, pauseButton, {
  // We're going to eventually take a look at those callbacks and we're going to add in some code draw the border, to update the border, and eventually reset it as well.
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      'stroke-dashoffset',
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {
    console.log('Timer completed');
  },
});
