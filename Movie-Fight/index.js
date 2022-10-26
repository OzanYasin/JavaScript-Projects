// Movie API
// http://www.omdbapi.com/?apikey=[yourkey]&
// API Key: ccdeef6c

createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption: (movie) => {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <img src="${imgSrc}" alt="${movie.Title}" />
      ${movie.Title} (${movie.Year})
    `;
  },
  onOptionSelect: (movie) => {
    onMovieSelect(movie);
  },
  inputValue: (movie) => {
    return movie.Title;
  },
  fetchData: async (searchTerm) => {
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
  },
});

const onMovieSelect = async (movie) => {
  const response = await axios.get('http://www.omdbapi.com', {
    params: {
      apikey: 'ccdeef6c',
      i: movie.imdbID,
    },
  });

  document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};
