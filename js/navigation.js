
btnTrending.addEventListener('click', () => {
  location.hash = 'trending'
})

btnSearch.addEventListener('click', () => {
  location.hash = 'search='
})

arrowSelector.addEventListener('click', () => {
  location.hash = 'home'
})



window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {

  console.log({ location });

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
}

function homePage() {
  console.log('Home');
  sectionCategory.classList.add('inactive');
  sectionCategories.classList.remove('inactive');
  sectionSimilar.classList.add('inactive');
  headerSelector.classList.remove('inactive');
  sectionTrending.classList.remove('inactive');
  sectionSearch.classList.add('inactive');
  arrowSelector.classList.add('inactive');

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
  btnTrending.classList.add('inactive');
  sectionCategories.classList.add('inactive');
  sectionSearch.classList.remove('inactive');
}



function moviePage() {
  console.log('movie')
  sectionSimilar.classList.remove('inactive');
  sectionTrending.classList.add('inactive');
  sectionCategories.classList.add('inactive');
  sectionCategory.classList.add('inactive');
}

