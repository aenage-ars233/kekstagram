const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileField = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadOverlay.querySelector('#upload-cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

function hideModal () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
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

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
