import { useQuery } from 'react-query';
import { getMovies } from '../Api';

const Home = () => {
  // API 에서 사용할 정보를 받아온다.useQuery 는 두가지 키값을 제공해줘야한다.
  //  사용할 데이터의 아이디를 제공해주는것 key / value  / 사용할  API를 선언한 함수
  // useQuery 사용할 데이터와 로딩중인지 체크 해준다.
  const { data, isLoading } = useQuery(['movies', 'nowPlaying'], getMovies);
  console.log(data, isLoading);
  return (
    <div style={{ height: '200vh' }}>
      <h1>1</h1>
    </div>
  );
};
export default Home;
