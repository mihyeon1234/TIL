-- 터미널 깃 배쉬에서 차례대로 입력해서 users.csv 파일 데이터를 contacts 테이블에 넣기
-- sqlite3
-- .open mydb.sqlite3
-- .mode csv
-- .import users.csv users
-- .exit


CREATE TABLE users(
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  country TEXT NOT NULL,
  phone TEXT NOT NULL,
  balance INTEGER NOT NULL
);

-- users 테이블에서 컬럼 first_name, age 만 조회
SELECT first_name, age FROM users;

-- users 테이블 전체 데이터 조회
SELECT * FROM users;

-- rowid, 랑 first_name 조회
SELECT rowid, first_name FROM users;

-- 이름과 나이를 나이가 어린순으로 조회하기(기본 오른차순이여서 ASC 안써두됨)
SELECT first_name, age FROM users ORDER BY age ASC;

-- 이름과 나이, 계좌 잔고를 나이가 어린순으로 조회하고, 나이가 같으면 계좌 잔고가 많은순으로 조회
-- NULL은 가장 작은 값으로 처리됨
SELECT first_name, age, balance FROM users ORDER BY age ASC, balance DESC;

-- 중복없이 모든 지역 오름차순 조회하기(DISTINCT 는 중복 제거 python 에 set 느낌)
SELECT DISTINCT country FROM users ORDER BY country;

-- 이름과 지역이 둘다 같은 값 중복 제거
-- NULL 도 같은 값으로 처리되서 하나만 나옴
SELECT DISTINCT first_name, country FROM users;

--------------- WHERE 은 선택적으로 사용할수 있는 절 이다 ------------

-- 나이가 30 살 이상인 사람들의 이름, 나이, 계좌 잔고 조회하기
SELECT first_name, age, balance FROM users WHERE age >= 30;

-- 나이가 30 살 이상이고, 계좌 잔고가 50만원 이상인 사람들의 이름, 나이, 계좌 잔고 조회하기
SELECT first_name, age, balance FROM users WHERE age >= 30 AND balance >= 500000;

-- LIKE 뒤에 %는 0개이상의 문자가 올수도 있고, 안올수도 있지만 _ 는 _갯수만큼의 문자가 무조건 있음을 의미
-- LIKE는 대소문자 구별하지 않음

-- 이름에 호 가 포함되는 사람들의 이름과 성 조회하기
SELECT first_name, last_name FROM users WHERE first_name LIKE '%호%';

-- 이름이 '준'으로 끝나는 사람 이름 조회하기
SELECT first_name, last_name FROM users WHERE first_name LIKE '%준';

-- 전화번호가 02 로 시작하는 사람들의 이름과 전화번호 조회하기
SELECT first_name, phone FROM users WHERE phone LIKE '02-%';

-- 나이가 20대 인 사람들의 이름과 나이 조회하기
SELECT first_name, age FROM users WHERE age LIKE '2_';

-- 전화번호 중간 4자리가 51 로 시작하는 사람의 이름, 번호 조회하기
SELECT first_name, phone FROM users WHERE phone LIKE '%-51__-%';

-- 경기도 혹은 강원도에 사는 사람들의 이름과 지역 조회하기
SELECT first_name, country FROM users WHERE country = '경기도' OR country = '강원도';
SELECT first_name, country FROM users WHERE country IN ('경기도' ,'강원도');

-- 경기도 혹은 강원도에 살지 않는 사람들의 이름과 지역 조회하기
SELECT first_name, country FROM users WHERE country NOT IN ('경기도' ,'강원도');

-- 나이가 20대 인 사람들의 이름과 나이 조회하기
SELECT first_name, age FROM users WHERE age BETWEEN 20 and 30;
SELECT first_name, age FROM users WHERE age >= 20 and age<= 30;

-- 나이가 20대가 아닌 사람들의 이름과 나이 조회하기
SELECT first_name, age FROM users WHERE age NOT BETWEEN 20 and 30;

-- 계좌 잔고가 많은 상위 10명 조회하기
SELECT first_name, balance FROM users ORDER BY balance DESC LIMIT 10;

-- 나이가 가장 어린 5명 조회하기
SELECT first_name, age FROM users ORDER BY age LIMIT 5;

-- 11번 ~ 20번 데이터의 rowid 와 이름 조회하기
SELECT rowid, first_name FROM users LIMIT 10 OFFSET 10;

-- 각 지역별로 몇명씩 사는지 조회
SELECT country, COUNT(*) FROM users GROUP BY country;

-- 나이가 30살 이상인 사람들의 평균 나이 조회
SELECT AVG(age) FROM users WHERE age >= 30;

-- 성씨 별로 몇명씩 있는지 조회 하는데, 카운팅된 컬럼의 이름은 number_of_name 로 내림차순 하여 조회
SELECT last_name, COUNT(*) AS number_of_name FROM users GROUP BY last_name ORDER BY number_of_name DESC;

------------- 새로운 테이블 하나 더 만들기 ------------
CREATE TABLE classmates(
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  address TEXT NOT NULL
);

-- 만든 테이블에 데이터 삽입하기
INSERT INTO classmates
VALUES
  ('김철수', 30, '경기');

-- 만든 테이블에 여러개 데이터 삽입하기
INSERT INTO classmates
VALUES
  ('김철수', 30, '경기'),
  ('김철수', 30, '경기'),
  ('김철수', 30, '경기'),
  ('김철수', 30, '경기'),
  ('김철수', 30, '경기');

-- 테이블 2번 데이터를 이름을 '김철수바보', 주소를 '제주도'로 수정하기
UPDATE classmates SET name = '김철수바보', address = '제주도' WHERE rowid=2;

-- 테이블에서 3번째 행을 제거(where 을 안하면 모든 데이터가 삭제됨)
DELETE FROM classmates WHERE rowid = 3;

-- 삭제된것 확인하기
SELECT * FROM classmates;
