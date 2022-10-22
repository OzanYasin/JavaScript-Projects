const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // second time they press the key to input, we're going to once again enter onInput function;
    // Then, timeoutId will be defined. Which means, that's executes clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // apply -> call the function as we normally would and take all the arguments or whatever is inside of that array, and pass them in as separate arguments to the original function
      func.apply(null, args);
    }, delay);
  };
};
