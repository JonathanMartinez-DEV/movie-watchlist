// === DOM Elements ===
const searchForm = document.querySelector(".search-bar");
const searchInput = document.getElementById("search");

// === Event Listeners ===
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.matches(".search-bar")) {
    const userQuery = getEncodedSearchQuery();
    searchMovies(userQuery);
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

// Helpers

// Return the user's encoded search query
// e.g. "blade runner" => "blade%20runner"
function getEncodedSearchQuery() {
  // Normalize whitespace: trim and reduce multiple spaces to one
  // e.g. "  blade   runner  " => "blade runner"
  const normalized = searchInput.value.trim().replace(/\s+/g, " ");

  return encodeURIComponent(normalized);
}
