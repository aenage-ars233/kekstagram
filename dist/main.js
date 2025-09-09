/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_pictures_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/pictures.js */ \"./js/modules/pictures.js\");\n/* harmony import */ var _modules_upload_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/upload-form.js */ \"./js/modules/upload-form.js\");\n/* harmony import */ var _modules_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/api.js */ \"./js/modules/api.js\");\n/* harmony import */ var _modules_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/util.js */ \"./js/modules/util.js\");\n/* harmony import */ var _modules_filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/filter.js */ \"./js/modules/filter.js\");\n\n\n\n\n\n\n(0,_modules_api_js__WEBPACK_IMPORTED_MODULE_2__.getData)((pictures) => {\n  (0,_modules_pictures_js__WEBPACK_IMPORTED_MODULE_0__.renderPictures)(pictures);\n  (0,_modules_filter_js__WEBPACK_IMPORTED_MODULE_4__.setFilters)(pictures);\n}, (errorMessage) => {\n  (0,_modules_util_js__WEBPACK_IMPORTED_MODULE_3__.showAlert)(errorMessage);\n});\n\n\n//# sourceURL=webpack://kekstagram/./js/main.js?\n}");

/***/ }),

/***/ "./js/modules/api.js":
/*!***************************!*\
  !*** ./js/modules/api.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getData: () => (/* binding */ getData),\n/* harmony export */   sendData: () => (/* binding */ sendData)\n/* harmony export */ });\nfunction getData(onSuccess, onError) {\n  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')\n    .then((responce) => {\n      if (responce.ok) {\n        return responce;\n      }\n      onError('Не удалось загрузить картинки! Попробуйте перезагрузить!');\n    })\n    .then((responce) => responce.json())\n    .then((pictures) => {\n      onSuccess(pictures);\n    })\n    .catch(() => {\n      onError('Не удалось загрузить картинки! Попробуйте перезагрузить!');\n    });\n}\n\nfunction sendData(onSuccess, onError, data) {\n  fetch('https://25.javascript.htmlacademy.pro/kekstagram', {\n    method: 'POST',\n    body: data,\n  }\n  ).then((responce) => {\n    if (responce.ok) {\n      onSuccess();\n    } else {\n      onError();\n    }\n  }).catch(() => {\n    onError();\n  });\n}\n\n\n\n\n//# sourceURL=webpack://kekstagram/./js/modules/api.js?\n}");

/***/ }),

/***/ "./js/modules/big-picture.js":
/*!***********************************!*\
  !*** ./js/modules/big-picture.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showBigPicture: () => (/* binding */ showBigPicture)\n/* harmony export */ });\nconst bigPicture = document.querySelector('.big-picture');\nconst body = document.body;\nconst commentCount = document.querySelector('.social__comment-count');\nconst commentsLoader = document.querySelector('.comments-loader');\nconst commentList = document.querySelector('.social__comments');\nconst cancelButton = bigPicture.querySelector('.big-picture__cancel');\n\nfunction renderPictureDetails ({url, likes, description}) {\n  bigPicture.querySelector('.big-picture__img img').src = url;\n  bigPicture.querySelector('.big-picture__img img').alt = description;\n  bigPicture.querySelector('.likes-count').textContent = likes;\n  bigPicture.querySelector('.social__caption').textContent = description;\n}\n\nfunction createComment ({name, avatar, message}) {\n  const comment = document.createElement('li');\n  comment.innerHTML = '<img class=\"social__picture\" src=\"\" alt=\"\" width=\"35\" height=\"35\"><p class=\"social__text\"></p>';\n  comment.classList.add('social__comment');\n\n  comment.querySelector('.social__picture').src = avatar;\n  comment.querySelector('.social__picture').alt = name;\n  comment.querySelector('.social__text').textContent = message;\n\n  return comment;\n}\n\nconst COMMENTS_PER_POTION = 5;\nlet commentsShown = 0;\nlet commentaries = [];\n\nfunction renderComments (comments) {\n  commentsShown += COMMENTS_PER_POTION;\n  const fragment = document.createDocumentFragment();\n\n  if (commentsShown >= comments.length) {\n    commentsLoader.classList.add('hidden');\n    commentsShown = comments.length;\n  } else {\n    commentsLoader.classList.remove('hidden');\n  }\n\n  for (let i = 0; i < commentsShown; i++) {\n    const commentElement = createComment(comments[i]);\n    fragment.append(commentElement);\n  }\n\n  commentList.innerHTML = '';\n  commentList.append(fragment);\n  commentCount.innerHTML = `${commentsShown} из <span class=\"comments-count\">${comments.length}</span> комментариев`;\n}\n\nfunction hideBigPicture () {\n  bigPicture.classList.add('hidden');\n  body.classList.remove('modal-open');\n  document.removeEventListener('keydown', onEscKeyDown);\n}\n\nfunction onEscKeyDown (evt) {\n  if (evt.key === 'Escape') {\n    evt.preventDefault();\n    hideBigPicture();\n  }\n}\n\nfunction showBigPicture (data) {\n  bigPicture.classList.remove('hidden');\n  body.classList.add('modal-open');\n  document.addEventListener('keydown', onEscKeyDown);\n  commentaries = data.comments;\n\n  renderPictureDetails(data);\n  renderComments(commentaries);\n}\n\ncommentsLoader.addEventListener('click', () => {\n  renderComments(commentaries);\n});\n\ncancelButton.addEventListener('click', () => {\n  hideBigPicture();\n});\n\n\n\n\n//# sourceURL=webpack://kekstagram/./js/modules/big-picture.js?\n}");

