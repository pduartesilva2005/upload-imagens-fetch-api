const clientId = 'f6a610015191966';

const gallery = document.getElementById('gallery');

const doUpload = (url, options) => {
  const promiseCallback = (resolve, reject) => {
    fetch(url, options) 
      .then(response => response.json())
      .then(resolve)
      .catch(reject)
  }

  return new Promise(promiseCallback);
}

const onSuccess = (result) => {
  const { data: { link } } = result;

  gallery.innerHTML += `<img src="${link}" alt="Link da Imagem" width="300" />`;
}

const uploadImage = (e) => {
  e.preventDefault();

  const file = document.getElementById('file');
  
  const data = new FormData();
  data.append('image', file.files[0]);

  doUpload('https://api.imgur.com/3/image', {
    method: 'POST',
    body: data,
    headers: {
      'Authorization': `Client-ID ${clientId}`
    }
  })
  .then(onSuccess)
  .catch(console.error);
}

const form = document.getElementById('upload-form');
form.addEventListener('submit', uploadImage);