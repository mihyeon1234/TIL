## 문제 1.

- JavaScript에서 함수는 변수에 할당, 인자로 전달할 수 있으나 함수의 결괏값으로 반환할 수는 없다.
  
  - `False`
    
    ```
    JavaScript 에서 함수는 변수에 할당, 인자로 전달, 함수의 결괏값으로 반환할 수 있는 1급 객체(First-Class Object)이다.
    ```

- 함수의 매개변수의 개수와 인자의 개수는 반드시 일치하지 않아도 동작한다
  
  - `True`

- 배열에 새로운 요소를 추가하는 메서드는 `append`다.
  
  - `False`
    
    ```js
    push 메서드이다.
    ```

- JSON 데이터는 바로 객체처럼 key 접근이 가능하다.
  
  - `False`
    
    ```js
    JSON.parse()를 통해 객체로 변환해야한다.
    ```

- 화살표 함수와 `function` 키워드로 선언한 함수는 차이가 없다.
  
  - `False`
    
    ```js
    this 키워드가 함수 내부에 존재한다면, 차이가 있다.
    ```

## 

## 문제 2.

`forEach`

- 배열 내의 모든 요소를 하나씩 순회하며, callback 함수를 실행한다. return은 없다.

`map`

- 배열 내의 모든 요소에 대하여 주어진 callback 함수를 실행하며, 함수의 반환 값을 요소로 하는 새로운 배열을 반환한다. 배열 전체를 다른 모습으로 바꿀 때 사용한다.

`filter`

- 주어진 callback 함수의 반환 값을 true로 만족하는 요소만으로 만든 새로운 배열을 반환한다. callback 함수를 통해 원하는 요소만 filtering 할 수 있다.

`find`

- 주어진 callback 함수의 반환 값을 true로 만족하는 첫번째 요소를 반환한다. 만족하는 값이 없다면 undefined를 반환한다.

`every`

- 배열 안의 모든 요소가 callback 함수의 return을 true로 반환 한다면 every는 true를 반환하며, callback 함수의 return된 값이 하나라도 false인 경우엔 every는 false를 반환한다. 단, 빈 배열에서 호출하면 true를 반환한다.

`some`

- 배열 안에 하나의 요소라도 callback 함수의 return을 true로 반환 한다면 some은 true를 반환하며,  callback 함수의 return된 값이 전부 false인 경우엔 some은 false를 반환한다. 단, 빈 배열에서 호출 시 false를 반환한다.

`reduce`

- 배열의 각 요소에 대해 주어진 callback 함수를 실행하고, 하나의 결과 값을 반환한다. 배열 내의 숫자 총합, 평균 계산 등 배열의 값을 하나로 줄이는 동작을 한다.
