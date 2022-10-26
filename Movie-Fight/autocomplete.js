const createAutoComplete = ({ root }) => {
  root.innerHTML = `
  <label><b>Search for a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const onInput = async (event) => {
    const movies = await fetchData(event.target.value);
    // console.log(movies);
    if (!movies.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    dropdown.classList.add('is-active');
    resultsWrapper.innerHTML = '';
    for (let movie of movies) {
      const option = document.createElement('a');
      const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

      option.classList.add('dropdown-item');
      option.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title}
    `;
      resultsWrapper.appendChild(option);
      option.addEventListener('click', (event) => {
        dropdown.classList.remove('is-active');
        input.value = movie.Title;
        onMovieSelect(movie);
      });
    }
  };

  input.addEventListener('input', debounce(onInput, 500));

  // Events bubble, which means if some element contained inside the document, and if it does not handled, then the event is going to essentially bubble up until it gets to the top level of our entire HTML document. In this case, its document
  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
