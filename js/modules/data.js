import {getRandomPositiveInteger, getRandomArrayElement } from './util.js';

const descriptions = [
  'Летний чил на югах. #тай #отдых #лето #чил',
  'Тестим новую камеру. #camera #test #new #newcameratest',
  'Как же круто тут кормят! #food #foodgram #instafood',
  'Отдыхаем... #chill #relax',
  'Вот это тачка! #wow #car'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Артём', 'Николай', 'Светлана', 'Иван', 'Александр', 'Анна', 'Илья', 'Василий'];

function getComment (_, currentCommentIndex) {
  return {
    id: currentCommentIndex + 1,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  };
}

function createPicture (_, currentPictureIndex) {
  return {
    id: currentPictureIndex + 1,
    url: `photos/${currentPictureIndex + 1}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length: 10}, getComment)
  };
}

function getPictures () {
  return Array.from({length: 25}, createPicture);
}

getPictures();

export { getPictures };
