import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies } from '../Api/Api';
import { IGetMoviesDataModel } from '../Api/model/movie-data-model';
import { makeImgePath } from './utils';

const Home = () => {
  // API 에서 사용할 정보를 받아온다.useQuery 는 두가지 키값을 제공해줘야한다.
  //  사용할 데이터의 아이디를 제공해주는것 key / value  / 사용할  API를 선언한 함수
  // useQuery 사용할 데이터와 로딩중인지 체크 해준다.
  const { data, isLoading } = useQuery<IGetMoviesDataModel>(
    ['movies', 'nowPlaying'],
    getMovies
  );
  console.log(data, isLoading);
  return (
    <Wrapper style={{ height: '200vh' }}>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/* 이미지가 존재 하지 않으면 ""  출력 */}
          <Banner bgPhoto={makeImgePath(data?.results[0].backdrop_path || '')}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
};
export default Home;

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  background-color: orange;
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
  margin-bottom: 12px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;
