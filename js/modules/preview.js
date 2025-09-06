const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');

const FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
