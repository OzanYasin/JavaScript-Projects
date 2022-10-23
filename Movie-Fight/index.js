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
  for (let movie of movies) {
    const anchor = document.createElement('a');
    anchor.classList.add('dropdown-item');

    anchor.innerHTML = `
      <h1>${movie.Title}</h1>
      <img src="${movie.Poster}" />
    `;
    resultsWrapper.appendChild(anchor);
  }
};

input.addEventListener('input', debounce(onInput, 500));
