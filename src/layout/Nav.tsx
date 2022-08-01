import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MovieFlix } from '../assets/MovieFlix.svg';

const navVariants = {
  top: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  scroll: {
    backgroundColor: 'rgba(0,0,0,1)',
  },
};

interface IForm {
  Keyword: string;
}

const Nav = () => {
  // search button toggle event
  const [searchOpen, setSearchOpen] = useState(false);
  // router 와 컴포턴트를 연결해주는 hooks
  const movieMetch = useMatch('movies');
  const tvMetch = useMatch('tv');
  // animation을 함수로 전달해주기 위한 hooks
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  // 스크롤을 움직일때 제일 밑에서부터 얼마나 멀리 있는지 알려주는 hooks
  // 두개의 value를 제공해준다. progress 다른건 얼마나 멀리 이동했는지를 픽셀단위로 나타낸다,
  const { scrollY } = useViewportScroll();

  // searchbar toggle event
  const onSearchToggle = () => {
    if (searchOpen) {
      // close animation
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      // open animation
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start('scroll');
      } else {
        navAnimation.start('top');
      }
    });
  }, [scrollY, navAnimation]);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.Keyword}`);
  };

  return (
    <NavBar variants={navVariants} animate={navAnimation} initial={'top'}>
      <Col>
        <Link to='/'>
          {/* <MovieFlix fill='red' width={120} height={20} className='LogoIcon' /> */}
        </Link>
        <Items>
          {/* // 태그가 motion 을 얻으면 layoutId을 가질수 있는데 layoutId로 모션을 조절 할수있다 */}

          <Item>
            <Link to='movies'>
              {movieMetch && <Circle layoutId='circle' />}
              Movie
            </Link>
          </Item>
          <Item>
            <Link to='tv'>
              Tv Show{tvMetch && <Circle layoutId='circle' />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={() => onSearchToggle()}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: 'linear' }}
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </motion.svg>
          <Input
            {...register('Keyword', { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: 'linear' }}
            placeholder='Search for movie or tv show...'
          />
        </Search>
      </Col>
    </NavBar>
  );
};

export default Nav;

const NavBar = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  padding: 20px 60px;
  font-size: 12px;
  color: white;
  z-index: 1000;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  .LogoIcon {
    cursor: pointer;
    margin-right: 50px;
  }
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  // transform-origin 은 변화가 시작하는 위치를 의미
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const logoVariants = {
  // 평소의 상태
  normal: {
    fillOpacity: 1,
  },
  // 활성화되어있는 동안에
  active: {
    // 보여주고 싶은 값을 배열에 담을수 있다
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};
