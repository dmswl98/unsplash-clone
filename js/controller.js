import * as model from './model';
import searchView from './searchView';
import mainView from './mainView';
import paginationView from './paginationView';

// if (module.hot) {
//   module.hot.accept();
// }

const controlImage = async function () {
  await model.loadImg(30);
  const imgList = model.state.image;
  mainView.render(imgList, 3);
};

const controlScroll = function () {
  const navigation = document.querySelector('.gnb-nav-right');
  const scrollLeftBtn = document.querySelector('.scroll-btn-left');
  const scrollRightBtn = document.querySelector('.scroll-btn-right');

  const left = navigation.scrollLeft;

  // scrollLeftBtn.addEventListener('click', function () {
  //   navigation.scrollLeft(left + 100);
  // });

  navigation.addEventListener('scroll', function (e) {
    console.log(e);
  });
};

const controlInputStyle = function () {
  const inputContainer = document.querySelector('.search');
  const input = document.querySelector('.search-input input');
  input.addEventListener('focus', function (e) {
    inputContainer.style.backgroundColor = '#fff';
    inputContainer.style.borderColor = '#d1d1d1';
  });

  input.addEventListener('focusout', function (e) {
    inputContainer.style.backgroundColor = '#eee';
    inputContainer.style.borderColor = '#fff';
  });
};

const controlSearch = async function () {
  try {
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;

    await model.loadSearchResults(query);

    const imgList = model.state.search.results;
    searchView.setSearchTitle(model.state.search);
    searchView.render(imgList, 3);

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = async function (goToPage) {
  await model.loadSearchResults(model.state.search.query, goToPage);
  model.setCurrentPage(goToPage);

  const imgList = model.state.search.results;
  searchView.render(imgList, 3);
  paginationView.render(model.state.search);
};

const init = function () {
  window.addEventListener('load', controlImage);
  controlInputStyle();
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};
init();