/***/ }),

/***/ "./js/modules/effect.js":
/*!******************************!*\
  !*** ./js/modules/effect.js ***!
  \******************************/
/***/ (() => {

eval("{const image = document.querySelector('.img-upload__preview img');\nconst form = document.querySelector('.img-upload__form');\nconst sliderElement = document.querySelector('.effect-level__slider');\nconst effectLevel = document.querySelector('.effect-level__value');\n\nconst EFFECTS = [\n  {\n    name: 'none',\n    min: 0,\n    max: 100,\n    step: 1\n  },\n  {\n    name: 'chrome',\n    style: 'grayscale',\n    min: 0,\n    max: 1,\n    step: 0.1,\n    unit: ''\n  },\n  {\n    name: 'sepia',\n    style: 'sepia',\n    min: 0,\n    max: 1,\n    step: 0.1,\n    unit: ''\n  },\n  {\n    name: 'marvin',\n    style: 'invert',\n    min: 0,\n    max: 100,\n    step: 1,\n    unit: '%'\n  },\n  {\n    name: 'phobos',\n    style: 'blur',\n    min: 0,\n    max: 3,\n    step: 0.1,\n    unit: 'px'\n  },\n  {\n    name: 'heat',\n    style: 'brightness',\n    min: 0,\n    max: 3,\n    step: 0.1,\n    unit: ''\n  },\n];\nconst DEFAULT_EFFECT = EFFECTS[0];\nlet chosenEffect = DEFAULT_EFFECT;\n\nnoUiSlider.create(sliderElement, {\n  range: {\n    min: DEFAULT_EFFECT.min,\n    max: DEFAULT_EFFECT.max\n  },\n  start: DEFAULT_EFFECT.max,\n  step: DEFAULT_EFFECT.step,\n  connect: 'lower'\n});\n\nfunction updateSlider() {\n  sliderElement.classList.remove('hidden');\n  sliderElement.noUiSlider.updateOptions({\n    range: {\n      min: chosenEffect.min,\n      max: chosenEffect.max\n    },\n    step: chosenEffect.step,\n    start: chosenEffect.max\n  });\n\n  if (chosenEffect === DEFAULT_EFFECT) {\n    sliderElement.classList.add('hidden');\n  }\n}\nupdateSlider();\n\nform.addEventListener('change', (evt) => {\n  if (!evt.target.classList.contains('effects__radio')) {\n    return;\n  }\n  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);\n  updateSlider();\n});\n\nsliderElement.noUiSlider.on('update', () => {\n  image.style.filter = 'none';\n  image.className = '';\n  effectLevel.value = '';\n  if (chosenEffect === DEFAULT_EFFECT) {\n    return;\n  }\n\n  const sliderValue = sliderElement.noUiSlider.get();\n  image.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;\n  image.classList.add(`effects__preview--${chosenEffect.name}`);\n  effectLevel.value = sliderValue;\n});\n\n\n//# sourceURL=webpack://kekstagram/./js/modules/effect.js?\n}");

/***/ }),

