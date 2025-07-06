// === DOM Elements ===
const searchForm = document.querySelector(".search-bar");
const searchInput = document.getElementById("search");
const moviesContainer = document.querySelector(".movies-container");

// === Event Listeners ===
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.matches(".search-bar")) {
    const userQuery = getEncodedSearchQuery();
    searchMovies(userQuery);
  }
});

// === Core Logic ===

// Render Movies
function renderMovies(moviesArray) {
  const html = moviesArray
    .map((movie) => {
      const { Poster, Title, imdbRating, Runtime, Genre, Plot } = movie;

      return `
      <div class="movie">
        <img src="${Poster}" alt="${Title} poster" class="movie-poster" />
        <div class="movie-info">
          <h2 class="movie-title">${Title}</h2>
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z"
              fill="#FEC654"
            />
          </svg>
          <span>${imdbRating}</span>
          <span>${Runtime}</span>
          <span>${Genre}</span>
          <button class="add-to-watchlist">Watchlist</button>
          <p class="movie-plot">${Plot}</p>
        </div>
      </div>
    `;
    })
    .join("");

  moviesContainer.innerHTML = html;
}

// Fetch movies from OMDb API using the search query
async function searchMovies(query) {
  const url = `http://www.omdbapi.com/?apikey=182a35b7&s=${query}`;

  const response = await fetch(url);
  const data = await response.json();

  const moviesArray = data.Search;

  const imdbIdArray = await Promise.all(
    moviesArray.map((movie) => fetchMovie(movie.imdbID))
  );

  renderMovies(imdbIdArray);
}

// Fetch movie from OMDB API using imdbID
async function fetchMovie(imdbID) {
  const url = `http://www.omdbapi.com/?apikey=182a35b7&i=${imdbID}`;

  const response = await fetch(url);
  return await response.json();
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

// build and return imdbID array
function buildImdbIdArray(moviesArray) {
  return moviesArray.map((movie) => movie.imdbID);
}
