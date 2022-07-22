import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useMatch } from 'react-router-dom';
import { IGetMoviesDataModel, IMovie } from '../Api/model/movie-data-model';
import { motion } from 'framer-motion';
import { similarMovie, similarTv } from '../Api/MovieApi';
import { makeImgePath } from './utils';
import noPoster from '../assets/noPosterSmall.png';

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -30,
    zIndex: 99,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: 'tween',
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: 'tween',
    },
  },
};

const Similar = () => {
  const bigMovieMatch = useMatch('/movies/:movieId');
  const bigTvMatch = useMatch('/tv/:tvId');

  const movieId = bigMovieMatch?.params.movieId;
  const tvId: any = bigTvMatch?.params.tvId;

  const { data: similarData, isLoading } = useQuery<IGetMoviesDataModel>(
    'similar',
    () => (movieId ? similarMovie(movieId) : similarTv(tvId))
  );

  return (
    <>
      <SimilarTitle>비슷한 콘텐츠</SimilarTitle>
      <Container>
        {isLoading
          ? 'loading,,,'
          : similarData?.results.map((movie: IMovie) => (
              <Box
                variants={boxVariants}
                initial='normal'
                whileHover='hover'
                key={movie.id}
                transition={{ type: 'tween' }}
                bgphoto={
                  movie.backdrop_path
                    ? makeImgePath(movie.backdrop_path, 'w500')
                    : noPoster
                }
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
      </Container>
    </>
  );
};

export default Similar;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: ${(props) => props.theme.black.darker};
  gap: 10px;
  padding: 20px;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  position: relative;
  &:nth-child(odd) {
    transform-origin: center left;
  }
  &:nth-child(even) {
    transform-origin: center right;
  }
`;
const SimilarTitle = styled.h2`
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
`;
const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.darker};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 14px;
  }
`;
