# 🚗 wanted-codestates-project-4-2

카트 OpenAPI를 이용한 전적 검색 및 랭킹 확인 사이트를 구현한 프로젝트입니다.

### 📌 &nbsp;[Team4의 과제 확인하러 가기](https://team4-nexon-kartrider.netlify.app/)

### <br/>

###

## 🚗 View

| 개인 전적 조회 페이지 |
| :-------------------: | 
|![개인 전적 저회](https://user-images.githubusercontent.com/87534763/156378137-ca9c0981-6ad6-475e-9578-4ed1be685321.gif)|

### <br/>

|  조회 페이지 |
| :-------------------: | 
|![랭킹 페이지](https://user-images.githubusercontent.com/87534763/156377725-af0ef90a-c5a4-4800-8178-636283f79de2.gif)|

### <br/>

###

## 🚗 Implement

### Stack

`Javascript` `React` `Styled-Components`

### Features

#### ✅ 개인 전적 조회, 랭킹 페이지
- [X] 닉네임 검색을 통한 개인 전적 조회
- [X] 공유하기 클립 복사
- [X] 응원 한마디(실시간 댓글 남기기)
- [X] Loading UI
- [X] 트랙, 카트별 전적 및 기록 리스트
- [X] 개인 전적 리스트(등수 및 리아티어 구분)
- [X] 팀원 및 순위 정렬

#### ✅ 그래프
- [X] 개인 전적 페이지 "순위변동 추이" - Rechart 라이브러리의 Line 컴포넌트를 이용하여 구현
- [X] 개인 전적 페이지 "종합 전적" & 랭킹 페이지 "1~3등 승률, 리아티어율" - react-minimal-pie-chart 라이브러리를 이용하여 구현

#### ✅ 애니메이션
- [X] 네브바 "마우스 오버" - 가상요소 선택자 및 transition ease-in-out을 이용하여 구현
- [X] 네브바 "검색 마우스 오버" - hover를 이용한 이용한 색 변화 구현
- [X] 개인 전적 페이지 "매칭 배너" - keyframes를 이용한 배경색 변화 구현
- [X] 개인 전적 페이지 "신고하기 버튼" - hover를 이용한 색 변화 구현
- [X] 랭킹 페이지 "대쉬보드 파도" - keyframes의 background-position-x 속성을 이용하여 동일한 애니메이션에 설정값을 변경하여 구현

### <br/>

###

## 🚗 Directory

```
├── public/
├── src/
│   ├── components/              - page components
│   ├── data/                    - json(kart, track)
│   ├── hooks/                   - custom hook(toggle, input)
│   ├── pages/                   - routed pages
│
├── App.js                       - page routing
├── index.js                     - entry point
├── README.md                    - 리드미(프리뷰, 배포링크, 코드컨벤션)
└── package.json                 - 사용 package 목록
```

### <br/>

###

## 🚗 Code Convention

### Getting Started

1. `clone` the repository,

```
$ git clone "https://github.com/wanted-Team4/wanted-codestates-project-4-2.git"
```

2. `add` dependencies,

```
$ yarn install
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
