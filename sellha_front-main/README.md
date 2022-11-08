# Sellha - Front Repo

![AWS Build](https://github.com/malanghoney/sellerbee_front/actions/workflows/master-cd.yml/badge.svg)

주소 : [sellha.kr](https://sellha.kr)  
시작일 : 2020.08  
참여자 :
이예진 김창수 조재준 최민경 김주은 이혜안 곽시강 장다영 이미현 허윤은 최현민 권혁진 박지애

## 프로젝트 소개

이커머스 초기 진입자들을 위한 판촉 정보, 모니터링, 공장 발굴, 소싱 등 다양한 웹 서비스 제공

## 실행방법

### Dev 환경

1. `npm install`
2. `npm run start`

### Prod 환경

1. `npm install`
2. `npm run build`
3. `serve -s build`

## 라이브러리

| name                      | version | description                                   |
| ------------------------- | ------- | --------------------------------------------- |
| @ant-design/icons         | 4.6.2   | antd 아이콘 모음                              |
| animate.css               | 4.1.1   | animate.css                                   |
| antd                      | 4.16.3  | 기본 컴포넌트 리액트 디자인화                 |
| array-move                | 3.0.1   | 배열 깊은 복사                                |
| axios                     | 0.21.1  | Promise 기반 http client                      |
| aos                       | 2.3.4   | 스크롤 애니메이션 라이브러리                  |
| chart.js                  | 2.9.4   | 차트 그려주는 라이브러리                      |
| chartjs-plugin-datalabels | 0.7.0   | 차트에 라벨 붙이는 플러그인                   |
| craco-less                | 1.17.1  | craco less 확장자 플러그인                    |
| date-fns                  | 2.22.1  | 날짜 표시, 조작 간편화                        |
| prop-types                | 15.7.2  | 컴포넌트 props 검사                           |
| react                     | 17.0.2  | 웹 UI 작성 프레임워크                         |
| react-chartjs-2           | 2.11.2  | 리액트용 chartjs                              |
| react-collapse            | 5.1.0   | 리액트용 가변 높이의 컴포넌틑 축소 애니메이션 |
| react-datepicker          | 5.1.0   | 리액트용 날짜 선택 라이브러리                 |
| react-dom                 | 17.0.2  | 리액트용 DOM                                  |
| react-export-excel        | 0.5.3   | 리액트용 엑셀 생성                            |
| react-icons               | 4.2.0   | 리액트용 아이콘 모음                          |
| react-player              | 2.9.0   | 리액트용 동영상 플레이어                      |
| react-redux               | 7.2.4   | 리액트용 REDUX 바인딩                         |
| react-router-dom          | 5.2.0   | 리액트용 DOM에 라우팅 바인딩                  |
| react-s3                  | 1.3.1   | 리액트용 s3 명령 수행                         |
| react-slick               | 0.28.1  | 리액트용 컴포넌트 슬라이더                    |
| react-sortable-hoc        | 2.0.0   | 리액트용 정렬 컴포넌트                        |
| react-star-ratings        | 2.3.0   | 리액트용 별 찍기                              |
| react-tooltip             | 4.2.21  | 리액트용 툴팁 표시                            |
| redux                     | 4.1.0   | 예측가능한 상태관리 라이브러리                |
| styled-components         | 5.3.0   | 리액트용 스타일링 라이브러리                  |
| sweetalert2               | 11.0.17 | 디자인된 팝업 박스                            |

## 기타

### - 충돌 해결했는데 안 되었다고 하는 경우

1. `npm run nuke:cache`
2. `npm run start`

### - JWT Payload 정보

1. id
2. 결제정보

### - API Swagger 문서

- [api2.sellha.kr](https://api2.sellha.kr/api-docs/)
