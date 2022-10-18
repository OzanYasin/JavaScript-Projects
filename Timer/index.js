class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart();
    }
    this.tick();
    // In order to share information between different methods, we assign that information to an instance variable.
    this.interval = setInterval(this.tick, 1000);
  };

  pause = () => {
    if (this.onComplete) {
      this.onComplete();
    }
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
    } else {
      // Left side sets timeRemaining, while right side gets the timeRemaining
      this.timeRemaining = this.timeRemaining - 1;
      if (this.onTick) {
        this.onTick();
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time;
  }
}

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
