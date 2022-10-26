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

createAutoComplete({
  root: document.querySelector('.autocomplete'),
});
createAutoComplete({
  root: document.querySelector('.autocomplete-two'),
});
createAutoComplete({
  root: document.querySelector('.autocomplete-three'),
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
