import errorImg from '../empty-state.png';
import View from './view';

class SearchView extends View {
  _parentElement = document.querySelector('.images-wrapper');
  _titleElement = document.querySelector('.search-result');
  _clearElement = document.querySelector('.main');
  _navFormEl = document.querySelector('.search-form');
  _mainFormEl = document.querySelector('.main-search-form');

  getQuery() {
    const query =
      document.querySelector('.search-input input').value ||
      document.querySelector('.main-search-input input').value;
    return query;
  }

  addHandlerSearch(handler) {
    [this._navFormEl, this._mainFormEl].forEach(function (item) {
      item.addEventListener('submit', function (e) {
        e.preventDefault();
        handler();
      });
    });
  }

  setSearchTitle(data) {
    const query = data.query;
    const title = query.slice(0, 1).toUpperCase() + query.slice(1);
    this._clearElement.innerHTML = '';
    this._titleElement.innerHTML = '';
    const markup = `
      <div class="search-word">
        <h1>${title}</h1>
        ${
          data.results.length
            ? `
          <div class="total">
          <svg width="32" height="32" class="Gdg38" viewBox="0 0 32 32" version="1.1" aria-hidden="false">
            <path
              d="M26.7 4H5.3C4.5 4 4 4.5 4 5.3v21.3c0 .9.5 1.4 1.3 1.4h21.3c.8 0 1.3-.5 1.3-1.3V5.3c.1-.8-.4-1.3-1.2-1.3zm-20 20l4.7-6 3.3 4 4.7-6 6 8H6.7z">
            </path>
          </svg>
          <p>Photos<span class="count">&nbsp;${data.imageCount}</span></p>
        </div>
        `
            : ''
        }
      </div>
    `;

    this._titleElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError() {
    this._clear();
    const markup = `
      <div class="no-result">
        <img src="${errorImg}">
      </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new SearchView();
