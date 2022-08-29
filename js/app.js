
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY
  },
})

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

const createCategories = (options) => {
  const h3 = document.createElement('h3');
  h3.textContent = options.categoryName;
  h3.addEventListener('click', () => {
    location.hash = `category=${ options.id }-${ options.categoryName }`
  })

  return h3; 
}

const getTrending = async () => {

  const { data } = await api('/trending/movie/week');
  const movies = data.results;

  trendingSelector.innerHTML = ''

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
}

const getCategory = async () => {
  const { data } = await api('/genre/movie/list')
  const genre = data.genres;

  categoriesSelector.innerHTML = ''

  const fragment = new DocumentFragment;
  
  genre.forEach( category => {
    const categoryDiv = createCategories({
      id: category.id,
      categoryName: category.name
    })
    fragment.append(categoryDiv);
  })
  categoriesSelector.append(fragment)
}


const getMovieByCategory = async ( id ) => {
  const { data } = await api('/discover/movie', {
    params: { 'with_genres': id}
  });
  const movies = data.results;
  
  categorySelector.innerHTML = '';
  
  const fragment = new DocumentFragment;
  
  movies.forEach( movie => {
    const movieDiv = createDiv({
      id: movie.id,
      class: 'display-movie',
      img_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      title: movie.title
    })
    fragment.append(movieDiv);
  })
  categorySelector.append(fragment);
}

  // id,
  // title,
  // overview,
  // vote_average,