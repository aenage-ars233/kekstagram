import { showBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

function createPicture (data) {
  const { comments, description, likes, url } = data;
  const picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  picture.addEventListener('click', () => {
    showBigPicture(data);
  });

  return picture;
}

function renderPictures (pictures) {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    fragment.append(pictureElement);
  });

  container.append(fragment);
}

export { renderPictures };
