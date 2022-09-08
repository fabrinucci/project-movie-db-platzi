
btnTrending.addEventListener('click', () => {
  location.hash = 'trending'
})

btnSearch.addEventListener('click', () => {
  location.hash = `search=${ inputSearch.value.trim() }`
})

arrowSelector.addEventListener('click', () => {
  location.hash = window.history.back();
})



window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {

  if( location.hash.startsWith('#trending') ) {
    trendingPage();
  } else if( location.hash.startsWith('#search=') ) {
    searchPage();
  } else if(location.hash.startsWith('#movie=') ) {
    moviePage();
  } else if(location.hash.startsWith('#category=') ) {
    categoryPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0

}

function homePage() {
  console.log('Home');
  sectionCategory.classList.add('inactive');
  sectionCategories.classList.remove('inactive');
  sectionSimilar.classList.add('inactive');
  sectionTrending.classList.remove('inactive');
  sectionSearch.classList.add('inactive');
  arrowSelector.classList.add('inactive');
  headerSelector.classList.add('inactive');
  btnTrending.classList.remove('inactive');

  headerSelector.style.background = '';

  getTrending();
  getCategory();
}

function categoryPage() {
  console.log('category')

  headerSelector.classList.add('inactive');
  sectionCategory.classList.remove('inactive');
  sectionCategories.classList.remove('inactive');
  sectionTrending.classList.add('inactive');
  arrowSelector.classList.remove('inactive');
  sectionSimilar.classList.add('inactive');
  sectionSearch.classList.add('inactive');
  
  const [ _ , categoryData] = location.hash.split('='); // 'category=27-horror'
  const [categoryId, categoryName] = categoryData.split('-');

  categoryTitle.textContent = categoryName;

  getMoviesByCategory(categoryId);

}

function trendingPage() {
  console.log('Trending!');
  
  headerSelector.classList.add('inactive');
  sectionCategory.classList.add('inactive');
  sectionTrending.classList.remove('inactive');
  arrowSelector.classList.remove('inactive');
  sectionSimilar.classList.add('inactive');
  btnTrending.classList.add('inactive');
  sectionCategories.classList.add('inactive');
  sectionSearch.classList.add('inactive');
}

function searchPage() {
  console.log('Search:');
  headerSelector.classList.add('inactive');
  sectionCategory.classList.add('inactive');
  sectionTrending.classList.add('inactive');
  arrowSelector.classList.remove('inactive');
  sectionSimilar.classList.add('inactive');
  sectionCategories.classList.remove('inactive');
  sectionSearch.classList.remove('inactive');

  const [, searchValue ] = location.hash.split('=');
  textSearch.textContent = `Results for "${searchValue}"`

  getMoviesBySearch( searchValue )

}



function moviePage() {
  console.log('movie')
  sectionSimilar.classList.remove('inactive');
  sectionTrending.classList.add('inactive');
  sectionCategories.classList.add('inactive');
  sectionCategory.classList.add('inactive');
  sectionSearch.classList.add('inactive');
  headerSelector.classList.remove('inactive');

  const [, movieId] = location.hash.split('=');

  getMovieById(movieId)
}

