// API create

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    api_key: API_KEY
  },
})

// Create selectors 

const createDivHtml = (options) => {
  const div = document.createElement('div');
  const img = document.createElement('img');

  div.setAttribute('id', `${options.id}`);
  div.setAttribute('class', `${options.class}`);

  img.setAttribute('src', `${options.img_url}`);
  img.setAttribute('alt', `${options.title}`);

  div.append(img);

  img.addEventListener('click', () => {
    location.hash = `#movie=${options.id}`
  })

  return div;
}

const createCategoriesHtml = (options) => {
  const h3 = document.createElement('h3');
  h3.textContent = options.categoryName;
  h3.addEventListener('click', () => {
    location.hash = `category=${ options.id }-${ options.categoryName }`
  })

  return h3; 
}

const createMovieHtml = (options) => {
  const div = document.createElement('div');
  const title = document.createElement('h1');
  const description = document.createElement('h2');

  div.setAttribute('class', 'header-movie');

  title.textContent = options.title
  description.textContent = options.description

  div.append(title, description);

  return div;
}



// Iteration

const createMovies = (movies, container) => {
  container.innerHTML = ''

  const fragment = new DocumentFragment;

  movies.forEach( movie => {
    const newDiv = createDivHtml({
      id: movie.id,
      class: 'display-movie',
      img_url: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
      title: movie.title,

    })
    fragment.append(newDiv)
  })
  container.append(fragment);
}


const createCategories = (categories, container) => {
  container.innerHTML = ''

  const fragment = new DocumentFragment;
  
  categories.forEach( category => {
    const categoryDiv = createCategoriesHtml({
      id: category.id,
      categoryName: category.name
    })
    fragment.append(categoryDiv);
  })
  container.append(fragment)
}

// APIs Calls

const getTrending = async () => {

  const { data } = await api('/trending/movie/week');
  const movies = data.results;
  createMovies(movies, trendingSelector);

}

const getCategory = async () => {
  const { data } = await api('/genre/movie/list')
  const categories = data.genres;

  createCategories(categories, categoriesSelector);
}

const getMoviesByCategory = async ( id ) => {
  const { data } = await api('/discover/movie', {
    params: { with_genres: id}
  });
  const movies = data.results;
  
  createMovies(movies, categorySelector);
}

const getMoviesBySearch = async ( query ) => {
  const { data } = await api('/search/movie', {
    params: { query }
  })
  const movies = data.results

  createMovies(movies, searchSelector);
}

const getMovieById = async ( id ) => {
  const { data: movie } = await api(`/movie/${ id }`)

  headerSelector.innerHTML = ''
  headerSelector.style.background = `
  linear-gradient(to right, hsla(226, 77%, 28%, 0.48), hsla(226, 68%, 57%, 0.549)),
  url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`
  headerSelector.style.backgroundSize = 'cover'
  headerSelector.style.backgroundRepeat = 'no-repeat'
  headerSelector.style.backgroundAttachment = 'fixed'

  const fragment = new DocumentFragment;
  const createHeader = createMovieHtml({
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    img_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  })
  fragment.append(createHeader);

  headerSelector.append(fragment);
  getSimilarMovies(id)
}

const getSimilarMovies = async ( id ) => {
  const { data } = await api(`/movie/${ id }/similar`);
  const movies = data.results
  console.log(movies);

  createMovies(movies, similarSelector)

}