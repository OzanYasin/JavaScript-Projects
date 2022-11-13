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
      // We need to track totalDuration
      this.onStart(this.timeRemaining);
    }
    this.startButton.disabled = true;
    this.tick();
    // In order to share information between different methods, we assign that information to an instance variable.
    this.interval = setInterval(this.tick, 10);
  };

  pause = () => {
    if (this.onComplete) {
      this.onComplete();
    }
    this.startButton.disabled = false;
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining === 0) {
      this.pause();
      this.durationInput.value = this.timeRemaining.toFixed(0);
    } else {
      // Left side sets timeRemaining, while right side gets the timeRemaining
      this.timeRemaining = this.timeRemaining - 0.01;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
