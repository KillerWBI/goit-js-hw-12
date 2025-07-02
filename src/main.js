import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import { clearGallery, createGallery, hideEndOfGallery, hideLoader, showEndOfGallery, showLoader } from './js/render-functions.js';

const form = document.querySelector('.form');
const searchInput = document.querySelector('input[name="search-text"]');
let page = 1;
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loaderContainer');
const loaderGallery = document.querySelector('.loaderContainerMoreGallery');
let totalHits = 0;
let queryhist = '';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  page = 1;
  queryhist = '';
  clearGallery();
  hideEndOfGallery();
  showLoader(loader);
  const query = searchInput.value.trim();
  if (!query)  {
    hideLoader();
    iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search term!',
        timeout: 3000,
        position: 'topRight',
      });
      return;
  }

  getImagesByQuery(query, page).then(data => {
    if (data && data.hits && data.hits.length > 0) {
      createGallery(data.hits);
      queryhist = query;
      totalHits = data.totalHits;
      if( totalHits > 15) {
        showEndOfGallery();
      }
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images found. Try again!',
        timeout: 3000,
        position: 'topRight',
      });;
    }
  })
  .catch(error => {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${error.message}`,
      timeout: 3000,
      position: 'topRight',
    });
  })
  .finally(() => {
    hideLoader(loader);
    searchInput.value = '';
  }   )
});


loadMoreButton.addEventListener('click', () => {
  page += 1;
  showLoader(loaderGallery);
  hideEndOfGallery();

  getImagesByQuery(queryhist, page).then(data => {
    if (data && data.hits && data.hits.length > 0) {
      createGallery(data.hits);
      if (data.totalHits > page * 15 || data.totalHits <= page * 15) {
        showEndOfGallery();
      }
      if (data.totalHits <= page * 15) {
        iziToast.info({
          title: 'Info',
          message: 'You have reached the end of the gallery.',
          timeout: 3000,
          position: 'topRight',
        });
      }
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images found. Try again!',
        timeout: 3000,
        position: 'topRight',
      });;
    }
  })
  .catch(error => {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${error.message}`,
      timeout: 3000,
      position: 'topRight',
    });
  })
  .finally(() => {
    hideLoader(loaderGallery);
  });
});
