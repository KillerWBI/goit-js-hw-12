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
let AlltotalHits = 0;
let queryhist = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  totalHits = 0;
  AlltotalHits = 0;
  page = 1;
  queryhist = '';
  clearGallery();
  hideEndOfGallery();
  showLoader(loader);

  const query = searchInput.value.trim();
  if (!query) {
    hideLoader(loader);
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      timeout: 3000,
      position: 'topRight',
    });
    return;
  }

  try {
    const data = await getImagesByQuery(query, page);
    totalHits += data.hits.length;
    AlltotalHits = data.totalHits;
;
    if (data && data.hits && data.hits.length > 0) {
      createGallery(data.hits);
      queryhist = query;
      if (AlltotalHits > totalHits) {
        showEndOfGallery();
      }
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images found. Try again!',
        timeout: 3000,
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${error.message}`,
      timeout: 3000,
      position: 'topRight',
    });
  } finally {
    hideLoader(loader);
    searchInput.value = '';
  }
});


loadMoreButton.addEventListener('click', async () => {
  page += 1;
  showLoader(loaderGallery);
  hideEndOfGallery();

  try {
    const data = await getImagesByQuery(queryhist, page);
    if (data && data.hits && data.hits.length > 0) {
      createGallery(data.hits);
      totalHits += data.hits.length;
      const lastimage = document.querySelector('.gallery').lastElementChild;
      lastimage.scrollIntoView({ behavior: 'smooth', block: 'start'});
      if (totalHits >= AlltotalHits || data.hits.length < 15) {
        iziToast.info({
          title: 'Info',
          message: 'You have reached the end of the gallery.',
          timeout: 3000,
          position: 'topRight',
        });
        return;
      }

      showEndOfGallery();
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images found. Try again!',
        timeout: 3000,
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${error.message}`,
      timeout: 3000,
      position: 'topRight',
    });
  } finally {
    hideLoader(loaderGallery);
  }
});
