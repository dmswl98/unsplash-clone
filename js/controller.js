import * as model from './model';
import view from './view';

const controlImage = async function () {
  await model.loadImg(30);
  const imgList = model.state.image;
  view.render(imgList, 3);
};
controlImage();
