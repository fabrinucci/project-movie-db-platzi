const trendingSelector = document.querySelector('#trending');

const API_KEY ='508a25f671b0a06c9ab8aec35944749e';
const API_URL=`https://api.themoviedb.org/3`;

/* https://api.themoviedb.org/3/trending/movie/week?api_key=508a25f671b0a06c9ab8aec35944749e  */

const createDiv = (options) => {
  const div = document.createElement('div');
  const img = document.createElement('img');

  div.setAttribute('id', `${options.id}`);
  div.setAttribute('class', `${options.class}`);

  img.setAttribute('src', `${options.img_url}`);
  img.setAttribute('alt', `${options.title}`);

  div.append(img);

  return div;

}

const getTrending = async () => {

  const res = await fetch(`${API_URL}/trending/tv/day?api_key=${API_KEY}`);
  const data = await res.json();
  const movies = data.results;

  const fragment = new DocumentFragment;

  movies.forEach( movie => {
    const newDiv = createDiv({
      id: movie.id,
      class: 'display-movie',
      img_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      title: movie.title
    })
    fragment.append(newDiv)
  })
  trendingSelector.append(fragment);

  // id,
  // title,
  // overview,
  // vote_average,


  console.log(movies);
}

getTrending();