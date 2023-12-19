import axios from 'axios';

const API_KEY = '40628787-b19937df0640d8f4069c69a27';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImg(page, q) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 12,
  });

  return axios
    .get(`${BASE_URL}?${searchParams}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
