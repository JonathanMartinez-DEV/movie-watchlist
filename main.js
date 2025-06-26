// === Core Logic ===

// Fetch movies from OMDb API using the search query
async function searchMovies(query) {
  const url = `http://www.omdbapi.com/?apikey=182a35b7&s=${query}`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
}
