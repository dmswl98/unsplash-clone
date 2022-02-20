import * as model from './model';
import searchView from './searchView';
import mainView from './mainView';
import paginationView from './paginationView';

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
  const navInputContainer = document.querySelector('.search');
  const mainInputContainer = document.querySelector('.main-search');
  const navInput = document.querySelector('.search-input input');
  const mainInput = document.querySelector('.main-search-input input');
  const shortPlaceholder = 'Search photos';
  const longPlaceholder = 'Search free high-resolution photos';

  window.addEventListener(
    'resize',
    (e) => {
      if (window.innerWidth <= 992) {
        navInput.setAttribute('placeholder', shortPlaceholder);
        mainInput.setAttribute('placeholder', shortPlaceholder);
      } else {
        navInput.setAttribute('placeholder', longPlaceholder);
        mainInput.setAttribute('placeholder', longPlaceholder);
      }
    },
    true
  );

  [navInput, mainInput].forEach((item) => {
    item.addEventListener('focus', function () {
      if (item === navInput) navInputContainer.classList.toggle('focus');
      if (item === mainInput) mainInputContainer.classList.toggle('focus');
    });
  });

  [navInput, mainInput].forEach((item) => {
    item.addEventListener('focusout', function () {
      if (item === navInput) navInputContainer.classList.toggle('focus');
      if (item === mainInput) mainInputContainer.classList.toggle('focus');
    });
  });
};

const controlSearch = async function () {
  try {
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;

    await model.loadSearchResults(query);

    searchView.setSearchTitle(model.state.search);

    const imgList = model.state.search.results;

    // No results
    if (!imgList.length) {
      searchView.renderError();
      paginationView.renderError();
      return;
    }

    searchView.render(imgList, 3);
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = async function (goToPage) {
  // Move to top
  scrollTo(0, 0);

  await model.loadSearchResults(model.state.search.query, goToPage);
  model.setCurrentPage(goToPage);

  const imgList = model.state.search.results;
  searchView.render(imgList, 3);
  paginationView.render(model.state.search);
};

const init = function () {
  // Image load
  controlImage();
  controlInputStyle();
  // Show search results
  searchView.addHandlerSearch(controlSearch);
  // pagination for search results
  paginationView.addHandlerClick(controlPagination);
};
init();