/***/ "./js/modules/filter.js":
/*!******************************!*\
  !*** ./js/modules/filter.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setFilters: () => (/* binding */ setFilters)\n/* harmony export */ });\n/* harmony import */ var _pictures_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pictures.js */ \"./js/modules/pictures.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./js/modules/util.js\");\n\n\n\nconst filtersElement = document.querySelector('.img-filters');\nlet activeFilter = document.querySelector('.img-filters__button--active');\n\nfunction getPictureLikes(picture) {\n  return picture.likes;\n}\n\nfunction comparePictures(pictureA, pictureB) {\n  const likesA = getPictureLikes(pictureA);\n  const likesB = getPictureLikes(pictureB);\n\n  return likesB - likesA;\n}\n\n/* Фильтры */\n\nfunction filterDefault(pictures) {\n  (0,_pictures_js__WEBPACK_IMPORTED_MODULE_0__.renderPictures)(pictures);\n}\n\nfunction filterRandom(pictures) {\n  const filterPictures = [];\n  for (let i = 0; i < 10; i++) {\n    const pictureElement = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(pictures);\n    if (filterPictures.includes(pictureElement)) {\n      i--;\n      continue;\n    } else {\n      filterPictures.push(pictureElement);\n    }\n  }\n  (0,_pictures_js__WEBPACK_IMPORTED_MODULE_0__.renderPictures)(filterPictures);\n}\n\nfunction filterDiscussed(pictures) {\n  const filterPictures = pictures.slice().sort(comparePictures);\n  (0,_pictures_js__WEBPACK_IMPORTED_MODULE_0__.renderPictures)(filterPictures);\n}\n\nfunction setFilters(pictures) {\n  let timeoutId;\n  filtersElement.classList.remove('img-filters--inactive');\n  filtersElement.addEventListener('click', (evt) => {\n    if (evt.target.classList.contains('img-filters__button')) {\n      activeFilter.classList.remove('img-filters__button--active');\n      evt.target.classList.add('img-filters__button--active');\n      activeFilter = evt.target;\n\n      clearTimeout(timeoutId);\n\n      const toFilter = () => {\n        if (activeFilter.id === 'filter-default') {\n          filterDefault(pictures);\n        }\n        if (activeFilter.id === 'filter-random') {\n          filterRandom(pictures);\n        }\n        if (activeFilter.id === 'filter-discussed') {\n          filterDiscussed(pictures);\n        }\n      };\n\n      timeoutId = setTimeout(toFilter, 500);\n    }\n  });\n}\n\n\n\n\n//# sourceURL=webpack://kekstagram/./js/modules/filter.js?\n}");

/***/ }),

/***/ "./js/modules/pictures.js":
/*!********************************!*\
  !*** ./js/modules/pictures.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderPictures: () => (/* binding */ renderPictures)\n/* harmony export */ });\n/* harmony import */ var _big_picture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./big-picture.js */ \"./js/modules/big-picture.js\");\n\n\nconst pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');\nconst container = document.querySelector('.pictures');\n\nfunction createPicture (data) {\n  const { comments, description, likes, url } = data;\n  const picture = pictureTemplate.cloneNode(true);\n\n  picture.querySelector('.picture__img').src = url;\n  picture.querySelector('.picture__img').alt = description;\n  picture.querySelector('.picture__likes').textContent = likes;\n  picture.querySelector('.picture__comments').textContent = comments.length;\n\n  picture.addEventListener('click', () => {\n    (0,_big_picture_js__WEBPACK_IMPORTED_MODULE_0__.showBigPicture)(data);\n  });\n\n  return picture;\n}\n\nfunction renderPictures (pictures) {\n  container.querySelectorAll('.picture').forEach((element) => {element.remove();});\n  const fragment = document.createDocumentFragment();\n  pictures.forEach((picture) => {\n    const pictureElement = createPicture(picture);\n    fragment.append(pictureElement);\n  });\n\n  container.append(fragment);\n}\n\n\n\n\n//# sourceURL=webpack://kekstagram/./js/modules/pictures.js?\n}");

/***/ }),

/***/ "./js/modules/preview.js":
/*!*******************************!*\
  !*** ./js/modules/preview.js ***!
  \*******************************/
/***/ (() => {

eval("{const fileChooser = document.querySelector('#upload-file');\nconst preview = document.querySelector('.img-upload__preview img');\n\nconst FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];\n\nfileChooser.addEventListener('change', () => {\n  const file = fileChooser.files[0];\n  const fileName = file.name.toLowerCase();\n\n  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));\n\n  if (matches) {\n    preview.src = URL.createObjectURL(file);\n  }\n});\n\n\n//# sourceURL=webpack://kekstagram/./js/modules/preview.js?\n}");

/***/ }),

