import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieDetail, getMoviesTrailer } from '../Api/MovieApi';
import {
  IGetMovieDetailModel,
  IGetMoviesTrailer,
} from '../Api/model/movie-data-model';
import Similar from './Similar';
import { makeImgePath, makeTrailerPath } from './utils';
import { getTvDetail, getTvTrailer } from '../Api/TvApi';
import noPoster from '../assets/noPosterSmall.png';
import ReactPlayer from 'react-player';
import { BsVolumeDown, BsVolumeMute } from 'react-icons/bs';

interface RouteParams {
  movieId: string;
  tvId: string;
}

const Detail = () => {
  const { movieId, tvId } = useParams() as unknown as RouteParams;
  const [volum, setVolum] = useState(false);

  const { data: TrailerData, isLoading: TrailerLoading } =
    useQuery<IGetMoviesTrailer>(
      'trailer',
      () => (movieId ? getMoviesTrailer(movieId) : getTvTrailer(tvId)),
      {
        keepPreviousData: true,
      }
    );

  const { data: Detail, isLoading: movieDetailLoading } =
    useQuery<IGetMovieDetailModel>(
      ['Detail'],
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

  const volumClick = () => setVolum((prev) => !prev);

  return (
    <>
      {movieDetailLoading ? (
        <p>Loading</p>
      ) : (
        <Container>
          {tvId && (
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
          )}
          {movieId && (
            <PlayerBox>
              <ReactPlayer
                url={makeTrailerPath(TrailerData?.results[0].key)}
                volume={volum ? 0.2 : 0}
                playing={true}
                loop={true}
                width='150%'
                height='600px'
                style={{ scale: 1.5 }}
              />
            </PlayerBox>
          )}
          <TitleTopBox>
            <BigTitle>{movieId ? Detail?.title : Detail?.name}</BigTitle>
            <TopRate>{`⭐️ ${Number(Detail?.vote_average).toFixed(
              2
            )}`}</TopRate>
          </TitleTopBox>
          <VoulumBox>
            <Voulum onClick={volumClick}>
              {volum ? (
                <BsVolumeMute className='buttonIcon' />
              ) : (
                <BsVolumeDown className='buttonIcon' />
              )}
            </Voulum>
          </VoulumBox>
          <RunTime>
            <Text>
              {movieId
                ? `${hour}시간 ${minutes}분`
                : `시즌: ${Detail?.number_of_seasons}`}
            </Text>
            <Genres>
              {movieId &&
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

const PlayerBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
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
  font-weight: bold;
  top: -40px;
  display: flex;
  color: #fff;
  align-items: center;
`;

const VoulumBox = styled.div`
  width: 100%;
  display: flex;
`;

const Voulum = styled.button`
  position: relative;
  top: -40px;
  margin-left: auto;
  margin-right: 20px;
  border: none;
  background-color: transparent;
  .buttonIcon {
    width: 30px;
    height: 30px;
  }
  .buttonIcon path {
    fill: ${(props) => props.theme.white.lighter};
  }
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
