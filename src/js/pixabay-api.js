import axios from 'axios';

const API_KEY = '47565295-21d9cae95d17646b4d8ee5128'; // заміни на свій API ключ
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1 ) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    iziToast.error({
        title: 'error',
        message: `Помилка при завантаженні зображень:, ${error.message}`,
        timeout: 3000,
        position: 'topRight',
      });
    return null;
  }
}

