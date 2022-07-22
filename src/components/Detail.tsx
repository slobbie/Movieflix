import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import React from 'react';
import { useQuery } from 'react-query';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieDetail, getTvDetail } from '../Api/Api';
import { IGetMovieDetailModel } from '../Api/model/movie-data-model';
import Similar from './Similar';
import { makeImgePath } from './utils';

const Detail = () => {
  const Navigate = useNavigate();

  const bigMovieMatch = useMatch('/movies/:movieId');
  const bigTvMatch = useMatch('/movies/:tvId');

  const movieId = bigMovieMatch?.params.movieId;
  const tvId: any = bigTvMatch?.params.tvId;

  const { data: Detail, isLoading: movieDetailLoading } =
    useQuery<IGetMovieDetailModel>(
      ['movieDetail'],
      () => (movieId ? getMovieDetail(movieId) : getTvDetail(tvId)),
      {
        keepPreviousData: true,
      }
    );

  const onOverlayClick = () => {
    Navigate('/movies');
  };

  const time = Detail?.runtime;
  const hour = time && Math.floor(time / 60);
  const minutes = time && time % 60;

  return (
    <>
      {movieDetailLoading ? (
        <p>Loading</p>
      ) : (
        <Container>
          <BigCover
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent) , url(${makeImgePath(
                Detail?.backdrop_path,
                'w500'
              )})`,
            }}
          />
          <TitleTopBox>
            <BigTitle>{movieId ? Detail?.title : Detail?.name}</BigTitle>
            <TopRate>{`⭐️ ${Detail?.vote_average}`}</TopRate>
          </TitleTopBox>
          <RunTime>
            <Text>
              {movieId
                ? `${hour}시간 ${minutes}분`
                : `시즌: ${Detail?.number_of_seasons}`}
            </Text>
            <Genres>
              {Detail &&
                Detail?.genres.map((genre) => (
                  <Genre key={genre.id}>{genre.name}</Genre>
                ))}
            </Genres>
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
