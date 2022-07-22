import { IMovie } from './movie-data-model';

export interface ISearchResult {
  page: number;
  results: IMovie[];
}