/***/ "./js/modules/scale.js":
/*!*****************************!*\
  !*** ./js/modules/scale.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   resetScale: () => (/* binding */ resetScale)\n/* harmony export */ });\nconst image = document.querySelector('.img-upload__preview img');\nconst scaleInput = document.querySelector('.scale__control--value');\nconst smallerButton = document.querySelector('.scale__control--smaller');\nconst biggerButton = document.querySelector('.scale__control--bigger');\n\nconst DEFAULT_SCALE = 100;\nconst SCALE_STEP = 25;\nconst MAX_SCALE = 100;\nconst MIN_SCALE = 25;\n\nfunction scaleImage(value = DEFAULT_SCALE) {\n  image.style.transform = `scale(${value / 100})`;\n  scaleInput.value = `${value}%`;\n}\nscaleImage();\n\nfunction onSmallerButtonClick() {\n  const currentValue = parseInt(scaleInput.value, 10);\n  let newValue = currentValue - SCALE_STEP;\n  if (newValue < MIN_SCALE) {\n    newValue = MIN_SCALE;\n  }\n  scaleImage(newValue);\n}\n\nfunction onBiggerButtonClick() {\n  const currentValue = parseInt(scaleInput.value, 10);\n  let newValue = currentValue + SCALE_STEP;\n  if (newValue > MAX_SCALE) {\n    newValue = MAX_SCALE;\n  }\n  scaleImage(newValue);\n}\n\nsmallerButton.addEventListener('click', onSmallerButtonClick);\nbiggerButton.addEventListener('click', onBiggerButtonClick);\n\nfunction resetScale() {\n  scaleImage(DEFAULT_SCALE);\n}\n\n\n\n\n//# sourceURL=webpack://kekstagram/./js/modules/scale.js?\n}");

/***/ }),

