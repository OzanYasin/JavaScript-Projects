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

let timeoutId;
const onInput = (event) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  // second time they press the key to input, we're going to once again enter onInput function;
  // Then, timeoutId will be defined. Which means, that's executes clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 500);
};

input.addEventListener('input', onInput);
