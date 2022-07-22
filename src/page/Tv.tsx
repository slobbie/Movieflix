import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMovies, topMovies, upcomingMovie } from '../Api/MovieApi';
import { IGetMoviesDataModel, IMovie } from '../Api/model/movie-data-model';
import TitleBanner from '../components/TitleBanner';
import { makeImgePath } from '../components/utils';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Detail from '../components/Detail';
import { IGetTvDataModel } from '../Api/model/Tv-data-model';
import { getPopularTv, getTopRatedTv, getTv } from '../Api/TvApi';
import TvTitleBanner from '../components/TvTitleBanner';
import noPoster from '../assets/noPosterSmall.png';

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

const Tv = () => {
  const { data: TvData, isLoading: todayLoading } =
    useQuery<IGetMoviesDataModel>(['tv', 'today'], getTv);
  const { data: popTvData, isLoading: popTvLoading } =
    useQuery<IGetMoviesDataModel>(['tv', 'popular'], getPopularTv);
  const { data: topTvData, isLoading: topTvLoading } =
    useQuery<IGetMoviesDataModel>(['tv', 'topRate'], getTopRatedTv);

  const isLoading = todayLoading || popTvLoading || topTvLoading;

  const bigTvMatch = useMatch('/tv/:tvId');

  const offset = 6;

  const [todayIndex, setTodayIndex] = useState(0);
  const [popIndex, setPopIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const TodayincrassIndex = () => {
    if (TvData) {
      // indx 를 증가시키기전 체크
      if (leaving) return; // leaving 이 true 라면  아무것도 하지 않는다.
      toggleLeaving();
      // 총 영화의 갯수   -1 인 이유 이미 메인 화면에서 한장의 사용하고 있기 떄문에다.
      const totalMovie = TvData.results.length - 2;
      // 영화를 총갯수 구하는법  내림 처리 20개 여서 한개가 남기때문에 내림 처리해준다
      const maxIndex = Math.floor(totalMovie / offset) - 1; // page 가 0 에서 시작하기 때문에 -1
      // index 가 max로 되돌아가면 0 아니면 증가시킨다.
      setTodayIndex((prev) => (prev === maxIndex ? 0 : prev + 1)); // 최초에 false로 실행되었지만 상태값이 true 로 바뀌었기때문에 exit 이 중복되지 않는다.
    }
  };

  const PopIncrassIndex = () => {
    if (popTvData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = popTvData?.results.length - 2;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setPopIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const TopIncrassIndex = () => {
    if (topTvData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = topTvData?.results.length - 2;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setTopIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  //////////////////////////////////////////////////////////

  const Navigate = useNavigate();

  // exit 버그를 해결을 위한 상태값
  const toggleLeaving = () => setLeaving((prev) => !prev);

  //AnimatePresence 는 컴포넌트가 render 되거나 destroy 될때 효과를 줄수 있다.
  // slide 이벤트를 위해 index를 만들어 준다.

  const onBoxClicked = (tvId: number) => {
    Navigate(`/tv/${tvId}`);
  };

  const onOverlayClick = () => {
    Navigate('/tv');
  };

  // object를 하나 리턴 해줌 그안엔 스크롤 x,y , porgess값 또는 스크롤된 거리의 숫자값이 들어있다.
  const { scrollY } = useViewportScroll();

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <TvTitleBanner data={TvData} />

          <Slider>
            <TopBox onClick={TodayincrassIndex}>
              <Title>오늘의 시리즈</Title>
              <AiOutlineArrowRight className='rightArrow' />
            </TopBox>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                key={todayIndex}
                transition={{ type: 'tween', duration: 1 }}
              >
                {TvData?.results
                  .slice(1)
                  .slice(offset * todayIndex, offset * todayIndex + offset)
                  .map((Tv: IMovie) => (
                    <Box
                      layoutId={Tv.id + ''}
                      key={Tv.id}
                      whileHover='hover'
                      initial='normal'
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      onClick={() => onBoxClicked(Tv.id)}
                      bgphoto={
                        Tv.backdrop_path
                          ? makeImgePath(Tv.backdrop_path, 'w400')
                          : noPoster
                      }
                    >
                      <Info variants={infoVariants}>
                        <h4>{Tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <Slider>
            <TopBox onClick={PopIncrassIndex}>
              <Title>인기 시리즈</Title>
              <AiOutlineArrowRight className='rightArrow' />
            </TopBox>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                key={popIndex}
                transition={{ type: 'tween', duration: 1 }}
              >
                {popTvData?.results
                  .slice(1)
                  .slice(offset * popIndex, offset * popIndex + offset)
                  .map((Tv: IMovie) => (
                    <Box
                      layoutId={`Pop_${Tv.id}`}
                      key={Tv.id}
                      whileHover='hover'
                      initial='normal'
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      onClick={() => onBoxClicked(Tv.id)}
                      bgphoto={
                        Tv.backdrop_path
                          ? makeImgePath(Tv.backdrop_path, 'w400')
                          : noPoster
                      }
                    >
                      <Info variants={infoVariants}>
                        <h4>{Tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <Slider>
            <TopBox onClick={TopIncrassIndex}>
              <Title>많은 사람들이 찾는 시리즈</Title>
              <AiOutlineArrowRight className='rightArrow' />
            </TopBox>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                key={topIndex}
                transition={{ type: 'tween', duration: 1 }}
              >
                {topTvData?.results
                  .slice(1)
                  .slice(offset * topIndex, offset * topIndex + offset)
                  .map((Tv: IMovie) => (
                    <Box
                      layoutId={`Top_${Tv.id}`}
                      key={Tv.id}
                      whileHover='hover'
                      initial='normal'
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      onClick={() => onBoxClicked(Tv.id)}
                      bgphoto={
                        Tv.backdrop_path
                          ? makeImgePath(Tv.backdrop_path, 'w400')
                          : noPoster
                      }
                    >
                      <Info variants={infoVariants}>
                        <h4>{Tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigTvMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  // exit={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  // layoutId={bigTvMatch.params.tvId}
                >
                  <Detail />
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};
export default Tv;

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

const TopBox = styled.div`
  display: flex;
  width: 90%;
  height: 40px;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20px;
  cursor: pointer;
  .rightArrow {
    width: 30px;
    height: 30px;
    margin-left: auto;
  }
`;

const Title = styled.h3``;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  margin: 0 5%;
  width: 90%;
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
  box-shadow: rgb(255 255 255 / 22%) 0px 2px 15px 0px;
  border-radius: 15px;
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
