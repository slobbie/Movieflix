import { IMovie } from './movie-data-model';

export interface IGetTvDataModel {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
