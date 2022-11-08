1.
아래의
설명을 읽고 T/F 여부를 작성하시오
- Vue 프로젝트에서 상태 관리를 하기 위해서는 반드시 Vuex 를 설치해야 한다. F
props, emit으로도 가능함

- mutations 는 반드시 state 를 수정하기 위해서만 사용되어야 한다. T

- mutations 는 store.dispatch 로 actions 는 store.commit 으로 호출할 수 있다. F

- state는 data 의 역할 getters 는 computed 와 유사한 역할을 담당한다. T


2. Vuex 에서 State, Getters, Mutations, Actions 의 역할을 각각 서술하시오
State - data의 역할을 하고, 중앙에서 관리하는 모든 상태 정보를 저장한다
Getters - computed역할로, state값을 계산해서 저장해 놓는곳
Mutations - 동기적으로 state 값을 변경하기 위한 메서드
Actions - state갑을 직접 변경하지는 않으며, mutations을 호출하며 비동기 작업 가능


3. 컴포넌트에 작성된 Todo App 관련 코드를 Vuex 의 Store 로 옮기고자 한다 .
빈 칸 (a), (b), (c), ( 에 들어갈 코드를 작성하시오
a - state
b - getters
c - mutations
d - state

4. Vue Life Cycle Hook 을 참고하여 , 다음 Vue application 을 실행했을 때
console 창에 출력되는 메시지를 작성하시오

created!
mounted!