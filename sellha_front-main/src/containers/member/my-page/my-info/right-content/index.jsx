import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  addTeam,
  localRefresh,
  localInfo,
  removeUserTeam,
  requestJoinTeam,
} from 'http-api';
import { setUserInfo, deleteUserInfo, resetTeam } from 'redux/user';
import ReactTooltip from 'react-tooltip';
import { onlyTextAlert } from 'components/public-alert';
import { setCookie } from 'components/cookie';
// import { checkSubscribing, showSubscribeAlert } from 'components/subscription';
import {
  InfoRow,
  ContentTitle,
  Content,
  PublicBtn,
  UnderlineBtn,
  MyInfoDiv,
  ContentDiv,
  TeamInfoText,
  ButtonDiv,
} from '../../style/index';

const teamText = [
  {
    placeholder: '새로 만들 팀 이름을 입력해 주세요.',
    info: '공유받은 팀 코드가 있다면?',
    add: '생성',
    btnText: '등록하기',
  },
  {
    placeholder: '공유받은 팀 코드를 입력해 주세요.',
    info: '팀 코드가 없다면?',
    add: '등록',
    btnText: '팀 만들기',
  },
];

function index() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [teamInput, setTeamInput] = useState('');
  const [mode, setMode] = useState(-1);
  const clippedText = useRef(null);

  function initInput() {
    setTeamInput('');
    setMode(-1);
  }

  async function updateUserInfo() {
    try {
      const { accessToken } = await localRefresh();
      if (accessToken) {
        dispatch(resetTeam());
        setCookie('AC', accessToken);
        const info = await localInfo();
        dispatch(setUserInfo(info));
      }

      initInput();
    } catch {
      dispatch(deleteUserInfo());
    }
  }

  async function removeTeamEvent() {
    try {
      const { message } = await removeUserTeam(user.teamId, user.id);
      if (message === 'ok') {
        await updateUserInfo();
        onlyTextAlert({
          text: '삭제되었습니다',
          widthSize: 0,
          type: 'success',
        });
      } else {
        onlyTextAlert({
          text: '삭제 실패',
          widthSize: 0,
          type: 'warning',
        });
      }
    } catch {
      onlyTextAlert({
        text: '삭제 실패',
        widthSize: 0,
        type: 'warning',
      });
    }
  }

  async function addTeamEvent() {
    try {
      const { message } = await addTeam({ teamName: teamInput });
      if (message === 'ok') {
        updateUserInfo();
        onlyTextAlert({
          text: '팀이 생성되었습니다',
          widthSize: 0,
          type: 'success',
        });
      } else {
        onlyTextAlert({
          text: '생성 실패',
          widthSize: 0,
          type: 'warning',
        });
      }
    } catch {
      onlyTextAlert({
        text: '생성 실패',
        widthSize: 0,
        type: 'warning',
      });
    }
  }

  async function joinTeamEvent() {
    try {
      const { message } = await requestJoinTeam({
        teamCode: teamInput,
      });
      if (message === 'ok') {
        updateUserInfo();
        onlyTextAlert({
          text: '팀에 참가하였습니다',
          widthSize: 0,
          type: 'success',
        });
      } else {
        onlyTextAlert({
          text: '참가 실패',
          widthSize: 0,
          type: 'warning',
        });
      }
    } catch {
      onlyTextAlert({
        text: '참가 실패',
        widthSize: 0,
        type: 'warning',
      });
    }
  }

  return (
    <MyInfoDiv>
      {' '}
      <InfoRow>
        <ContentTitle>팀 정보</ContentTitle>
        {!user.teamId && (
          <>
            {mode < 0 && (
              <ContentDiv>
                <Content>팀 계정이 등록되어 있지 않습니다.</Content>
                <AddTeamBtn
                  type="button"
                  onClick={() => {
                    // if (checkSubscribing(user)) setMode(0);
                    // else showSubscribeAlert();

                    setMode(0);
                  }}
                >
                  지금 등록하기
                </AddTeamBtn>
              </ContentDiv>
            )}
            {mode >= 0 && (
              <ContentDiv>
                <TeamInput
                  type="text"
                  autoFocus
                  value={teamInput}
                  onChange={(e) => setTeamInput(e.target.value)}
                  onKeyPress={async (e) => {
                    if (e.code === 'Enter') {
                      if (mode === 0) {
                        addTeamEvent();
                      } else {
                        joinTeamEvent();
                      }
                    }
                  }}
                  placeholder={teamText[mode].placeholder}
                />
                <ButtonDiv>
                  <PublicBtn
                    type="button"
                    onClick={async () => {
                      if (mode === 0) {
                        addTeamEvent();
                      } else {
                        joinTeamEvent();
                      }
                    }}
                  >
                    {teamText[mode].add}
                  </PublicBtn>
                  <PublicBtn
                    type="button"
                    onClick={() => {
                      initInput();
                    }}
                  >
                    취소
                  </PublicBtn>
                </ButtonDiv>
              </ContentDiv>
            )}
          </>
        )}
        {user.teamId && (
          <ContentDiv>
            <Content>{user.teamName}</Content>
            <div>
              <PublicBtn
                type="button"
                data-tip
                data-for="copy"
                data-event="no-event"
                ref={clippedText}
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(user.teamCode);
                    ReactTooltip.show(clippedText.current);

                    setTimeout(() => {
                      ReactTooltip.hide(clippedText.current);
                    }, 1000);
                  } catch {
                    alert(
                      '복사 실패! 같은 오류 계속 발생 시 셀링하니 1:1 채팅으로 문의바랍니다.',
                    );
                  }
                }}
              >
                팀 코드 공유
              </PublicBtn>
              <ReactTooltip id="copy" effect="solid">
                팀 코드 복사 완료!
              </ReactTooltip>
              <AddTeamBtn
                type="button"
                onClick={() => {
                  removeTeamEvent();
                }}
              >
                삭제
              </AddTeamBtn>
            </div>
          </ContentDiv>
        )}
      </InfoRow>
      {mode >= 0 && (
        <>
          <Content />
          <AddTeamCode>
            <TeamInfoText>{teamText[mode].info}</TeamInfoText>
            <UnderlineBtn
              type="button"
              onClick={() => {
                if (mode === 0) setMode(1);
                else setMode(0);
              }}
            >
              {teamText[mode].btnText}
            </UnderlineBtn>
          </AddTeamCode>
        </>
      )}
    </MyInfoDiv>
  );
}

export default index;

const TeamInput = styled.input`
  width: 250px !important;
  height: 40px !important;
  border-radius: 5px;
  text-indent: 10px;
  outline: none;
  border: 1px solid ${(props) => props.theme.colors.gray};
  &:focus,
  &:active {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.gray};
  }
`;

const AddTeamBtn = styled(PublicBtn)`
  margin-left: 0.85rem;

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const AddTeamCode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 8em;
`;
