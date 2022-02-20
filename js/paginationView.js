import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.page-btn');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const lastPage = this._data.lastPage;
    // Page 1, and there are otehr pages
    if (curPage === 1 && lastPage > 1) {
      return `
        <div class="btn-current">
          <span class="page-num">${curPage}</span>
        </div>
        <button data-goto=${curPage + 1} class="btn btn-next" type="button">
          <span class="page-num">${curPage + 1}</span>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
          </svg>
        </button>
        `;
    }
    // Last page
    if (curPage === lastPage && lastPage > 1) {
      return `
        <button data-goto=${curPage - 1} class="btn btn-prev" type="button">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
          </svg>
          <span class="page-num">${curPage - 1}</span>
        </button>
        <div class="btn-current">
          <span class="page-num">${curPage}</span>
        </div>
      `;
    }
    // Other page
    if (curPage < lastPage) {
      return `
        <button data-goto=${curPage - 1} class="btn btn-prev" type="button">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
          </svg>
          <span class="page-num">${curPage - 1}</span>
        </button>
        <div class="btn-current">
          <span class="page-num">${curPage}</span>
        </div>
        <button data-goto=${curPage + 1} class="btn btn-next" type="button">
          <span class="page-num">${curPage + 1}</span>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
          </svg>
        </button> 
      `;
    }
    // Page 1, and there are NO otehr pages
    return '';
  }

  renderError() {
    this._clear();
  }
}

export default new PaginationView();
