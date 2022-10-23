/* 1. 아래의 설명을 읽고 T/F 여부를 작성하시오.
    - JavaScript에서 함수는 변수에 할당, 인자로 전달할 수 있으나 함수의 결괏값으로
    반환할 수는 없다.
        - F

    - 함수의 매개변수의 개수와 인자의 개수는 반드시 일치하지 않아도 동작한다.
        - T

    - 배열에 새로운 요소를 추가하는 메서드는 append다.
        - F push

    - JSON 데이터는 바로 객체처럼 key 접근이 가능하다.
        - F  JSON.parse로 변환해야됨

    - 화살표 함수와 function 키워드로 선언한 함수는 차이가 없다.
        - F this 호출방식 차이

*/
/* 2. 다음의 Array Helper Method의 동작을 간략히 서술하시오.
    forEach, map, filter, find, every, some, reduce
forEach - 배열을 돌면서 각 요소에 대해 한번씩 실행됨
map - 배열을 돌면서 각 요소에 대한 반환값을 요소로 하는 새로운 배열 반환
filter - 배열을 돌면서 조건에 해당되는 TRUE인 값만 요소로 하는 새로운 배열 반환
find - 배열을 돌며, 반환값이 TRUE 인 조건을 만족하는 첫번째 값만 반환하고, 값이 없으면 undefined 반환
every - 배열의 모든 요소가 주어진 판별 함수를 통과해야만 true 반환 (빈배열은 true)
some - 배열의 요소 중 하나라도 주어진 판별 함수를 통과하면 true 반환 (빈배열은 false)
reduce - 배열을 돌면서 누적값을 사용하며, 누적된 하나의 값으로 반환시킴
*/
