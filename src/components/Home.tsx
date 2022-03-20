import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMovies } from '../Api/Api';
import { IGetMoviesDataModel } from '../Api/model/movie-data-model';
import { makeImgePath } from './utils';

const rowVariants = {
  // 보이지 않을때
  hidden: {
    // 사용자 화면의 시작점
    x: window.outerWidth + 5,
  },
  // 보일때
  visible: {
    x: 0,
  },
  // 사라질때
  exit: {
    x: -window.outerWidth - 5,
  },
};

// 슬라이더 박스 호버 이벤트 설정
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,
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
      duaration: 0.3,
      type: 'tween',
    },
  },
};

const offset = 6;

const Home = () => {
  const Navigate = useNavigate();
  const bigMovieMatch = useMatch('/movies/:movieId');
  // console.log(bigMovieMatch);

  // object를 하나 리턴 해줌 그안엔 스크롤 x,y , porgess값 또는 스크롤된 거리의 숫자값이 들어있다.
  const { scrollY } = useViewportScroll();

  // API 에서 사용할 정보를 받아온다.useQuery 는 두가지 키값을 제공해줘야한다.
  //  사용할 데이터의 아이디를 제공해주는것 key / value  / 사용할  API를 선언한 함수
  // useQuery 사용할 데이터와 로딩중인지 체크 해준다.
  const { data, isLoading } = useQuery<IGetMoviesDataModel>(
    ['movies', 'nowPlaying'],
    getMovies
  );
  // console.log(data, isLoading);

  //AnimatePresence 는 컴포넌트가 render 되거나 destroy 될때 효과를 줄수 있다.
  // slide 이벤트를 위해 index를 만들어 준다.
  const [index, setIndex] = useState(0);

  // exit 버그를 해결을 위한 상태값
  const [leaving, setLeaving] = useState(false);

  //setIndex 의 이전 상태를 기억하고 그 상태에서 index + 1
  const incrassIndex = () => {
    if (data) {
      // indx 를 증가시키기전 체크
      if (leaving) return; // leaving 이 true 라면  아무것도 하지 않는다.
      setLeaving(true); // 사용자가 클릭이벤트를 발생 시키면 상태를 true로 바꿔준다.
      // 총 영화의 갯수   -1 인 이유 이미 메인 화면에서 한장의 사용하고 있기 떄문에다.
      const totalMovie = data?.results.length - 1;
      // 영화를 총갯수 구하는법  내림 처리 20개 여서 한개가 남기때문에 내림 처리해준다
      const maxIndex = Math.floor(totalMovie / offset) - 1; // page 가 0 에서 시작하기 때문에 -1
      // index 가 max로 되돌아가면 0 아니면 증가시킨다.
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1)); // 최초에 false로 실행되었지만 상태값이 true 로 바뀌었기때문에 exit 이 중복되지 않는다.
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (movieId: number) => {
    Navigate(`/movies/${movieId}`);
  };

  const onOverlayClick = () => {
    Navigate('/');
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + '' === bigMovieMatch.params.movieId
    );
  console.log(clickedMovie);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/* 이미지가 존재 하지 않으면 ""  출력 */}
          <Banner
            onClick={incrassIndex}
            bgphoto={makeImgePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            {/* //onExitComplete 에 함수를 넣으면 exit 이 끝났을때 실행된다. */}
            {/* // 기본 셋팅 false */}
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                key={index}
                transition={{ type: 'tween', duration: 1 }}
              >
                {/* // 이미 사용한 이미지는 제외 시킨다 */}
                {/* // 페이지크기만큼 인덱스를 곱해준다 ,페이지 크기 곱하기 보여지는 페이지 더하기 페이크 크기 */}
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ''}
                      key={movie.id}
                      whileHover='hover'
                      initial='normal'
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      onClick={() => onBoxClicked(movie.id)}
                      bgphoto={makeImgePath(movie.backdrop_path, 'w400')}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent) , url(${makeImgePath(
                            clickedMovie.backdrop_path,
                            'w500'
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
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

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  position: relative;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 14px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
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
`;
