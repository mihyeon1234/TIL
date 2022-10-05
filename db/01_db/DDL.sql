-- 우클릭, Use Database 클릭 후 db 선택
-- DDL은 테이블 구조를 관리
-- CREATE 생성, ALTER 수정, DROP 삭제
CREATE TABLE contacts(
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  email TEXT NOT NULL UNIQUE
);

-- 1. Rename a table
-- 테이블 이름을 contacts -> new_table_name 로 바꾸기

ALTER TABLE contacts RENAME TO new_table_name;

-- 2. Rename a column
-- new_table_name 테이블의 name 컬럼을 new_cloumn_name 로 바꾸기
ALTER TABLE new_table_name RENAME COLUMN name TO new_cloumn_name;

-- 3. Add a new column to a table
-- new_table_name 테이블에 address 컬럼 추가
ALTER TABLE new_table_name ADD COLUMN address TEXT NOT NULL;

-- 4. Delete a column
-- new_table_name 테이블에 address 컬럼 삭제 
-- (프라이머리키, 다른 테이블에서 참조되는경우 삭제 불가)
ALTER TABLE new_table_name DROP COLUMN address;

-- new_table_name 테이블 삭제(삭제시 취소, 복구 불가)
DROP TABLE new_table_name;
