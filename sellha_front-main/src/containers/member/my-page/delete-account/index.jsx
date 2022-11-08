import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteAccount } from 'http-api';
import { deleteUserInfo } from 'redux/user';
import {
  onlyTextAlert,
  okCancelAlert,
  onlyOkAlert,
} from 'components/public-alert';
import Preparing from 'assets/images/preparing.png';

function index() {
  const { pay } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  function deleteAccountEvent() {
    deleteAccount().then((res) => {
      if (res && res.message === 'ok') {
        onlyOkAlert({
          title: '탈퇴 완료!',
          text: '<br>그동안 셀링하니를 이용해주셔서 감사합니다❣️<br>더 유용한 서비스 될 수 있도록 노력하겠습니다!',
        }).then((confirm) => {
          if (confirm) {
            dispatch(deleteUserInfo());
            history.push('/');
            localStorage.removeItem('ACCESSTOKEN');
          }
        });
      } else {
        onlyTextAlert({
          text: '탈퇴 실패!',
          widthSize: 0,
          type: 'warning',
        });
      }
    });
  }

  return (
    <Container>
      <Title>
        <img alt="sellha" src={Preparing} />
        <div>
          <span>셀링하니의</span>
          <span>모든 서비스를</span>
          <span>포기하실려구요?</span>
        </div>
      </Title>
      <Description>
        <span>
          “ 스마트 스토어 전체 카테고리{' '}
          <span className="bold">50만 개의 데이터</span>로 폭넓은 아이템 발굴이
          가능해졌어요! ”
        </span>
        <span>
          “ 상품명 로직과 함께 내 상품에 딱 맞는,
          <span className="bold"> 상위 노출을 위한 최적의 상품명</span>을 만들
          수 있게 되었어요. ”
        </span>
        <span>
          “ 팀 연동 기능으로 <span className="bold">팀원들과 함께 공유</span>할
          키워드나 정보를 쉽게 공유할 수 있어요. ”
        </span>
        <span>
          “ 순위 보려고 매번 검색할 필요 없이
          <span className="bold"> 매일 상품 순위를 알림으로 받고 </span>
          바로 확인할 수 있어요. ”
        </span>
      </Description>
      <Emphasis>정말 이 모든 서비스를 포기하고 탈퇴하시겠어요?</Emphasis>
      <ButtonDiv>
        <button
          type="button"
          className="cancel"
          onClick={() => {
            try {
              if (pay || (pay && pay.length > 0)) {
                okCancelAlert({
                  title: '⚠️주의⚠️',
                  text: '탈퇴 시, 남은 이용기간에 대한 부분 환불은 어렵습니다.<br>정말 탈퇴하시겠어요?',
                }).then((confirm) => {
                  if (confirm) {
                    deleteAccountEvent();
                  } else {
                    history.goBack();
                  }
                });
              } else {
                deleteAccountEvent();
              }
            } catch (err) {
              onlyTextAlert({
                text: '탈퇴 실패!',
                widthSize: 0,
                type: 'warning',
              });
            }
          }}
        >
          혜택 포기하고 탈퇴할게요
        </button>
        <button
          type="button"
          className="delete"
          onClick={() => history.goBack()}
        >
          계속 사용할래요
        </button>
      </ButtonDiv>
    </Container>
  );
}

export default index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 101px);
`;

const Title = styled.div`
  width: fit-content;
  > img {
    float: left;
    height: 17em;
  }
  > div {
    float: left;
    display: flex;
    flex-direction: column;
    margin-left: 5em;
    > span {
      text-align: right;
      font-size: 3em;
      font-weight: bold;
    }
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;
  > span {
    font-size: 1.3em;
    font-weight: lighter;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    .bold {
      font-weight: normal;
    }
  }
`;

const Emphasis = styled.span`
  margin: 3em 0;
  font-size: 1.5em;
  font-weight: 500;
`;

const ButtonDiv = styled.div`
  > button {
    width: 14em;
    height: 4.2em;
    padding: 15px;
    border-radius: 15px;
    color: ${(props) => props.theme.colors.white};
  }
  .cancel {
    margin-right: 1em;
    background-color: ${(props) => props.theme.colors.gray};
    &:hover {
      background-color: ${(props) => props.theme.colors.lightGray};
    }
  }
  .delete {
    background-color: ${(props) => props.theme.colors.orange};
    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`;
