import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieDetail } from '../Api/MovieApi';
import { IGetMovieDetailModel } from '../Api/model/movie-data-model';
import Similar from './Similar';
import { makeImgePath } from './utils';
import { getTvDetail } from '../Api/TvApi';
import noPoster from '../assets/noPosterSmall.png';

interface RouteParams {
  movieId: string;
  tvId: string;
}

const Detail = () => {
  const { movieId, tvId } = useParams() as unknown as RouteParams;
  const bigMovieMatch = useMatch('/movies/:movieId');
  const bigTvMatch = useMatch('/tv/:tvId');

  // const movieId = bigMovieMatch?.params.movieId;
  // const tvId: any = bigTvMatch?.params.tvId;

  const { data: Detail, isLoading: movieDetailLoading } =
    useQuery<IGetMovieDetailModel>(
      ['movieDetail'],
      () => (movieId ? getMovieDetail(movieId) : getTvDetail(tvId)),
      {
        keepPreviousData: true,
      }
    );

  const time = Detail?.runtime;
  const hour = time && Math.floor(time / 60);
  const minutes = time && time % 60;

  // 모달을 제외한 스크린의 스크롤을 막기위한 이벤트
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <>
      {movieDetailLoading ? (
        <p>Loading</p>
      ) : (
        <Container>
          <BigCover
            style={{
              backgroundImage: Detail?.backdrop_path
                ? `linear-gradient(to top, black, transparent) , url(${makeImgePath(
                    Detail?.backdrop_path,
                    'w500'
                  )})`
                : noPoster,
            }}
          />
          <TitleTopBox>
            <BigTitle>{movieId ? Detail?.title : Detail?.name}</BigTitle>
            <TopRate>{`⭐️ ${Number(Detail?.vote_average).toFixed(
              2
            )}`}</TopRate>
          </TitleTopBox>
          <RunTime>
            <Text>
              {movieId
                ? `${hour}시간 ${minutes}분`
                : `시즌: ${Detail?.number_of_seasons}`}
            </Text>
          </RunTime>
          <BigOverview>{Detail?.overview}</BigOverview>
          <Similar />
        </Container>
      )}
    </>
  );
};

export default React.memo(Detail);

const Container = styled.div`
  height: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const TitleTopBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const TopRate = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 20px;
  top: -60px;
`;

const BigTitle = styled.h3`
  /* color: ${(props) => props.theme.white.lighter}; */
  color: white;
  padding: 20px;
  font-size: 27px;
  position: relative;
  top: -60px;
`;

const BigOverview = styled.p`
  position: relative;
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  top: -60px;
  letter-spacing: 3px;
  word-spacing: 2px;
  line-height: 1.4rem;
`;

const RunTime = styled.div`
  margin: 20px;
  padding: 5px 5px;
  position: relative;
  border-radius: 5px;
  font-weight: bold;
  top: -40px;
  display: flex;
  color: #fff;
  align-items: center;
`;

const Text = styled.span``;

const Genres = styled.ul`
  display: flex;
  margin-left: auto;
`;
const Genre = styled.li`
  margin-right: 10px;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s linear;
  list-style: none;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: white;
  }
`;
