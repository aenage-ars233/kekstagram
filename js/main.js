import { renderPictures } from './modules/pictures.js';
import './modules/upload-form.js';
import { getData } from './modules/api.js';
import { showAlert } from './modules/util.js';

getData((pictures) => {
  renderPictures(pictures);
}, (errorMessage) => {
  showAlert(errorMessage);
});
