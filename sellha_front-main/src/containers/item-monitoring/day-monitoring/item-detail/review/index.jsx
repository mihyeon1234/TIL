/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Select, Checkbox } from 'antd';
import Swal from 'sweetalert2';

import {
  DownOutlined,
  QuestionCircleOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { RiAlarmWarningLine } from 'react-icons/ri';
import ReactTooltip from 'react-tooltip';
import StarRatings from 'react-star-ratings';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import ReactExport from 'react-data-export';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReviewAlarm,
  getReviewChart,
  getReviewDetail,
  getReviewExcel,
} from 'http-api';
import {
  fetchChart,
  setChart,
  failChart,
  fetchContent,
  setContent,
  fetchRecentReview,
  setRecentReview,
  setPage,
  setView,
  setSort,
  fetchExcel,
  setExcel,
  initData,
} from './reducer';
import { filterDate, scoreLabel } from '../options';
import ReviewChart from './components/reveiw-chart';

export default function index() {
  const dispatch = useDispatch();
  const { detailInfo } = useSelector((state) => state.monitoringDetail);
  const { pagination, sortType, viewType, contentPage, content } = useSelector(
    (state) => state.reviewMonitor,
  );
  const [isToday, setIsToday] = useState(false);

  const fetchChartData = async () => {
    dispatch(fetchChart());
    try {
      const { result } = await getReviewChart(detailInfo.pid);

      if (result.length === 0) {
        setIsToday(true);
      } else {
        dispatch(setChart(result));
      }
    } catch (error) {
      dispatch(failChart());
    }
  };

  const fetchReviewDetail = async () => {
    dispatch(fetchContent());
    dispatch(fetchRecentReview());
    try {
      const { result } = await getReviewDetail(
        detailInfo.pid,
        sortType,
        viewType,
        contentPage,
      );
      const recent = [];
      for (let i = 0; i < 3; i += 1) {
        recent.push(result.contents[i]);
      }
      dispatch(setRecentReview(recent));
      dispatch(
        setContent({
          content: result.contents,
          pagination: {
            current: 1,
            pageSize: Math.ceil(result.totalElements / 5),
            maxSize: 5,
            total: result.totalElements,
          },
        }),
      );
    } catch (error) {
      // dispatch(failData());
    }
  };

  const fetchReviewPaging = async (page) => {
    dispatch(fetchContent());
    try {
      const { result } = await getReviewDetail(
        detailInfo.pid,
        sortType,
        viewType,
        contentPage + page,
      );
      const newReview = [];
      result.contents.map((review) => newReview.push(review));
      dispatch(
        setContent({
          content: content.concat(newReview),
          contentPage: contentPage + page,
          pagination: {
            ...pagination,
          },
        }),
      );
    } catch (error) {
      // dispatch(failData());
    }
  };

  const fetchReviewSorting = async () => {
    dispatch(fetchContent());
    try {
      const { result } = await getReviewDetail(
        detailInfo.pid,
        sortType,
        viewType,
        contentPage,
      );
      dispatch(
        setContent({
          content: result.contents,
          pagination: {
            current: 1,
            pageSize: Math.ceil(result.totalElements / 5),
            maxSize: 5,
            total: result.totalElements,
          },
        }),
      );
    } catch (error) {
      // dispatch(failData());
    }
  };

  useEffect(() => {
    fetchChartData();
    fetchReviewDetail();

    return () => dispatch(initData());
  }, []);

  return (
    <Container>
      <ReviewAlarm itemDetail={detailInfo} />
      <ReviewRecent itemDetail={detailInfo} isToday={isToday} />
      <ReviewDetail
        fetchReviewPaging={fetchReviewPaging}
        fetchReviewSorting={fetchReviewSorting}
      />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 0.5em;
  animation: fadein 2s;
  -moz-animation: fadein 2s; /* Firefox */
  -webkit-animation: fadein 2s; /* Safari and Chrome */
  -o-animation: fadein 2s; /* Opera */
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .tooltipCSS-review {
    width: 26em;
    font-size: 0.75em;
    font-weight: 300;
    border-radius: 1em;
  }
`;

const QuestionCircle = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.35em;
`;

const PopButton = styled(Button)`
  border-color: transparent;
  box-shadow: none;
  color: ${(props) =>
    props.visible === 'false'
      ? props.theme.colors.darkGray
      : props.theme.colors.primary};
  margin-right: 1em;
  padding: 0.15em 0.5em;
  height: 1.95em;
  :hover {
    border-color: transparent;
  }
`;

function ReviewAlarm({ itemDetail }) {
  const [VisibleDraw, setVisibleDraw] = useState(false);
  const [Score, setScore] = useState([]);
  const AlarmCheck = [];

  const fetchReviewAlarmData = async () => {
    try {
      const result = await fetchReviewAlarm({
        pid: itemDetail.pid,
        set: Score,
      });
      if (result.message === 'ok') {
        Swal.fire({
          text: '저장했습니다.',
          confirmButtonText: `확인`,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
          confirmButtonColor: '#FFC83A',
          allowEnterKey: false,
        });
      }
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  useEffect(() => {
    itemDetail.selectReview.map((value) => {
      if (value.score1_alert === 1) AlarmCheck.push('1');
      if (value.score2_alert === 1) AlarmCheck.push('2');
      if (value.score3_alert === 1) AlarmCheck.push('3');
      if (value.score4_alert === 1) AlarmCheck.push('4');
      if (value.score5_alert === 1) AlarmCheck.push('5');
      return AlarmCheck;
    });
  }, []);

  return (
    <AlarmSection visible={VisibleDraw.toString()}>
      <AlarmHeader onClick={() => setVisibleDraw((prev) => !prev)}>
        <AlarmTitleBox visible={VisibleDraw.toString()}>
          <AlarmTitle>리뷰 알림</AlarmTitle>
          <QuestionCircle data-tip data-for="tooltipAlarm" />
        </AlarmTitleBox>
        <PopButton visible={VisibleDraw.toString()}>
          {VisibleDraw && <UpOutlined />}
          {!VisibleDraw && <DownOutlined />}
        </PopButton>
      </AlarmHeader>
      <ReactTooltip
        id="tooltipAlarm"
        className="tooltipCSS-review"
        place="right"
        effect="solid"
      >
        이 상품의 리뷰 평점을 대상으로 알림을 설정할 수 있습니다.
      </ReactTooltip>
      <AlarmBox visible={VisibleDraw.toString()}>
        <AlarmInfoBox>
          <AlarmWarningIcon />
          <InfoTitle>
            매일 오전 8시 30분 이후에 카카오톡 메시지로 알려 드립니다.
          </InfoTitle>
        </AlarmInfoBox>
        <AlarmSelectBox>
          <Checkbox.Group
            options={scoreLabel}
            defaultValue={AlarmCheck}
            onChange={(value) => {
              setScore(value);
            }}
          />
        </AlarmSelectBox>
        <ButtonBox>
          <SaveButton
            onClick={() => {
              fetchReviewAlarmData();
            }}
          >
            저장
          </SaveButton>
          {/* <ResetButton>초기화</ResetButton> */}
        </ButtonBox>
      </AlarmBox>
    </AlarmSection>
  );
}

const AlarmSection = styled.div`
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.visible === 'false'
        ? props.theme.colors.lightGray
        : props.theme.colors.primary};
  border-radius: 2em;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  padding: 1em;
  margin-bottom: 1.5em;
`;

const AlarmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const AlarmTitleBox = styled.div`
  display: flex;
  margin: 0.85em 0;
  align-items: center;
  color: ${(props) =>
    props.visible === 'false'
      ? props.theme.colors.darkGray
      : props.theme.colors.black};
  @media ${(props) => props.theme.mobile} {
  }
`;

const AlarmTitle = styled.span`
  font-size: 1em;
  font-weight: 600;
  margin-left: 1.5em;
`;

const AlarmBox = styled.div`
  display: ${(props) => (props.visible === 'true' ? 'flex' : 'none')};
  flex-direction: column;
  min-height: 10em;
`;

const AlarmInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5em;
`;

const AlarmWarningIcon = styled(RiAlarmWarningLine)`
  font-size: 1em;
  color: ${(props) => props.theme.colors.primary};
`;

const InfoTitle = styled.span`
  font-size: 0.9em;
  margin: 0 0.5em;
`;

const AlarmSelectBox = styled.div`
  width: 100%;
  margin: 1.8em 0;
  margin-left: 1.5em;
  .ant-checkbox-wrapper {
    font-size: 0.9em;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 0;
  > button {
    margin: 0 0.3em;
  }
`;

const SaveButton = styled(Button)`
  width: 5.5em;
  height: 3em;
  border-radius: 1em;
  font-size: 0.9em;
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  border: none;
  :hover,
  :focus {
    background-color: #5c89fa99;
    color: ${(props) => props.theme.colors.white};
  }
`;

// const ResetButton = styled(Button)`
//   width: 5.5em;
//   height: 3em;
//   border-radius: 1em;
//   font-size: 0.9em;
//   background-color: ${(props) => props.theme.colors.white};
//   color: ${(props) => props.theme.colors.blue};
//   border: 1px solid ${(props) => props.theme.colors.blue};
//   :hover,
//   :focus {
//     background-color: ${(props) => props.theme.colors.white};
//     border: 1px solid #496fd199;
//     color: #496fd199;
//   }
// `;

function ReviewRecent({ itemDetail, isToday }) {
  const dispatch = useDispatch();

  const { chart, recentContent, successRecent, successExcel } = useSelector(
    (state) => state.reviewMonitor,
  );
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());

  const asyncExcel = async () => {
    dispatch(fetchExcel());
    const startYear = StartDate.getFullYear();
    const startMonth = `0${StartDate.getMonth() + 1}`.slice(-2);
    const startDate = `0${StartDate.getDate()}`.slice(-2);
    const formatStartDate = `${startYear}-${startMonth}-${startDate}`;

    const endYear = EndDate.getFullYear();
    const endMonth = `0${EndDate.getMonth() + 1}`.slice(-2);
    const endDate = `0${EndDate.getDate()}`.slice(-2);
    const formatEndDate = `${endYear}-${endMonth}-${endDate}`;

    try {
      const result = await getReviewExcel(
        itemDetail.pid,
        formatStartDate,
        formatEndDate,
      );
      dispatch(setExcel(result.result));
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  const onClickFilter = (e) => {
    const { value } = e.target;
    const nowDate = new Date();

    if (value === '오늘') {
      setStartDate(new Date());
      setEndDate(new Date());
    }
    if (value === '3일') {
      const threeDaysAgo = new Date(
        nowDate.getTime() - 2 * 24 * 60 * 60 * 1000,
      );
      setStartDate(threeDaysAgo);
      setEndDate(new Date());
    }
    if (value === '1주일') {
      const weekAgo = new Date(nowDate.getTime() - 6 * 24 * 60 * 60 * 1000);
      setStartDate(weekAgo);
      setEndDate(new Date());
    }
    if (value === '1개월') {
      const oneMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate(),
      );
      setStartDate(oneMonthAgo);
      setEndDate(new Date());
    }
    if (value === '3개월') {
      const threeMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 3,
        new Date().getDate(),
      );
      setStartDate(threeMonthAgo);
      setEndDate(new Date());
    }
    if (value === '1년') {
      const oneYearAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 12,
        new Date().getDate(),
      );
      setStartDate(oneYearAgo);
      setEndDate(new Date());
    }
    if (value === '초기화') {
      setStartDate();
      setEndDate();
    }
  };

  const formatDate = (date) => {
    const now = new Date(); // 현재 시간
    const writeDate = new Date(date); // 글 작성 시간
    const nowTime = now.getTime();
    const writeTime = writeDate.getTime();
    let minus;
    if (
      now.getFullYear() > writeDate.getFullYear() ||
      now.getMonth() > writeDate.getMonth()
    ) {
      minus = parseInt((nowTime - writeTime) / (1000 * 60 * 60 * 24), 10) - 1;
      if (minus < 0) {
        return `${-minus}일 전`;
      }
      return `${minus}일 전`;
    }
    if (now.getDate() > writeDate.getDate()) {
      minus = now.getDate() - writeDate.getDate();
      return `${minus}일 전`;
    }
    if (now.getDate() === writeDate.getDate()) {
      if (nowTime > writeTime) {
        let sec = parseInt(nowTime - writeTime, 10) / 1000;
        const day = parseInt(sec / 60 / 60 / 24, 10);
        sec -= day * 60 * 60 * 24;
        const hour = parseInt(sec / 60 / 60, 10);
        sec -= hour * 60 * 60;
        const min = parseInt(sec / 60, 10);
        sec = parseInt(sec - min * 60, 10);
        if (hour > 0) {
          return `${hour}시간 전`;
        }
        if (min > 0) {
          return `${min}분 전`;
        }
        if (sec > 0) {
          return `${sec}초 전`;
        }
      }
    }
    return '시간';
  };

  return (
    <ReviewRecentSection>
      <ReviewRecentTitleBox>
        <ReviewRecentTitle>
          최신 리뷰
          <QuestionCircle data-tip data-for="tooltipReviewRecent" />
        </ReviewRecentTitle>
        <ReactTooltip
          id="tooltipReviewRecent"
          className="tooltipCSS-review"
          place="right"
          effect="solid"
        >
          전체 리뷰를 대상으로 평균 평점과 평점대별 리뷰 수를 그래프로 확인할 수
          있고, 이 상품에 작성된 가장 최신 리뷰를 바로 확인할 수 있습니다.
        </ReactTooltip>
        <UpdateDate>
          {isToday
            ? '최신 리뷰 차트는 상품 등록한 다음 날부터 확인할 수 있습니다.'
            : '매일 오전 PC 쇼핑 기준 업데이트'}
        </UpdateDate>
      </ReviewRecentTitleBox>
      <ReviewExtraBox>
        <ExcelButton data-tip data-for="reviewExcel" data-event="click">
          엑셀
        </ExcelButton>
        <ExcelTooltip
          id="reviewExcel"
          place="top"
          effect="solid"
          backgroundColor="#FFF"
          textColor="black"
          arrowColor="transparent"
          clickable
          globalEventOff="click"
        >
          <ExcelContainer>
            <ExcelTitleSection>
              <ExcelTitle>엑셀 다운로드</ExcelTitle>
              <ExcelSubTitle>
                💡 엑셀 다운로드가 가능한 기간은 오늘부터 최대 3개월입니다.
              </ExcelSubTitle>
            </ExcelTitleSection>
            <ExcelDateSection>
              <DateButtonBox>
                {filterDate.map((value) => (
                  <DateButton
                    key={value.id}
                    value={value.filter}
                    onClick={onClickFilter}
                  >
                    {value.filter}
                  </DateButton>
                ))}
              </DateButtonBox>
              <DateSelectBox>
                <Picker
                  selectsStart
                  selected={StartDate}
                  onChange={(value) => setStartDate(value)}
                  startDate={StartDate}
                  endDate={EndDate}
                  locale="ko"
                  dateFormat="yyyy.MM.dd(eee)"
                  placeholderText="날짜를 선택하세요"
                />
                <span>-</span>
                <Picker
                  selectsEnd
                  selected={EndDate}
                  onChange={(value) => setEndDate(value)}
                  startDate={StartDate}
                  endDate={EndDate}
                  locale="ko"
                  dateFormat="yyyy.MM.dd(eee)"
                  placeholderText="날짜를 선택하세요"
                />
              </DateSelectBox>
            </ExcelDateSection>
            <ExcelButtonSection>
              <DownloadButton
                onClick={() => {
                  asyncExcel();
                }}
              >
                다운로드
              </DownloadButton>
              {successExcel && <Excel />}
            </ExcelButtonSection>
          </ExcelContainer>
        </ExcelTooltip>
      </ReviewExtraBox>
      <ReviewContentBox>
        <ChartBox>
          <ReviewChart chart={chart} />
        </ChartBox>
        {successRecent && (
          <RecentBox>
            {recentContent.map(
              (value) =>
                value && (
                  <RecentContent key={value.id}>
                    <RecentRating>
                      <StarRatings
                        rating={value && value.reviewScore}
                        starRatedColor="#FFDA4F"
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="0"
                      />
                      <RecentDate>{formatDate(value.createDate)}</RecentDate>
                    </RecentRating>
                    <RecentReview>{value.reviewContent}</RecentReview>
                  </RecentContent>
                ),
            )}
          </RecentBox>
        )}
      </ReviewContentBox>
    </ReviewRecentSection>
  );
}

const ReviewRecentSection = styled.section`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 2em;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  padding: 1em;
  margin-bottom: 1.5em;
`;

const ReviewRecentTitleBox = styled.div`
  display: flex;
  margin: 0.85em 0;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
  }
`;

const ReviewRecentTitle = styled.span`
  font-size: 1em;
  font-weight: 600;
  margin-left: 1.5em;
  color: ${(props) => props.theme.colors.black};
`;

const UpdateDate = styled.span`
  font-size: 0.5rem;
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 300;
  margin-left: 1em;
`;

const ReviewExtraBox = styled.div`
  .__react_component_tooltip {
    padding: 15px 20px;
  }
`;

// const FilterButton = styled(Button)`
//   width: fit-content;
//   height: 3em;
//   background: ${(props) => props.theme.colors.white};
//   color: ${(props) => props.theme.colors.blue};
//   border: 0.1em solid ${(props) => props.theme.colors.blue};
//   border-radius: 1em;
//   font-size: 0.9em;
//   margin-left: 1.5em;
//   &:hover,
//   &:focus,
//   &:active {
//     font-weight: 600;
//     border: 0.1em solid ${(props) => props.theme.colors.blue};
//     color: ${(props) => props.theme.colors.blue};
//     box-shadow: none;
//   }
//   @media ${(props) => props.theme.mobile} {
//   }
// `;

const ExcelButton = styled(Button)`
  width: fit-content;
  height: 3em;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.green};
  border: 0.1em solid ${(props) => props.theme.colors.green};
  border-radius: 1em;
  font-size: 0.9em;
  margin-left: 1.5em;
  &:hover,
  &:focus,
  &:active {
    font-weight: 600;
    border: 0.1em solid ${(props) => props.theme.colors.green};
    color: ${(props) => props.theme.colors.green};
    box-shadow: none;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const ExcelTooltip = styled(ReactTooltip)`
  box-shadow: 0 3px 6px 4px ${(props) => props.theme.colors.lightGray};
  opacity: 1 !important;
  left: 25em !important;
  border-radius: 25px !important;
`;

const ExcelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 45vh;
  height: 22.5vh;
`;

const ExcelTitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExcelTitle = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;

const ExcelSubTitle = styled.div`
  font-size: 0.95em;
  margin-top: 0.25em;
`;

const ExcelDateSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateButtonBox = styled.div`
  margin-top: 5px;
  margin-bottom: 8px;
`;

const DateButton = styled.button`
  margin-right: 8px;
  width: 50px;
  height: 25px;
  font-size: 12px;
  padding: 0;
  border: 1px solid #ebebeb;
  background-color: ${(props) => props.theme.colors.white};
  :hover {
    border-color: #f6bc21;
    background-color: transparent;
  }
  :focus {
    border-color: #f6bc21;
    background-color: transparent;
    box-shadow: 0 0 0 2px rgb(255, 242, 207);
  }
`;

const DateSelectBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5em;
  .react-datepicker-wrapper {
    width: 9em;
    font-size: 0.95em;
    border-bottom: 1px solid;
  }
`;

const Picker = styled(DatePicker)`
  cursor: pointer;
  padding: 3px;
  font-size: 1em;
  text-align: center;
  outline: none;
  border: none;
  background-color: #fff;
`;

const ExcelButtonSection = styled.div`
  display: flex;
  justify-content: center;
`;

const DownloadButton = styled.button`
  width: 6.5em;
  height: 3em;
  background: ${(props) => props.theme.colors.green};
  color: ${(props) => props.theme.colors.white};
  border-radius: 1em;
  font-size: 0.9em;
  margin-left: 0.5em;
  &:hover,
  &:focus,
  &:active {
    background: #29d12999;
    color: ${(props) => props.theme.colors.white};
    box-shadow: none;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const ReviewContentBox = styled.div`
  display: flex;
`;

const ChartBox = styled.div`
  width: 70%;
  margin-left: 1.5em;
  margin-top: 1em;
  margin-bottom: 1.2em;
`;

const RecentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.5em 2.5em;
`;

const RecentContent = styled.div`
  min-width: 16em;
  max-width: 25em;
  min-height: 5em;
  position: relative;
  background: #f5f5f5;
  box-shadow: 0 2px 6px 1px ${(props) => props.theme.colors.lightGray};
  border-radius: 1.2em;
  padding: 1em;
  margin-bottom: 0.8em;
  :after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-right-color: #f5f5f5;
    border-left: 0;
    border-bottom: 0;
    margin-top: -8px;
    margin-left: -15px;
  }
`;

const RecentRating = styled.div`
  display: flex;
  align-items: center;
`;

const RecentDate = styled.span`
  font-size: 0.85em;
  margin-left: 0.5em;
`;

const RecentReview = styled.div`
  font-size: 0.9em;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 5em;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

function Excel() {
  const { ExcelFile } = ReactExport;
  const { ExcelSheet } = ReactExport.ExcelFile;
  const { ExcelColumn } = ReactExport.ExcelFile;
  const { excel } = useSelector((state) => state.reviewMonitor);

  const formatDate = `${new Date().getFullYear()}-${`0${
    new Date().getMonth() + 1
  }`.slice(-2)}-${`0${new Date().getDate()}`.slice(-2)}`;

  return (
    <ExcelFile hideElement filename={`셀하 리뷰 모니터링 EXCEL ${formatDate}`}>
      <ExcelSheet data={excel} name="sellha_review_monitoring">
        <ExcelColumn label="날짜" value="monitor_date" />
        <ExcelColumn label="5점" value="score5_review_count" />
        <ExcelColumn label="4점" value="score4_review_count" />
        <ExcelColumn label="3점" value="score3_review_count" />
        <ExcelColumn label="2점" value="score2_review_count" />
        <ExcelColumn label="1점" value="score1_review_count" />
        <ExcelColumn label="일별 평균" value="day_average_score" />
        <ExcelColumn label="누적 평균" value="average_review_score" />
        <ExcelColumn label="총 리뷰 수" value="total_review_count" />
      </ExcelSheet>
    </ExcelFile>
  );
}

function ReviewDetail({ fetchReviewPaging, fetchReviewSorting }) {
  const dispatch = useDispatch();
  const { pagination, content, sortType, viewType } = useSelector(
    (state) => state.reviewMonitor,
  );
  const { current, pageSize, maxSize, total } = pagination;

  const { Option } = Select;

  useEffect(() => {
    if (current % 4 === 0) {
      fetchReviewPaging(1);
    }
  }, [current]);

  useEffect(() => {
    fetchReviewSorting();
  }, [sortType, viewType]);

  return (
    <ReviewDetailSection id="review">
      <ReviewTitleBox>
        <ReviewTitle>리뷰</ReviewTitle>
        <ReviewCount>{total && total.toLocaleString()}건</ReviewCount>
      </ReviewTitleBox>
      <ReviewBox>
        <SelectBox>
          <ReviewSorting>
            <SelectSort
              defaultValue="REVIEW_CREATE_DATE_DESC"
              onSelect={(value) => dispatch(setSort(value))}
              showArrow
            >
              <Option value="REVIEW_CREATE_DATE_DESC">최신순</Option>
              <Option value="REVIEW_RANKING">네이버 랭킹순</Option>
              <Option value="REVIEW_SCORE_DESC">평점 높은순</Option>
              <Option value="REVIEW_SCORE_ASC">평점 낮은순</Option>
            </SelectSort>
          </ReviewSorting>
          <ReviewViewing>
            <SelectView
              defaultValue=""
              onSelect={(value) => dispatch(setView(value))}
            >
              <Option value="">전체보기</Option>
              <Option value="PHOTO">포토 / 동영상</Option>
              <Option value="MONTH">한달사용리뷰</Option>
            </SelectView>
          </ReviewViewing>
        </SelectBox>
        {content.length === 0 && (
          <div>
            <ReviewMessage>등록된 후기가 없습니다.</ReviewMessage>
          </div>
        )}
        <ContentBox>
          {content
            ?.slice(current * maxSize - maxSize, current * maxSize)
            .map(
              ({
                createDate,
                id,
                reviewScore,
                writerMemberId,
                productOptionContent,
                reviewContent,
                reviewAttaches,
              }) => {
                const formatDate = format(new Date(createDate), 'yy.MM.dd');
                return (
                  <ReviewContent key={id}>
                    <ReviewCard>
                      <Rating>
                        <StarRatings
                          rating={reviewScore}
                          starRatedColor="#FFDA4F"
                          numberOfStars={5}
                          name="rating"
                          starDimension="15px"
                          starSpacing="0"
                        />

                        <RatingNumber>{reviewScore}</RatingNumber>
                      </Rating>
                      <Optional>
                        <OptionWriter>{writerMemberId}</OptionWriter>
                        <OptionDate>{formatDate}</OptionDate>
                        <OptionContent>{productOptionContent}</OptionContent>
                      </Optional>
                      <Content>{reviewContent}</Content>
                    </ReviewCard>
                    {reviewAttaches?.length > 0 && (
                      <ReviewImage>
                        <ContentImage
                          src={reviewAttaches[0].attachUrl}
                          alt="img"
                          data-tip
                          data-for={reviewAttaches[0].id}
                        />
                        <ReactTooltip
                          id={reviewAttaches[0].id}
                          place="right"
                          effect="solid"
                          type="light"
                        >
                          <OriginImage
                            src={reviewAttaches[0].attachUrl}
                            alt="img"
                          />
                        </ReactTooltip>
                      </ReviewImage>
                    )}
                  </ReviewContent>
                );
              },
            )}
        </ContentBox>
        <PaginationBox>
          <PageBtnRoot>
            {current > 1 && (
              <PrevButton
                onClick={() => {
                  dispatch(
                    setPage({
                      pagination: {
                        ...pagination,
                        current: current - 1,
                      },
                    }),
                  );
                  const element = document.getElementById('review');
                  element.scrollIntoView({
                    alignToTop: 'true',
                    behavior: 'smooth',
                  });
                }}
              />
            )}
            {current <= 1 && <PrevButtonDisabled />}
            <BtnOptions>
              <BtnOptionCurrent>{current}</BtnOptionCurrent>
              <Slash>/</Slash>
              <BtnOptionTotal>{pageSize}</BtnOptionTotal>
            </BtnOptions>
            {total - 1 >= current * maxSize && (
              <NextButton
                onClick={() => {
                  dispatch(
                    setPage({
                      pagination: {
                        ...pagination,
                        current: current + 1,
                      },
                    }),
                  );
                  const element = document.getElementById('review');
                  element.scrollIntoView({
                    alignToTop: 'true',
                    behavior: 'smooth',
                  });
                }}
              />
            )}
            {total - 1 < current * maxSize && <NextButtonDisabled />}
          </PageBtnRoot>
        </PaginationBox>
      </ReviewBox>
    </ReviewDetailSection>
  );
}

const ReviewDetailSection = styled.section`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 2em;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  padding: 1em;
  margin-bottom: 1.5em;
`;

const ReviewTitleBox = styled.div`
  display: flex;
  margin: 0.85em 0;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
  }
`;

const ReviewTitle = styled.span`
  font-size: 1.15em;
  margin-left: 1.5em;
  color: ${(props) => props.theme.colors.black};
`;

const ReviewBox = styled.div`
  width: 95%;
  height: fit-content;
  align-items: center;
  margin-left: 1.5em;
`;

const SelectBox = styled.div`
  display: flex;
  margin: 1.35em 0;
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    height: 2.75em;
    border-radius: 1em;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item {
    line-height: 3;
    padding-left: 0.5em;
    font-size: 0.9em;
  }
`;

const ReviewSorting = styled.div`
  margin-right: 0.9em;
`;

const SelectSort = styled(Select)`
  width: 9em;
`;

const ReviewViewing = styled.div``;

const SelectView = styled(Select)`
  width: 9em;
`;

const ReviewCount = styled.div`
  font-size: 1.15em;
  padding-left: 0.3rem;
  font-weight: 600;
`;

const ReviewMessage = styled.div`
  font-size: 0.95em;
`;

const ContentBox = styled.div`
  min-height: 50em;
  > div:nth-child(5) {
    border-bottom: none;
  }
`;

const ReviewContent = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
  padding: 2em 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.lineGray};
`;

const ReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 88%;
`;

const Rating = styled.div`
  width: fit-content;
  .widget-ratings {
    top: 2px;
  }
`;
const RatingNumber = styled.span`
  margin-left: 0.3em;
  font-weight: bold;
  font-size: 0.9em;
`;

const Optional = styled.div`
  display: flex;
  width: fit-content;
  font-size: 0.85em;
  color: #999999;
`;

const OptionWriter = styled.div``;

const OptionDate = styled.div`
  padding-left: 1em;
`;

const OptionContent = styled.div`
  padding-left: 1em;
`;

const Content = styled.div`
  margin-top: 2em;
  font-size: 0.95em;
  white-space: pre-wrap;
`;

const ReviewImage = styled.div`
  .__react_component_tooltip {
    opacity: 1 !important;
    padding: 5px;
  }
`;

const ContentImage = styled.img`
  width: 6.5em;
  max-height: 7.5em;
  cursor: pointer;
  border-radius: 0.5em;
`;

const OriginImage = styled.img`
  width: 25em;
  height: 30em;
  border-radius: 0.5em;
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 3em 0;
`;

const PageBtnRoot = styled.div`
  display: flex;
`;

const PrevButton = styled.button`
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 26L10 16L20 6' stroke='%23747474' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 1.5em;
  &:hover {
    cursor: pointer;
    transition: 500ms;
    background-color: transparent;
  }
  &:focus {
    background-color: transparent;
  }
`;

const PrevButtonDisabled = styled.button`
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 26L10 16L20 6' stroke='%23EBEBEB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 1.5em;
  &:hover {
    background-color: transparent;
  }
  &:focus {
    background-color: transparent;
  }
`;

const NextButton = styled.button`
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 6L22 16L12 26' stroke='%23747474' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 1.5em;
  &:hover {
    cursor: pointer;
    transition: 500ms;
    background-color: transparent;
  }
  &:focus {
    background-color: transparent;
  }
`;

const NextButtonDisabled = styled.button`
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 6L22 16L12 26' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 1.5em;
  &:hover {
    cursor: pointer;
    transition: 500ms;
    background-color: transparent;
  }
  &:focus {
    background-color: transparent;
  }
`;

const BtnOptions = styled.span`
  margin: 0 1em;
  font-size: 0.9em;
  color: #666;
`;

const BtnOptionCurrent = styled.strong`
  color: #f6bc21;
  width: fit-content;
`;

const BtnOptionTotal = styled.span`
  width: fit-content;
`;

const Slash = styled.span`
  color: #ebebeb;
  margin: 0 0.5em;
`;
