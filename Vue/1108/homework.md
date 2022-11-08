1. 다음은 Vuex 로 구성된 하나의 숫자를 counting 하는 store 이다.
(a), (b), (c) 에 들어갈 코드를 작성하시오.
a - Vuex.Store
b - state.count += 1
c - context.commit('NUMBER_INCREMENT')

2. 아래 예시의 함수는 서버로부터 데이터를 가져 온 뒤 ,
응답 값을 state 에 저장하기 위하여 mutations 를 호출하는 로직을 수행한다.
이와 같이 비동기 API 및 mutations 호출에 적합한 store 의 속성 (a) 를 작성하시오.
actions


3. store 에 정의한 state 를 직접 변경하지 않고
mutations 를 통해 변경해야 하는 이유를 Vuex 공식문서 를 참고하여 작성하시오.

- 모든 상태 변경이 추적 가능한 기록을 남기고 애플리케이션을 더 잘 이해하는 데 도움이 되기 때문에.
