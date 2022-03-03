const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_API_KEY = process.env.REACT_APP_API_KEY;

export const getMovies = () => {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${MOVIE_API_KEY}`).then(
    (res) => res.json()
  );
};
