import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line no-unused-vars
function Second({ uploadForm, setUploadForm }) {
  return (
    <Container>
      <RowDiv>
        <STitle>
          <RedStar>*</RedStar>대표 키워드
        </STitle>
        <Sinput
          type="text"
          defaultValue={uploadForm.mainKeyword}
          onChange={(event) => {
            setUploadForm((prev) => ({
              ...prev,
              mainKeyword: event.target.value,
            }));
          }}
        />
      </RowDiv>
      <RowDiv>
        <STitle style={{ paddingLeft: '0.6em' }}>상세 키워드</STitle>
        <Sinput
          type="text"
          placeholder="쉼표( , )로 구분해 주세요."
          onChange={(e) => {
            setUploadForm((prev) => ({
              ...prev,
              subKeyword: e.target.value,
            }));
          }}
        />
      </RowDiv>
      <RowDiv>
        <STitle>
          <RedStar>*</RedStar>담당자
        </STitle>
        <Sinput
          type="text"
          defaultValue={uploadForm.manager}
          onChange={(event) => {
            setUploadForm((prev) => ({
              ...prev,
              manager: event.target.value,
            }));
          }}
        />
      </RowDiv>
      <RowDiv>
        <STitle>
          <RedStar>*</RedStar>종료일
        </STitle>
        <Sinput
          type="date"
          defaultValue={uploadForm.closingDate}
          onChange={(event) => {
            setUploadForm((prev) => ({
              ...prev,
              closingDate: event.target.value,
            }));
          }}
        />
      </RowDiv>
      <RowDiv>
        <STitle>
          <RedStar>*</RedStar>종료단계
        </STitle>
        <Sselect
          name="status"
          defaultValue={uploadForm.status}
          onChange={(event) => {
            setUploadForm((prev) => ({
              ...prev,
              status: event.target.value,
            }));
          }}
        >
          <option value="시장조사">시장조사</option>
          <optgroup label="공장발굴">
            <option value="샘플제작 전">샘플제작 전</option>
            <option value="샘플제작">샘플제작 중</option>
          </optgroup>
          <option value="샘플완료">샘플완료</option>
          <option value="대량주문">대량주문</option>
          <option value="대량주문">기타</option>
          <option value="선택" disabled>
            ===선택===
          </option>
        </Sselect>
      </RowDiv>
      <RowDiv>
        <STitle style={{ paddingLeft: '0.6em' }}>내용</STitle>
        <Sinput
          type="text"
          defaultValue={uploadForm.content}
          placeholder="런칭 정보에 대해 입력해보세요. ex)제조공장, MOQ등"
          onChange={(event) => {
            setUploadForm((prev) => ({
              ...prev,
              content: event.target.value,
            }));
          }}
        />
      </RowDiv>
    </Container>
  );
}

export default Second;

const Container = styled.div`
  height: 350px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 2em;
  padding-bottom: 2em;
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const STitle = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
`;
const RedStar = styled.div`
  color: red;
  margin: 0.3em;
`;
const Sinput = styled.input`
  border-bottom: 2px solid black;
  border-top: none;
  border-left: none;
  border-right: none;
  width: 490px;
  padding-left: 20px;
`;

const Sselect = styled.select`
  border-bottom: 2px solid black;
  border-top: none;
  border-left: none;
  border-right: none;
  width: 490px;
  padding-left: 20px;
`;
