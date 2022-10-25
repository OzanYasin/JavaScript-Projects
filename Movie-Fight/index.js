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

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search for a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);
  // console.log(movies);
  dropdown.classList.add('is-active');
  resultsWrapper.innerHTML = '';
  for (let movie of movies) {
    const anchor = document.createElement('a');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    anchor.classList.add('dropdown-item');
    anchor.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title}
    `;
    resultsWrapper.appendChild(anchor);
  }
};

input.addEventListener('input', debounce(onInput, 500));

// Events bubble, which means if some element contained inside the document, and if it does not handled, then the event is going to essentially bubble up until it gets to the top level of our entire HTML document. In this case, its document
document.addEventListener('click', (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});
