import { getPictures } from './modules/data.js';
import { renderPictures } from './modules/pictures.js';
import './modules/upload-form.js';

renderPictures(getPictures());

