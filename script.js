import { getPictureOfTheDay, getPicture, getData, getPicturesRange, getRandomPictures } from './api.js';
import { trimText } from './util.js';

const BASE_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'api_key=t6DwZgp9FbxOvDNJeqXlI8zvZmDudZRyP5vSH4Nu';

function getPictures(startDate, endDate) {
  clearGalery();
  showSpinner();

  fetch(`https://api.nasa.gov/planetary/apod?api_key=u8Z3MZ6Hcmm1zGtZYe1h3pZ1aEH9gfa0qXhBsLol&start_date=${startDate}&end_date=${endDate}`)
    .then(response => response.json())
    .then(data => {
      hideSpinner();
      displayPictures(data, 'image');
    })
    .catch(err => console.error(err));
}

function getVideos(startDate, endDate) {
  clearGalery();
  showSpinner();

  fetch(`https://api.nasa.gov/planetary/apod?api_key=u8Z3MZ6Hcmm1zGtZYe1h3pZ1aEH9gfa0qXhBsLol&start_date=${startDate}&end_date=${endDate}`)
    .then(response => response.json())
    .then(data => {
      hideSpinner();
      displayPictures(data, 'video');
    })
    .catch(err => console.error(err));
}

function showSpinner() {
  clearGalery();
  const spinnerTemplate = document.getElementById('spinner-template').content;
  const spinner = document.importNode(spinnerTemplate, true);
  document.body.appendChild(spinner);
}

function hideSpinner() {
  const spinner = document.querySelector('body > .spinner-container');
  document.body.removeChild(spinner);
}

function clearGalery() {
  const galery = document.getElementById('galeria');
  galery.innerHTML = '';
}

// getVideos('2022-07-25', '2022-08-31');
(async () => {
  const data = await getPicturesRange('2022-05-12', '2022-08-20');
  displayPictures(data, 'image');
})();

const displayPictures = (publicacion, type) => {
  console.log(publicacion);
  document.querySelector("#galeria").innerHTML = "";

  publicacion.forEach((pictureData) => {
    if (pictureData['media_type'] !== type) return;

    let div = document.createElement("div");
    if (pictureData['media_type'] == 'image') {
      div.classList.add("column", "is-3");
    } else {
      div.classList.add("column", "is-4");
    }
    div.innerHTML += `
      <div class="card is-flex is-flex-direction-column">
        <div class="card-image">
          ${
            pictureData['media_type'] == 'image'
            ? `<figure class="image is-4by3">
                <img src="${pictureData.url}" alt="Placeholder image">
              </figure>`
            : `<figure>
                <iframe src="${pictureData.url}"></iframe>
              </figure>`
          }
        </div>
        <div class="card-content is-flex-grow-1 is-flex is-flex-direction-column">
            <div class="media">
                <div class="media-content">
                <p class="title is-4"><b>${pictureData.title}</b></p>
                </div>
            </div>
          <div class="content is-flex-grow-1 is-flex is-flex-direction-column">
              <p class="my-auto">${trimText(pictureData.explanation, 50)}</p>
              <div class="my-1">
                ${
                  pictureData.copyright !== undefined
                  ? `<span class="has-text-link-dark">${pictureData.copyright} @Nasa</span>`
                  : ''
                }
                <time datetime="" class="has-text-grey">Captured: ${pictureData.date}</time>
              </div>
          </div>
        </div>
      </div> `
    document.querySelector("#galeria").append(div);
  });
}