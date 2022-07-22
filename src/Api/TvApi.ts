const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_API_KEY = process.env.REACT_APP_API_KEY;

export const getTvDetail = (tvId: string) => {
  return fetch(
    `${BASE_URL}/tv/${tvId}?api_key=${MOVIE_API_KEY}&language=ko-KR`
  ).then((response) => response.json());
};

export const getTv = () => {
  return fetch(
    `${BASE_URL}/tv/airing_today?api_key=${MOVIE_API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
};
export const getPopularTv = () => {
  return fetch(
    `${BASE_URL}/tv/popular?api_key=${MOVIE_API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
};
export const getTopRatedTv = () => {
  return fetch(
    `${BASE_URL}/tv/top_rated?api_key=${MOVIE_API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
};

export const getTvTrailer = (tvId?: string) => {
  return fetch(`${BASE_URL}/tv/${tvId}/videos?api_key=${MOVIE_API_KEY}`).then(
    (response) => response.json()
  );
};
