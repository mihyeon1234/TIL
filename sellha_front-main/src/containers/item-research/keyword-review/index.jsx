import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Tabs } from 'antd';
import ReactGA from 'react-ga';
import { getProject } from 'http-api';
import {
  failData,
  fetchData,
  successTeamData,
  successUserData,
} from './reducer';

import ReviewHeader from './components/search/index';
import UploadModal from './components/modal/index';
import ResultTable from './components/table/index';

const { TabPane } = Tabs;

function ReviewPage() {
  const dispatch = useDispatch();

  const { teamId, teamName } = useSelector((state) => state.user);
  // const project = useSelector((state) => state.project);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPage, setModalPage] = useState(1);
  const [uploadForm, setUploadForm] = useState({
    projectType: '',
    mainKeyword: '',
    subKeyword: '',
    manager: '',
    closingDate: '',
    status: '시장조사',
    content: '',
    files: [],
  });

  // const { userData } = project;

  const fetchList = async () => {
    async function fetching() {
      try {
        const resTeamProject = await getProject(teamId);
        const resUserProject = await getProject(null);

        dispatch(successTeamData(resTeamProject));
        dispatch(successUserData(resUserProject));
      } catch (err) {
        dispatch(failData());
      }
    }
    dispatch(fetchData());
    fetching(); // 데이터 불러오기
  };

  useEffect(() => {
    document.title = `셀링하니`;

    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    fetchList();
  }, []);

  return (
    <Container>
      <ReviewHeader />

      <StyledTabs defaultActiveKey={teamId ? '1' : '2'}>
        <TabPane
          tab="팀 리뷰"
          key="1"
          style={{ textAlign: 'center' }}
          disabled={!teamId}
        >
          {teamId && (
            <TeamInfoDiv>
              등록된 팀(<TeamName>{teamName}</TeamName>) 키워드 리뷰 결과
              입니다.
            </TeamInfoDiv>
          )}
          {!teamId && <TeamInfoDiv>등록된 팀이 없습니다.</TeamInfoDiv>}

          <ResultTable
            target="team"
            setModalPage={setModalPage}
            setUploadForm={setUploadForm}
            setIsModalVisible={setIsModalVisible}
            fetchList={fetchList}
          />
        </TabPane>

        <StyledPane tab="개인 리뷰" key="2">
          <TeamInfoDiv>개인 키워드 리뷰 결과 입니다.</TeamInfoDiv>
          {/*  */}
          <ResultTable
            target="person"
            setModalPage={setModalPage}
            setUploadForm={setUploadForm}
            setIsModalVisible={setIsModalVisible}
            fetchList={fetchList}
          />
        </StyledPane>
      </StyledTabs>

      <UploadModal
        uploadForm={uploadForm}
        setUploadForm={setUploadForm}
        modalPage={modalPage}
        setModalPage={setModalPage}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        fetchList={fetchList}
      />
    </Container>
  );
}

export default ReviewPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.2em 6.5em;
  min-height: 63vh;
  > .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
  }
  > .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list > .ant-tabs-tab {
    width: 100%;
  }

  .ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-bottom > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before,
  .ant-tabs-bottom > div > .ant-tabs-nav::before {
    border-bottom: none;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    margin: 0 auto;
    color: black;
    font-size: 1.1em;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn .ant-tabs-tab-btn,
  .ant-tabs-tab-btn {
    margin: 0 auto;
    font-size: 1.1em;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 2%;
  }
  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-operations,
  .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-operations {
    display: none;
  }
`;

const TeamInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #ffda4f80;
  border-radius: 20px;
  padding: 1.5em 2em;

  margin-bottom: 1em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;
const TeamName = styled.div`
  color: #8280f8;
`;

const StyledTabs = styled(Tabs)``;

const StyledPane = styled(TabPane)``;
