## 🚗 MovieFlix

🍎 [배포 링크](https://slobbie.github.io/Movieflix/)

<img width="1676" alt="스크린샷 2022-08-01 오후 9 52 18" src="https://user-images.githubusercontent.com/86298255/182152010-365391f9-c324-4925-a348-0e30de4f7e03.png">

## 사용 스택

`Typescript` `React` `Styled-Components` `react-query`

## 주요 기능

1. themoviedb API 를 이용하여 상영중잉 영화 및 Tv Show 정보를 알수있다.
2. search 를 통한 원하는 컨텐츠를 찾을수 있다.
3. framer-motion를 이용한 Interaction

### 📎 themoviedb API 를 이용하여 상영중잉 영화 및 Tv Show 정보를 알수있다.

react-query 를 통해 데이터를 관리 하였습니다.

가독성을 높이기 위해 용도 별로 API 나눠 관리하였습니다. (Movie, Tv)

ex) MovieAPI.ts

```
export const getMovies = () => {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${MOVIE_API_KEY}&language=ko-KR&page=1`
  ).then((res) => res.json());
};

```

Movie.tsx 에서 react-query 를 사용하여 데이터 관리

```
 API 에서 사용할 정보를 받아온다.useQuery 는 두가지 키값을 제공해줘야한다.
 사용할 데이터의 아이디를 제공해주는것 key / value  / 사용할  API를 선언한 함수
 useQuery 사용할 데이터와 로딩중인지 체크 해준다.
const { data: nowPlayingData, isLoading: nowPlayingLoading } =
useQuery<IGetMoviesDataModel>(['movies', 'nowPlaying'], getMovies);

```

### 📎 search 를 통한 원하는 컨텐츠를 찾을수 있다.

useNavigate Hooks 를 이용해 Input 창의 value 를 path 로 보내 주었고

useParams Hooks 를 이용 하여 path 속 키워드 value 를 받아와

react-query 로 관리중인 Datail 데이터와 매치 시켜 데이터를 받아왔습니다.

```
  const { movieId, tvId } = useParams() as unknown as RouteParams;

  const { data: Detail, isLoading: movieDetailLoading } =
    useQuery<IGetMovieDetailModel>(
      ['Detail'],
      () => (movieId ? getMovieDetail(movieId) : getTvDetail(tvId)),
      {
        keepPreviousData: true,
      }
    );

```

### 📎 framer-motion를 이용한 Interaction

framer-motion을 이용하여 Nav animation 설정

- Nav animation

![무비_네브_AdobeExpress](https://user-images.githubusercontent.com/86298255/182144719-dd51d095-bd93-4f6c-8f60-3102b1bc854f.gif)

framer-motion 가 제공하는 Hooks 를 이용하여 nav 가 Top 위치 에서 80 보다 아래로 내려온다면 backgroundColor 컬러를 나타내준다.

```
  // animation을 함수로 전달해주기 위한 hooks
  const navAnimation = useAnimation();

  // 스크롤을 움직일때 제일 밑에서부터 얼마나 멀리 있는지 알려주는 hooks
  // 두개의 value를 제공해준다. progress 다른건 얼마나 멀리 이동했는지를 픽셀단위로 나타낸다,
  const { scrollY } = useViewportScroll();

  const navVariants = {
    top: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    scroll: {
        backgroundColor: 'rgba(0,0,0,1)',
    },
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
```

- slider

```
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

const incrassIndex = () => {
    if (nowPlayingData) {
      // indx 를 증가시키기전 체크
      if (leaving) return; // leaving 이 true 라면  아무것도 하지 않는다.
      toggleLeaving();
      // 총 영화의 갯수   -1 인 이유 이미 메인 화면에서 한장의 사용하고 있기 떄문에다.
      const totalMovie = nowPlayingData.results.length - 1;
      // 영화를 총갯수 구하는법  내림 처리 20개 여서 한개가 남기때문에 내림 처리해준다
      const maxIndex = Math.floor(totalMovie / offset) - 1; // page 가 0 에서 시작하기 때문에 -1
      // index 가 max로 되돌아가면 0 아니면 증가시킨다.
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1)); // 최초에 false로 실행되었지만 상태값이 true 로 바뀌었기때문에 exit 이 중복되지 않는다.
    }
  };

```

### Getting Started

1. `clone` the repository.

```
$ https://github.com/slobbie/netflix-clone.git"
```

2. `add` dependencies,

```
$ yarn add
```

3. `start` the project,

```
$ yarn start
```

4. `Setting` prettier,

```
$ npx prettier --write .
```

### Commit Emoji

|   emoji    | commit message |       when to use it        |
| :--------: | :------------: | :-------------------------: |
|   :tada:   |     Start      |        프로젝트 시작        |
| :sparkles: |      Feat      |      새로운 기능 추가       |
|   :bug:    |      Fix       |          버그 수정          |
| :recycle:  |    Refactor    |        코드 리팩터링        |
| :lipstick: |     Style      |   스타일 추가 및 업데이트   |
| :package:  |     Chore      |   패키지 추가 및 업데이트   |
|  :books:   |      Docs      | 그 외 문서 추가 및 업데이트 |

### <br/>

###
