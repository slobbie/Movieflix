const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_API_KEY = process.env.REACT_APP_API_KEY;

export function searchAll(keyword: string | null) {
  return fetch(
    `${BASE_URL}/search/multi?api_key=${MOVIE_API_KEY}&language=ko-KR&query=${keyword}`
  ).then((response) => response.json());
}
