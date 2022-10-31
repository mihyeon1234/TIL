## 문제 1.

- `False`
  
  ```
  1. let & const는 블럭단위 스코프의 변수를 생성하는 반면 var는 global scope 변수를 생성한다.
  2. var는 변수의 재선언을 허용한다.
     - let은 재할당만 가능하다.
     - const은 재선언/재할당 모두 불가능하다.
  3. hoisting
     - var로 선언한 변수는 hoisting 될 때 선언 & 초기화(undefined)가 동시에 이루어진다.
     - const / let은 초기화 이전에 접근하게 되어 ReferenceError가 발생한다.
  ```

- `False`
  
  ```
  typeof null => object
  
  typeof undefined => undefined
  ```

- `False`
  
  ```
  배열의 순회는 가능은 하지만 python 처럼 요소를 이용하지 않는다. 
  for ... in 은 object인 경우는 key / 배열인 경우는 index 번호가 값으로 전달되어 순회한다.
  다만, for ... in 은 object를 순회하는데 주로 사용한다.
  배열은 인덱스 순으로 순회한다는 보장이 없으므로 권장하지 않기 때문이다.
  ```

- `False`
  
  ```
  == 연산자는 동등 연산자로 형변환이 가능하다면 형변환 후의 값이 같은지를 확인하며,
  === 연산자는 일치 연산자로 값과 타입이 모두 같은지를 확인한다.
  ```

## 문제2.

- for … of 문을 사용하여 배열의 각 요소를 출력하시오.
  
  ```js
  for (const number of numbers) {
    console.log(number)
  }
  ```

- for … of 문을 사용하여 배열의 각 요소에 10을 더한 요소들로 구성된 새로운 배열을 생 성하시오.
  
  ```js
  const plusTenNumbers = []
  for (const number of numbers) {
    plusTenNumbers.push(number + 10)
  }
  console.log(plusTenNumbers)
  ```

- for … of 문을 사용하여 배열의 각 요소들 중 홀수 요소 들로만 구성된 새로운 배열을 생 성하시오.
  
  ```js
  const oddNumbers = []
  for (const number of numbers) {
    if (number % 2) {
      oddNumbers.push(number)
    }
  }
  console.log(oddNumbers)
  ```

- for … of 문을 사용하여 배열의 각 요소들을 모두 더한 값을 구하시오.
  
  ```js
  let total = 0
  for (const number of numbers) {
    total += number
  }
  console.log(total)
  ```