/***/ "./js/modules/upload-form.js":
/*!***********************************!*\
  !*** ./js/modules/upload-form.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _preview_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./preview.js */ \"./js/modules/preview.js\");\n/* harmony import */ var _preview_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_preview_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scale_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scale.js */ \"./js/modules/scale.js\");\n/* harmony import */ var _effect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./effect.js */ \"./js/modules/effect.js\");\n/* harmony import */ var _effect_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_effect_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api.js */ \"./js/modules/api.js\");\n\n\n\n\n\nconst body = document.body;\nconst uploadForm = document.querySelector('.img-upload__form');\nconst uploadFileField = uploadForm.querySelector('#upload-file');\nconst uploadOverlay = uploadForm.querySelector('.img-upload__overlay');\nconst submitButton = uploadForm.querySelector('#upload-submit');\nconst cancelButton = uploadOverlay.querySelector('#upload-cancel');\nconst hashtagField = uploadForm.querySelector('.text__hashtags');\nconst commentField = uploadForm.querySelector('.text__description');\nconst successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);\nconst errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);\n\nconst pristine = new Pristine(uploadForm, {\n  classTo: 'img-upload__element',\n  errorTextParent: 'img-upload__element',\n  errorTextClass: 'img-upload__error',\n});\n\nfunction hideModal () {\n  uploadOverlay.classList.add('hidden');\n  body.classList.remove('modal-open');\n  uploadForm.reset();\n  (0,_scale_js__WEBPACK_IMPORTED_MODULE_1__.resetScale)();\n  cancelButton.removeEventListener('click', hideModal);\n  submitButton.disabled = false;\n  document.removeEventListener('keydown', onEscHideModal);\n}\n\nfunction checkFieldsFocus () {\n  return document.activeElement === hashtagField || document.activeElement === commentField;\n}\n\nfunction onEscHideModal (evt) {\n  if (evt.key === 'Escape' && !checkFieldsFocus()) {\n    evt.preventDefault();\n    hideModal();\n  }\n}\n\nfunction showModal () {\n  uploadOverlay.classList.remove('hidden');\n  body.classList.add('modal-open');\n  cancelButton.addEventListener('click', hideModal);\n  document.addEventListener('keydown', onEscHideModal);\n  (0,_scale_js__WEBPACK_IMPORTED_MODULE_1__.resetScale)();\n}\n\nuploadFileField.addEventListener('change', () => {\n  showModal();\n});\n\n// Валидация формы\n\nconst MAX_HASHTAG_COUNT = 5;\nconst MIN_HASHTAG_LENGTH = 2;\nconst MAX_HASHTAG_LENGTH = 20;\nconst UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;\n\nfunction startsWithHash (string) {\n  return string[0] === '#';\n}\n\nfunction hasValidLength (string) {\n  return string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;\n}\n\nfunction hasValidSymbols (string) {\n  return !UNVALID_SYMBOLS.test(string.slice(1));\n}\n\nfunction isValidTag (tag) {\n  return startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);\n}\n\nfunction hasValidCount (tags) {\n  return tags.length <= MAX_HASHTAG_COUNT;\n}\n\nfunction hasSimilarTags(tags) {\n  return tags.length > new Set(tags).size;\n}\n\nfunction validateTags (value) {\n  const tags = value.trim().toLowerCase().split(' ').filter((tag) => tag.trim().length);\n  return hasValidCount(tags) && tags.every(isValidTag) && !hasSimilarTags(tags);\n}\n\npristine.addValidator(hashtagField, validateTags, 'Неправильно заполнены хэштеги!');\n\nfunction onSuccessSubmit() {\n  hideModal();\n  submitButton.disabled = false;\n  document.body.append(successTemplate);\n  const successTemplateButton = successTemplate.querySelector('.success__button');\n  successTemplateButton.addEventListener('click', () => {\n    successTemplate.remove();\n  }, {once: true});\n  document.addEventListener('keydown', (evt) => {\n    if (evt.key === 'Escape') {\n      evt.preventDefault();\n      successTemplate.remove();\n    }\n  }, {once: true});\n}\n\nfunction onErrorSubmit() {\n  hideModal();\n  submitButton.disabled = false;\n  document.body.append(errorTemplate);\n  const errorTemplateButton = errorTemplate.querySelector('.error__button');\n  errorTemplateButton.addEventListener('click', () => {\n    errorTemplate.remove();\n  }, {once: true});\n  document.addEventListener('keydown', (evt) => {\n    if (evt.key === 'Escape') {\n      evt.preventDefault();\n      errorTemplate.remove();\n    }\n  }, {once: true});\n}\n\nuploadForm.addEventListener('submit', (evt) => {\n  evt.preventDefault();\n  if (pristine.validate()) {\n    submitButton.disabled = true;\n    const formData = new FormData(uploadForm);\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_3__.sendData)(onSuccessSubmit, onErrorSubmit, formData);\n  }\n});\n\n\n//# sourceURL=webpack://kekstagram/./js/modules/upload-form.js?\n}");

/***/ }),

/***/ "./js/modules/util.js":
/*!****************************!*\
  !*** ./js/modules/util.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkStringLength: () => (/* binding */ checkStringLength),\n/* harmony export */   getRandomArrayElement: () => (/* binding */ getRandomArrayElement),\n/* harmony export */   getRandomPositiveInteger: () => (/* binding */ getRandomPositiveInteger),\n/* harmony export */   showAlert: () => (/* binding */ showAlert)\n/* harmony export */ });\nfunction getRandomPositiveInteger (a, b) {\n  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));\n  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));\n  const result = Math.random() * (upper - lower + 1) + lower;\n\n  return Math.floor(result);\n}\n\nfunction getRandomArrayElement (elements) {\n  return elements[getRandomPositiveInteger(0, elements.length - 1)];\n}\n\nfunction checkStringLength (string, length) {\n  return string.length <= length;\n}\n\nfunction showAlert(message) {\n  const alertContainer = document.createElement('div');\n  alertContainer.style.zIndex = 100;\n  alertContainer.style.position = 'absolute';\n  alertContainer.style.left = 0;\n  alertContainer.style.top = 0;\n  alertContainer.style.right = 0;\n  alertContainer.style.padding = '20px 10px';\n  alertContainer.style.fontSize = '30px';\n  alertContainer.style.textAlign = 'center';\n  alertContainer.style.backgroundColor = 'red';\n\n  alertContainer.textContent = message;\n\n  document.body.append(alertContainer);\n\n  setTimeout(() => {\n    alertContainer.remove();\n  }, 5000);\n}\n\n\n\n\n//# sourceURL=webpack://kekstagram/./js/modules/util.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;