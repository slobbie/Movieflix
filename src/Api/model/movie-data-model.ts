export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesDataModel {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface IGenres {
  id: number;
  name: string;
}
interface ICompanies {
  id: number;
  name: string;
  logo_path: string;
}

export interface IGetMovieDetailModel {
  adult: boolean;
  backdrop_path: string | any;
  genres: IGenres[];
  homepage: string;
  id: number;
  production_companies: ICompanies[];
  title: string;
  vote_average: number;
  overview: string;
  poster_path?: string;
  name: string;
  runtime: number;
  number_of_seasons: number;
}
