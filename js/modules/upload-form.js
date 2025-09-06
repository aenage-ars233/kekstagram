import './preview.js';
import { resetScale } from './scale.js';
import './effect.js';
import { sendData } from './api.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileField = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const submitButton = uploadForm.querySelector('#upload-submit');
const cancelButton = uploadOverlay.querySelector('#upload-cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

function hideModal () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  resetScale();
  cancelButton.removeEventListener('click', hideModal);
  document.removeEventListener('keydown', onEscHideModal);
}

function checkFieldsFocus () {
  return document.activeElement === hashtagField || document.activeElement === commentField;
}

function onEscHideModal (evt) {
  if (evt.key === 'Escape' && !checkFieldsFocus()) {
    evt.preventDefault();
    hideModal();
  }
}

function showModal () {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  cancelButton.addEventListener('click', hideModal);
  document.addEventListener('keydown', onEscHideModal);
  resetScale();
}

uploadFileField.addEventListener('change', () => {
  showModal();
});

// Валидация формы

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

function startsWithHash (string) {
  return string[0] === '#';
}

function hasValidLength (string) {
  return string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;
}

function hasValidSymbols (string) {
  return !UNVALID_SYMBOLS.test(string.slice(1));
}

function isValidTag (tag) {
  return startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);
}

function hasValidCount (tags) {
  return tags.length <= MAX_HASHTAG_COUNT;
}

function validateTags (value) {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidCount(tags) && tags.every(isValidTag);
}

pristine.addValidator(hashtagField, validateTags, 'Неправильно заполнены хэштеги!');

function onSuccessSubmit() {
  hideModal();
  submitButton.disabled = false;
  document.body.append(successTemplate);
  const successTemplateButton = successTemplate.querySelector('.success__button');
  successTemplateButton.addEventListener('click', () => {
    successTemplate.remove();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successTemplate.remove();
    }
  }, {once: true});
}

function onErrorSubmit() {
  hideModal();
  submitButton.disabled = false;
  document.body.append(errorTemplate);
  const errorTemplateButton = errorTemplate.querySelector('.error__button');
  errorTemplateButton.addEventListener('click', () => {
    errorTemplate.remove();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorTemplate.remove();
    }
  }, {once: true});
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitButton.disabled = true;
  if (pristine.validate()) {
    const formData = new FormData(uploadForm);
    sendData(onSuccessSubmit, onErrorSubmit, formData);
  }
});
