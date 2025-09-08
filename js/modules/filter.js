import { renderPictures } from './pictures.js';
import { getRandomArrayElement } from './util.js';

const filtersElement = document.querySelector('.img-filters');
let activeFilter = document.querySelector('.img-filters__button--active');

function getPictureLikes(picture) {
  return picture.likes;
}

function comparePictures(pictureA, pictureB) {
  const likesA = getPictureLikes(pictureA);
  const likesB = getPictureLikes(pictureB);

  return likesB - likesA;
}

/* Фильтры */

function filterDefault(pictures) {
  renderPictures(pictures);
}

function filterRandom(pictures) {
  const filterPictures = [];
  for (let i = 0; i < 10; i++) {
    const pictureElement = getRandomArrayElement(pictures);
    if (filterPictures.includes(pictureElement)) {
      i--;
      continue;
    } else {
      filterPictures.push(pictureElement);
    }
  }
  renderPictures(filterPictures);
}

function filterDiscussed(pictures) {
  const filterPictures = pictures.slice().sort(comparePictures);
  renderPictures(filterPictures);
}

function setFilters(pictures) {
  let timeoutId;
  filtersElement.classList.remove('img-filters--inactive');
  filtersElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      activeFilter.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      activeFilter = evt.target;

      clearTimeout(timeoutId);

      const toFilter = () => {
        if (activeFilter.id === 'filter-default') {
          filterDefault(pictures);
        }
        if (activeFilter.id === 'filter-random') {
          filterRandom(pictures);
        }
        if (activeFilter.id === 'filter-discussed') {
          filterDiscussed(pictures);
        }
      };

      timeoutId = setTimeout(toFilter, 500);
    }
  });
}

export {setFilters};
