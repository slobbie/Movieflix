import React from 'react';
import styled from 'styled-components';
import { IGetMoviesDataModel } from '../Api/model/movie-data-model';
import { makeImgePath } from './utils';

interface TitleBannerprops {
  data?: IGetMoviesDataModel;
}

const TitleBanner = (props: TitleBannerprops) => {
  return (
    <Banner bgPhoto={makeImgePath(props.data?.results[0].backdrop_path || '')}>
      <Title>{props.data?.results[0].title}</Title>
      <Overview>{props.data?.results[0].overview}</Overview>
    </Banner>
  );
};

export default TitleBanner;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 20px;
  margin-top: 15px;
  margin-left: 15px;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 50%;
  letter-spacing: 3px;
  word-spacing: 2px;
  line-height: 1.4rem;
  margin-left: 17px;
`;
