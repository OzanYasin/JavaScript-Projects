// Movie API
// http://www.omdbapi.com/?apikey=[yourkey]&
// API Key: ccdeef6c

const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com', {
    params: {
      apikey: 'ccdeef6c',
      s: searchTerm,
    },
  });

  console.log(response.data);
};

const input = document.querySelector('input');

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

const onInput = (event) => {
  fetchData(event.target.value);
};

input.addEventListener('input', debounce(onInput, 500));
