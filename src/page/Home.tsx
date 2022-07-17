import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies } from '../Api/Api';
import { IGetMoviesDataModel } from '../Api/model/movie-data-model';
import ListItem from '../components/movie/ListItem';
import TitleBanner from '../components/movie/TitleBanner';

const Home = () => {
  // API 에서 사용할 정보를 받아온다.useQuery 는 두가지 키값을 제공해줘야한다.
  //  사용할 데이터의 아이디를 제공해주는것 key / value  / 사용할  API를 선언한 함수
  // useQuery 사용할 데이터와 로딩중인지 체크 해준다.
  const { data: nowPlayingData, isLoading } = useQuery<IGetMoviesDataModel>(
    ['movies', 'nowPlaying'],
    getMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <TitleBanner data={nowPlayingData} />
          <Slider>
            <ListItem ListTitle='현재 상영중인 영화' data={nowPlayingData} />
          </Slider>
        </>
      )}
    </Wrapper>
  );
};
export default Home;

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  height: 300px;
`;
