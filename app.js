const API_KEY = '54457944ad7d1a7e99098de8629ecb5c';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;

const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

const DEFAULT_IMG =
  'https://images-na.ssl-images-amazon.com/images/I/514j6tNZqYL.jpg';

const main = document.getElementById('main');
const form = document.getElementById('form');

// console.log(API_URL);
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.results);
  createMovieCard(data.results);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = document.getElementById('search');
  const queryText = search.value;
  const url = SEARCH_URL + queryText + '"';
  console.log(url);
  getMovies(url);
  search.value = '';
});

const createMovieCard = (data) => {
  if (data.length <= 0) {
    return;
  }
  main.innerHTML = '';
  // console.log(data.length);
  data.map((movie) => {
    const { backdrop_path, overview, poster_path, title, vote_average } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    // console.log(object);
    // console.log(IMAGE_PATH + poster_path, poster_path);
    movieEl.innerHTML = `
        <img src=${
          poster_path != null ? IMAGE_PATH + poster_path : DEFAULT_IMG
        } alt=${title}>
        <div class="movie-info">
          <h3>${title}</h3>
          <span class=${
            vote_average > 8 ? 'green' : vote_average >= 6 ? 'orange' : 'red'
          }>${vote_average}</span>
        </div>
      
        <div class="overview" style="background:url(${
          backdrop_path !== null ? IMAGE_PATH + backdrop_path : DEFAULT_IMG
        });">
        <h3>Overview</h3>
        <p>${overview}</P>
        
        </div>
      `;
    main.append(movieEl);
  });
};
