const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

function renderPictureDetails ({url, likes, description}) {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
}

function createComment ({name, avatar, message}) {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
}

const COMMENTS_PER_POTION = 5;
let commentsShown = 0;
let commentaries = [];

function renderComments (comments) {
  commentsShown += COMMENTS_PER_POTION;
  const fragment = document.createDocumentFragment();

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
}

function hideBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
}

function onEscKeyDown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

function showBigPicture (data) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  commentaries = data.comments;

  renderPictureDetails(data);
  renderComments(commentaries);
}

commentsLoader.addEventListener('click', () => {
  renderComments(commentaries);
});

cancelButton.addEventListener('click', () => {
  hideBigPicture();
});

export { showBigPicture };
