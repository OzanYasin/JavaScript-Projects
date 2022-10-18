const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton, {
  // We're going to eventually take a look at those callbacks and we're going to add in some code draw the border, to update the border, and eventually reset it as well.
  onStart() {
    console.log('Timer started');
  },
  onTick() {
    console.log('Timer is ticking');
  },
  onComplete() {
    console.log('Timer completed');
  },
});
