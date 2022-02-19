import View from './view';

class mainView extends View {
  _parentElement = document.querySelector('.images-wrapper');

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
}

export default new mainView();
