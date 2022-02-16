class View {
  _parentElement = document.querySelector('.images-wrapper');
  _data;
  _dataList = [];

  render(data, group) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;

    this._data = data;
    const markup = this._generateMarkup(group);

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup(group) {
    const itemCount = this._data.length / group; // 10
    for (let i = 0; i < group; i++)
      this._dataList.push(this._data.slice(i * itemCount, (i + 1) * itemCount));

    console.log(this._dataList);
    return this._dataList
      .map((data, i) => {
        const imageMarkup = this._generateImageMarkup(data);
        return `<div class="images-list">${imageMarkup}</div>`;
      })
      .join('');
  }

  _generateImageMarkup(data) {
    return data
      .map(
        (img) => `<div class="images-list">
          <div class="image-item">
            <div class="image-layer">
              <img src="${img.imageFile}" alt="">
            </div>
            <div class="image-content-layer" title="${
              img.description
                ? img.description
                : `View the photo by ` + img.userName
            }">
              <div class="top">
                <button class="image-content-button like-button" type="button">
                  <svg width="32" height="32" class="TrVF8" viewBox="0 0 32 32" version="1.1" aria-hidden="false">
                    <path
                      d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z">
                    </path>
                  </svg>
                </button>
                <button class="image-content-button collection-button" type="button">
                  <svg width="32" height="32" class="utUL6" viewBox="0 0 32 32" version="1.1" aria-hidden="false">
                    <path d="M14 3h4v26h-4zM29 14v4h-26v-4z"></path>
                  </svg>
                </button>
              </div>
              <div class="bottom">
                <div class="bottom-left">
                  <a href="">
                    <div class="user-img">
                      <img src="${img.userImage}" alt="">
                    </div>
                  </a>
                  <div class="user-desc">
                    <div class="user-name">
                      <a href="${img.userProfileLink}">${img.userName}</a>
                    </div>
                    <div class="hire-status">
                      ${
                        img.userHired
                          ? `
                      <a href="${img.userProfileLink}">Available for hire
                        <svg width="32" height="32" class="lXK9Z" viewBox="0 0 32 32" version="1.1" aria-hidden="false">
                          <path d="M16.3 3C9 3 3 9 3 16.3C3 23.6 9 29.6 16.3 29.6C23.7 29.6 29.6 23.6 29.6 16.3C29.6 9 23.7 3 16.3 3ZM13.8 22.6L8.7 17.5L10.7 15.5L13.8 18.6L21.6 10.8L23.6 12.8L13.8 22.6Z"></path>
                        </svg>   
                      </a>                        
                      `
                          : ''
                      }
                      
                    </div>
                  </div>
                </div>
                <div class="bottom-right">
                  <a class="image-content-button download-button" type="button" download title="Download photo" href="${
                    img.downloadLink
                  }">
                    <svg width="32" height="32" class="c_c7b" viewBox="0 0 32 32" version="1.1" aria-hidden="false">
                      <path d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          </div>
          `
      )
      .join('');
  }
}

export default new View();
