import { renderPictures } from './modules/pictures.js';
import './modules/upload-form.js';
import { getData } from './modules/api.js';
import { showAlert } from './modules/util.js';
import { setFilters } from './modules/filter.js';

getData((pictures) => {
  renderPictures(pictures);
  setFilters(pictures);
}, (errorMessage) => {
  showAlert(errorMessage);
});
