// === DOM Elements ===
const searchForm = document.querySelector(".search-bar");

// === Event Listeners ===
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.matches(".search-bar")) {
    searchMovies("blade runner");
  }
});

// === Core Logic ===

// Fetch movies from OMDb API using the search query
async function searchMovies(query) {
  const url = `http://www.omdbapi.com/?apikey=182a35b7&s=${query}`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
}
