/* eslint-disable camelcase */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button, Select, Table } from 'antd';
import {
  LoadingOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Collapse } from 'react-collapse';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';

import { fetchSortingTable, fetchSortType, getKeywordExcel } from 'http-api';
import {
  fetchExcel,
  setExcel,
  setRankSort,
  setSort,
  setSortTable,
  setVisibleEdit,
  unsetTable,
} from '../reducer';
import { getRankingPage, showAlert } from '../utils';
import { filterDate } from '../../options';

import Excel from './excel';
import RankingChangeLog from './change-log';
import RankingNoteLog from './note-log';

registerLocale('ko', ko);
const { Option } = Select;

function index({ asyncRakingTable }) {
  const dispatch = useDispatch();
  const { loading, success, table, successExcel, sortType, rankSort } =
    useSelector((state) => state.keywordMonitor);
  const { detailInfo, selectItem } = useSelector(
    (state) => state.monitoringDetail,
  );

  const { list, date, history, memo } = table;

  const [dataList, setDataList] = useState([]);
  const [ChangeCollapse, setChangeCollapse] = useState(false);
  const [NoteCollapse, setNoteCollapse] = useState(false);
  const [ChangeDate, setChangeDate] = useState();
  const [NoteDate, setNoteDate] = useState();
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());

  const SortableItem = sortableElement((props) => <tr {...props} />);
  const SortableContainer = sortableContainer((props) => <tbody {...props} />);
  const DragHandle = sortableHandle(() => <KeywordSortIcon />);

  const asyncSaveSortType = async () => {
    // sortType back에 저장!
    try {
      await fetchSortType({
        pid: detailInfo.pid,
        sortType,
      });
      dispatch(setSort(sortType));
      showAlert('저장되었습니다.');
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };
  const asyncSortingTable = async (sortingTable) => {
    try {
      await fetchSortingTable({
        pid: detailInfo.pid,
        keywordList: sortingTable,
      });

      if (sortType === 'custom') dispatch(setSortTable(sortingTable));
    } catch (error) {
      dispatch(unsetTable());
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

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
      const { result } = await getKeywordExcel(
        detailInfo.pid,
        formatStartDate,
        formatEndDate,
      );
      dispatch(setExcel(result));
      dispatch(fetchExcel());
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  useEffect(() => {
    setDataList(list);
  }, [list]);

  useEffect(() => {
    const sortMonth = `0${new Date().getMonth() + 1}`.slice(-2);
    const sortDay = `0${new Date().getDate()}`.slice(-2);
    const sortDate = `${sortMonth}. ${sortDay}`;

    if (sortType === 'custom') {
      setDataList(list);
    }
    if (sortType === 'date') {
      const sortList = [...dataList];
      sortList.sort((a, b) => {
        if (a?.kid < b?.kid) {
          return 1;
        }
        if (a?.kid > b?.kid) {
          return -1;
        }
        return 0;
      });
      setDataList(sortList);
    }
    if (sortType === 'search') {
      const sortList = [...dataList];
      sortList.sort((a, b) => {
        if (a?.amount < b?.amount) {
          return 1;
        }
        if (a?.amount > b?.amount) {
          return -1;
        }
        return 0;
      });
      setDataList(sortList);
    }
    if (sortType === 'rankDesc') {
      const sortList = [...dataList];
      sortList.sort((a, b) => {
        if (a[sortDate]?.rank === b[sortDate]?.rank) {
          return 0;
        }
        if (a[sortDate]?.rank === null) {
          return 1;
        }
        if (b[sortDate]?.rank === null) {
          return -1;
        }
        return a[sortDate]?.rank - b[sortDate]?.rank;
      });
      setDataList(sortList);
    }
    if (sortType === 'rankAsc') {
      const sortList = [...dataList];
      sortList.sort((a, b) => {
        if (a[sortDate]?.rank === b[sortDate]?.rank) {
          return 0;
        }
        if (a[sortDate]?.rank === null) {
          return 1;
        }
        if (b[sortDate]?.rank === null) {
          return -1;
        }
        return b[sortDate]?.rank - a[sortDate]?.rank;
      });
      setDataList(sortList);
    }
  }, [sortType]);

  const DraggableContainer = (props) => (
    <SortableContainer
      helperClass="row-dragging"
      useDragHandle
      disableAutoscroll
      onSortEnd={({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
          const sortingTable = arrayMove(
            [].concat(dataList),
            oldIndex,
            newIndex,
          );
          setDataList(sortingTable);
          asyncSortingTable(sortingTable);
        }
      }}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    if (dataList) {
      const rowIndex = dataList.findIndex(
        (value) => value.keyword === restProps['data-row-key'],
      );
      return <SortableItem index={rowIndex} {...restProps} />;
    }
    return <></>;
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
    /*
     * NOTE: 1년 필터 없는 것으로 임시 처리
     */
    // if (value === '1년') {
    //   const oneYearAgo = new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth() - 12,
    //     new Date().getDate(),
    //   );
    //   setStartDate(oneYearAgo);
    //   setEndDate(new Date());
    // }
    if (value === '초기화') {
      setStartDate();
      setEndDate();
    }
  };

  const columns = [
    {
      title: '키워드',
      dataIndex: 'keyword',
      key: 'keyword',
      width: 140,
      fixed: 'left',
      className: 'drag-visible',
      render: (keyword) => (
        <KeywordBox>
          {sortType === 'custom' && <DragHandle />}
          <Keyword>{keyword}</Keyword>
        </KeywordBox>
      ),
    },
    {
      title: '검색량',
      dataIndex: 'amount',
      key: 'amount',
      width: 85,
      fixed: 'left',
      render: (amount) => (
        // eslint-disable-next-line react/destructuring-assignment
        <Amount>{amount === null ? '-' : amount.toLocaleString()}</Amount>
      ),
    },
  ];

  for (const key in date) {
    const addColumns = {
      title: () => {
        if (Object.keys(history).includes(date[key])) {
          return (
            <ColumnBox>
              <HistoryDateColumn
                data-tip
                data-for={date[key]}
                onClick={() => {
                  // 선택한 날짜 = 열린 변동내역 날짜면 변동내역 닫힘
                  if (ChangeDate === date[key]) {
                    setChangeDate(date[key]);
                    setChangeCollapse(!ChangeCollapse);
                  } else {
                    setChangeDate(date[key]);
                    setChangeCollapse(true);
                  }
                  if (NoteDate === date[key]) {
                    setNoteDate(date[key]);
                    setNoteCollapse(!NoteCollapse);
                  } else {
                    setNoteDate(date[key]);
                    setNoteCollapse(true);
                  }
                }}
                onKeyPress={() => {
                  if (ChangeDate === date[key]) {
                    setChangeDate(date[key]);
                    setChangeCollapse(!ChangeCollapse);
                  } else {
                    setChangeDate(date[key]);
                    setChangeCollapse(true);
                  }
                }}
                role="button"
                tabIndex="0"
              >
                {date[key]}
              </HistoryDateColumn>
              {!memo[date[key]] && (
                <MemoTracking>
                  <span className="memo" />
                </MemoTracking>
              )}
              {memo[date[key]] && (
                <MemoTracking>
                  <span className="memo-on" />
                </MemoTracking>
              )}
              <ReactTooltip
                className="dateTooltip"
                id={date[key]}
                place="top"
                effect="solid"
                backgroundColor="#FFC83A"
                textColor="#000000c3"
                delayShow={100}
              >
                {history[date[key]]
                  .map((value) => {
                    if (value.change_content === 'price') return '가격';
                    if (value.change_content === 'title') return '제목';
                    if (value.change_content === 'image') return '이미지';
                    return '태그';
                  })
                  .join()}
                {` 변동`}
              </ReactTooltip>
            </ColumnBox>
          );
        }
        return (
          <ColumnBox>
            <DateColumn
              onClick={() => {
                if (NoteDate === date[key]) {
                  setNoteDate(date[key]);
                  setNoteCollapse(!NoteCollapse);
                } else {
                  setNoteDate(date[key]);
                  setNoteCollapse(true);
                }
              }}
            >
              {date[key]}
              {!memo[date[key]] && (
                <MemoTracking>
                  <span className="memo" />
                </MemoTracking>
              )}
              {memo[date[key]] && (
                <MemoTracking>
                  <span className="memo-on" />
                </MemoTracking>
              )}
            </DateColumn>
          </ColumnBox>
        );
      },
      dataIndex: date[key],
      key: date[key],
      width: date[key] === undefined ? '0px' : '220px',
      render: (value = []) => {
        const {
          first,
          rank,
          rank_change,
          is_set,
          set_type,
          set_rank,
          set_rank_change,
          ad_rank,
          ad_rank_change,
          is_compare,
        } = value;
        if (first) {
          // 신규 키워드 등록 날짜 표시
          return (
            <UpdateData data-tip data-for="updateTooltip">
              업데이트 중
              <ReactTooltip
                className="updateTooltip"
                id="updateTooltip"
                place="left"
                backgroundColor="#4a4a4a"
                textColor="#fff"
                effect="solid"
              >
                새로 입력된 키워드의 순위는 5~10분 후 확인할 수 있습니다.
              </ReactTooltip>
            </UpdateData>
          );
        }
        // 신규 키워드 등록 이전 날짜 순위 표시
        if (rank === 'NA') return <NoRankingDiv>-</NoRankingDiv>;
        // 기존 키워드 순위 표시
        return (
          <RankingDiv>
            {rankSort !== 'adRank' && (
              <>
                <DefaultRankingDiv>
                  {rank === null && (
                    <>
                      <RankingOut>1600위 밖</RankingOut>
                      {rank_change === 'OUT' && (
                        <RankingDown>▼ {rank_change}</RankingDown>
                      )}
                    </>
                  )}
                  {parseInt(rank, 10) > 1600 && (
                    <>
                      <RankingOut>1600위 밖</RankingOut>
                      {Math.sign(rank_change) === 0 && null}
                      {Math.sign(rank_change).isNaN && null}
                      {Math.sign(rank_change) === -1 && (
                        <RankingDown>
                          ▼ {Math.sqrt(rank_change ** 2)}
                        </RankingDown>
                      )}
                      {rank_change === 'OUT' && (
                        <RankingDown>▼ {rank_change}</RankingDown>
                      )}
                      {rank_change === 'IN' && (
                        <RankingUp>▲ {rank_change}</RankingUp>
                      )}
                    </>
                  )}
                  {parseInt(rank, 10) <= 1600 && (
                    <>
                      <div style={{ width: '118px' }}>
                        <span>{rank}위</span>
                        <RankingPageText>
                          {` - ${getRankingPage(rank).pageNum}페이지 ${
                            getRankingPage(rank).rankingNum
                          }위`}
                        </RankingPageText>
                      </div>
                      {Math.sign(rank_change) === 0 && null}
                      {Math.sign(rank_change).isNaN && null}
                      {Math.sign(rank_change) === -1 && (
                        <RankingDown>
                          ▼ {Math.sqrt(rank_change ** 2)}
                        </RankingDown>
                      )}
                      {Math.sign(rank_change) > 0 && (
                        <RankingUp>▲ {rank_change}</RankingUp>
                      )}
                      {rank_change === 'OUT' && (
                        <RankingDown>▼ {rank_change}</RankingDown>
                      )}
                      {rank_change === 'IN' && (
                        <RankingUp>▲ {rank_change}</RankingUp>
                      )}
                    </>
                  )}
                </DefaultRankingDiv>
                <SetMallRankingDiv>
                  <SetRankingDiv>
                    {is_compare === 1 && <SetLowPrice>가격비교</SetLowPrice>}
                    {is_set === 1 && set_type === 0 && (
                      <SetLowPrice>최저가묶음</SetLowPrice>
                    )}
                    {is_set === 1 && set_type === 1 && (
                      <SetBrand>브랜드묶음</SetBrand>
                    )}
                    {set_rank && (
                      <span>
                        <SetRanking>내 {set_rank}위</SetRanking>
                        {Math.sign(set_rank_change) === 0 && null}
                        {Math.sign(set_rank_change).isNaN && null}
                        {Math.sign(set_rank_change) === -1 && (
                          <SetRankingDown>
                            ▼ {Math.sqrt(set_rank_change ** 2)}
                          </SetRankingDown>
                        )}
                        {Math.sign(set_rank_change) > 0 && (
                          <SetRankingUp>▲ {set_rank_change}</SetRankingUp>
                        )}
                        {set_rank_change === 'OUT' && (
                          <SetRankingDown>▼ {set_rank_change}</SetRankingDown>
                        )}
                        {set_rank_change === 'IN' && (
                          <SetRankingUp>▲ {set_rank_change}</SetRankingUp>
                        )}
                      </span>
                    )}
                  </SetRankingDiv>
                </SetMallRankingDiv>
              </>
            )}
            {ad_rank && rankSort !== 'normalRank' && (
              <AdRankingDiv>
                <SetAdTag>광고순위</SetAdTag>
                <SetAdRanking>{ad_rank}위</SetAdRanking>
                {Math.sign(ad_rank_change) === 0 && null}
                {Math.sign(ad_rank_change).isNaN && null}
                {Math.sign(ad_rank_change) === -1 && (
                  <SetRankingDown>
                    ▼ {Math.sqrt(ad_rank_change ** 2)}
                  </SetRankingDown>
                )}
                {Math.sign(ad_rank_change) > 0 && (
                  <SetRankingUp>▲ {ad_rank_change}</SetRankingUp>
                )}
                {ad_rank_change === 'OUT' && (
                  <SetRankingDown>▼ {ad_rank_change}</SetRankingDown>
                )}
                {ad_rank_change === 'IN' && (
                  <SetRankingUp>▲ {ad_rank_change}</SetRankingUp>
                )}
              </AdRankingDiv>
            )}
          </RankingDiv>
        );
      },
    };
    columns.push(addColumns);
  }
  const tailColumns = {
    title: '',
  };
  columns.push(tailColumns);

  if (loading) {
    return <Loading />;
  }

  if (!success) {
    return <Loading />;
  }

  if (list.length === 0) {
    return (
      <RankingSection>
        <RankingTitleBox>
          <RankingTitle>순위 모니터링</RankingTitle>
          <QuestionCircle data-tip data-for="tooltipRanking" />
          <ReactTooltip
            id="tooltipRanking"
            className="tooltipCSS-keyword"
            place="right"
            effect="solid"
          >
            이 상품을 대상으로 등록한 키워드별로 몇 위에 노출되고 있는지 확인할
            수 있습니다. 상품 정보의 변동내역을 확인하고 직접 기록할 수도
            있습니다.
          </ReactTooltip>
        </RankingTitleBox>
        <InfoBox>
          <InfoText>모니터링 하고있는 키워드가 없어요 😮</InfoText>
          <InfoSubText>
            일일 순위를 체크할 키워드를 지금 바로 등록해보세요!
          </InfoSubText>
          <InfoAddButton
            type="button"
            onClick={() =>
              selectItem.member_id === -111
                ? showAlert(
                    '예시 상품은 키워드 추가/편집 기능을 이용할 수 없습니다. <br/> 상품을 직접 등록하여 이용해보세요!',
                  )
                : dispatch(setVisibleEdit())
            }
          >
            키워드 추가하기
          </InfoAddButton>
        </InfoBox>
      </RankingSection>
    );
  }

  return (
    <RankingSection>
      <RankingTitleBox>
        <RankingTitle>순위 모니터링</RankingTitle>
        <QuestionCircle data-tip data-for="tooltipRanking" />
        <ReactTooltip
          id="tooltipRanking"
          className="tooltipCSS-keyword"
          place="right"
          effect="solid"
        >
          1️⃣ 이 상품을 대상으로 등록한 키워드별로 몇 위에 노출되고 있는지 확인할
          수 있습니다.
          <br />
          2️⃣ 등록한 날짜로부터 최대 2개월 간의 데이터를 확인하고 상품의 가격,
          제목, 이미지, 태그의 변동내역을 추적할 수 있습니다.
          <br />
          3️⃣ 순위 변동에 어떤 일이 있었는지 해당 날짜에 기록할 수도 있습니다.
        </ReactTooltip>
        <UpdateDate>매일 오전 PC 쇼핑 기준 업데이트</UpdateDate>
      </RankingTitleBox>
      {list.length > 0 && (
        <>
          <RankingCollapseBox>
            <Collapse isOpened={ChangeCollapse}>
              {history && ChangeDate && (
                <RankingChangeLog history={history} ChangeDate={ChangeDate} />
              )}
            </Collapse>
            <Collapse isOpened={NoteCollapse}>
              {memo && NoteDate && (
                <RankingNoteLog
                  memo={memo}
                  NoteDate={NoteDate}
                  asyncRakingTable={asyncRakingTable}
                />
              )}
            </Collapse>
          </RankingCollapseBox>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <RankingExtraBox>
              <ExcelButton data-tip data-for="rankingExcel" data-event="click">
                엑셀
              </ExcelButton>
              <ExcelTooltip
                id="rankingExcel"
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
                      💡 엑셀 다운로드가 가능한 기간은 오늘부터 최대
                      3개월입니다.
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
                      <DateDash>-</DateDash>
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
                    <DownloadButton onClick={() => asyncExcel()}>
                      다운로드
                    </DownloadButton>
                    {successExcel && <Excel />}
                    {/* {successExcel && <Excel />} */}
                  </ExcelButtonSection>
                </ExcelContainer>
              </ExcelTooltip>
              <TableSorting>
                <SelectSort
                  defaultValue={sortType}
                  value={sortType}
                  onSelect={(value) => dispatch(setSort(value))}
                  showArrow
                >
                  <Option value="custom">셀러 관심순</Option>
                  <Option value="date">등록 날짜순</Option>
                  <Option value="search">검색량순</Option>
                  <Option value="rankDesc">오늘 순위 높은순</Option>
                  <Option value="rankAsc">오늘 순위 낮은순</Option>
                </SelectSort>
              </TableSorting>
              <SaveButton onClick={asyncSaveSortType}>저장</SaveButton>
            </RankingExtraBox>
            <TableSorting>
              <SelectRankSort
                defaultValue="default"
                onSelect={(value) => dispatch(setRankSort(value))}
                showArrow
              >
                <Option value="default">통합 순위</Option>
                <Option value="normalRank">일반 순위</Option>
                <Option value="adRank">광고 순위</Option>
              </SelectRankSort>
            </TableSorting>
          </div>
          <RankingTableBox>
            {selectItem.is_delete === 1 && (
              <DeleteItemText>
                이 상품은 삭제된 상품으로, 현재는 삭제되기 이전의 순위 데이터만
                조회할 수 있습니다.
              </DeleteItemText>
            )}
            <TableBody
              size="small"
              columns={columns}
              dataSource={dataList} // dataSource={isOpen ? data : data.slice(0, 3)}
              pagination={false}
              sticky="true"
              scroll={{ x: 1198 }}
              rowKey={(record) => record.keyword}
              components={
                sortType === 'custom' && {
                  body: {
                    wrapper: DraggableContainer,
                    row: DraggableBodyRow,
                  },
                }
              }
            />
          </RankingTableBox>
        </>
      )}
    </RankingSection>
  );
}

export default index;
const SaveButton = styled(Button)`
  width: fit-content;
  height: 3em;
  background: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  border-radius: 1em;
  font-size: 0.9em;

  &:hover,
  &:focus,
  &:active {
    background: ${(props) => props.theme.colors.blue};
    color: ${(props) => props.theme.colors.white};
    border: 0.1em solid ${(props) => props.theme.colors.blue};
  }
`;

const Loading = styled(LoadingOutlined)`
  width: 100%;
  min-height: 33vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;

const RankingSection = styled.div`
  width: 100%;
  border-radius: 2em;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  padding: 1em;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
  .dateTooltip {
    border-radius: 1.25em;
    font-size: 0.8em;
    padding: 0.6em 1em;
  }
`;

const RankingTitleBox = styled.div`
  display: flex;
  margin: 0.85em 0;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
  }
`;

const RankingTitle = styled.span`
  font-size: 1em;
  font-weight: 600;
  margin-left: 1.5em;
`;

const RankingExtraBox = styled.div`
  display: flex;
  margin: 0.5em 0 0.5em 1.5em;
  .__react_component_tooltip {
    padding: 15px 20px;
  }
`;

const RankingCollapseBox = styled.div`
  .ReactCollapse--collapse {
    transition: height 500ms;
  }
`;

const RankingTableBox = styled.div`
  width: 95%;
  margin-left: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 2.5em;
  .ant-table-thead .ant-table-cell {
    ::before {
      width: 0;
    }
  }
`;

const DeleteItemText = styled.div`
  font-size: 0.75rem;
  margin: 0.5em 0 1.5em 0;
  width: fit-content;
  font-weight: 500;
  background: linear-gradient(to top, #fd280b38 28%, transparent 35%);
`;

const UpdateDate = styled.span`
  font-size: 0.5em;
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 200;
  margin-left: 1em;
`;

const TableSorting = styled.div`
  margin-right: 0.9em;
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    height: 2.75em;
    border-radius: 1em;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item {
    line-height: 3;
    padding-left: 0.5em;
    font-size: 0.9em;
  }
  > div:nth-child(1) span.ant-select-arrow {
    color: ${(props) => props.theme.colors.blue};
  }
  > div:nth-child(1).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border: 1px solid ${(props) => props.theme.colors.blue};
    color: ${(props) => props.theme.colors.blue};
  }
  > div:nth-child(1).ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    color: ${(props) => props.theme.colors.blue};
    border-color: ${(props) => props.theme.colors.blue};
    box-shadow: none;
  }
  > div:nth-child(2) span.ant-select-arrow {
    color: ${(props) => props.theme.colors.lightOrange};
  }
  > div:nth-child(2).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border: 1px solid ${(props) => props.theme.colors.lightOrange};
    color: ${(props) => props.theme.colors.lightOrange};
  }
  > div:nth-child(2).ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    color: ${(props) => props.theme.colors.lightOrange};
    border-color: ${(props) => props.theme.colors.lightOrange};
    box-shadow: none;
  }
`;

const SelectSort = styled(Select)`
  width: 10em;
`;

const SelectRankSort = styled(Select)`
  margin-right: 0.9em;
  width: 8em;
`;

const ExcelButton = styled(Button)`
  width: fit-content;
  height: 3em;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.green};
  border: 0.1em solid ${(props) => props.theme.colors.green};
  border-radius: 1em;
  font-size: 0.9em;
  margin-right: 0.9em;

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

const DateDash = styled.span``;

const ExcelButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;
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

const KeywordSortIcon = styled(MenuOutlined)`
  cursor: pointer;
  color: #b3b1ab;
  font-size: 0.8em;
`;

const KeywordBox = styled.div`
  display: flex;
  align-items: center;
  word-wrap: break-word;
  word-break: break-word;
`;

const Keyword = styled.span`
  text-align: left;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
  margin-left: 0.7rem;
`;

const Amount = styled.span`
  background-color: #f6faf0; //#f2faf8;
  color: #9eb5a7;
  padding: 2px 5px;
  border-radius: 0.1em;
  font-weight: 500;
  margin: auto;
  position: relative;
  font-size: 0.75em;
  margin-right: 1em;
`;

const TableBody = styled(Table)`
  .ant-table-body {
    /* white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -ms-overflow-style: none; */
    scrollbar-width: none;
    ::-webkit-scrollbar {
      bottom: 0;
      height: 10px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background-color: transparent;
      background-clip: padding-box;
      border: 1px solid transparent;
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.089);
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
      display: none;
    }
  }
  .ant-table-small .ant-table-thead > tr > th {
    padding: 10px 15px;
    background-color: ${(props) => props.theme.colors.white};
    font-size: 0.8rem;
    border-bottom: 0.1em solid ${(props) => props.theme.colors.lightGray};
    color: ${(props) => props.theme.colors.darkGray};
  }
  .ant-table.ant-table-small .ant-table-tbody > tr > td {
    padding: 10px 15px;
  }
  .ant-table-filter-trigger-container {
    background: #fff;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    width: 0;
  }
  thead > tr > th:nth-child(2) {
    border-right: 0.1em solid ${(props) => props.theme.colors.lightGray};
    border-bottom: 0.1em solid ${(props) => props.theme.colors.lightGray};
  }
  tbody > tr > .ant-table-cell-fix-left-last {
    border-right: 0.1em solid ${(props) => props.theme.colors.lightGray};
  }
  tbody > tr > td {
    font-size: 0.75rem;
  }
  td.ant-table-cell-fix-left-last {
    text-align: right;
  }
`;

const ColumnBox = styled.div`
  height: 15px;
  :hover .memo {
    position: relative;
    width: 15px;
    height: 15px;
    background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.625 5.625H4.375V6.875H5.625V5.625Z' fill='%23C2C2C2'/%3E%3Cpath d='M6.875 5.625H8.125V6.875H6.875V5.625Z' fill='%23C2C2C2'/%3E%3Cpath d='M10.625 5.625H9.375V6.875H10.625V5.625Z' fill='%23C2C2C2'/%3E%3Cpath d='M1.875 3.125V13.125L4.875 10.875C5.09114 10.7123 5.35446 10.6245 5.625 10.625H11.875C12.5654 10.625 13.125 10.0654 13.125 9.375V3.125C13.125 2.43464 12.5654 1.875 11.875 1.875H3.125C2.43464 1.875 1.875 2.43464 1.875 3.125ZM3.125 10.625V3.125H11.875V9.375H5.20875C4.93817 9.37427 4.67478 9.46207 4.45875 9.625L3.125 10.625Z' fill='%23C2C2C2'/%3E%3C/svg%3E%0A");
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const HistoryDateColumn = styled.span`
  cursor: pointer;
  width: 15px;
  height: 15px;
  ::after {
    content: '';
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: 52px;
    width: 0.45em;
    height: 0.5em;
    border-radius: 1em;
    background: ${(props) => props.theme.colors.primary};
  }
`;

const DateColumn = styled.span`
  cursor: pointer;
`;

const UpdateData = styled.div`
  cursor: pointer;
  .updateTooltip {
    border-radius: 1.25em;
    font-size: 0.95em;
    padding: 0.6em 1em;
  }
`;

const Ranking = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 0.85em;
  /* padding-left: 0.25em; */
`;

const RankingDown = styled(Ranking)`
  color: #ed5978;
`;

const RankingUp = styled(Ranking)`
  color: #4bab6e;
`;

const SetRankingUp = styled.span`
  font-size: 0.75em;
  padding-left: 0.25em;
  color: #b8ccbf; // #b8ccbf;
`;

const SetRankingDown = styled.span`
  font-size: 0.75em;
  padding-left: 0.25em;
  color: #f7a1b3; // #f7a1b3;
`;

const NoRankingDiv = styled.div`
  display: flex;
  padding: 0px 15px;
  color: ${(props) => props.theme.colors.darkGray};
`;

const RankingDiv = styled.div`
  /* margin: 0 2em; */
`;

const DefaultRankingDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  /* margin: 0 2em; */
`;

const SetMallRankingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* margin: 0 2em; */
`;

const SetRankingDiv = styled.div`
  /* margin: 0 3em; */
  /* margin-left: 0.35em; */
`;

const AdRankingDiv = styled.div`
  align-items: center;
  /* margin: 0 2em; */
`;

const SetLowPrice = styled.span`
  background-color: #fff0de;
  color: #ffa636;
  border-radius: 0.25em;
  font-size: 0.8em;
  padding: 0.1em 0.5em;
  width: fit-content;
  margin-right: 0.5em;
`;

const SetBrand = styled.span`
  background-color: #e8fff9;
  color: #59d4bb;
  border-radius: 0.25em;
  font-size: 0.8em;
  padding: 0.1em 0.5em;
  width: fit-content;
  margin-right: 0.5em;
`;

const SetAdTag = styled.span`
  border: 1px solid #d1eef9;
  border-radius: 0.1em;
  /* background-color: #edfaff; */
  color: #7bcbea;
  border-radius: 0.25em;
  font-size: 0.8em;
  padding: 0 0.8em;
  width: fit-content;
  margin-right: 0.5em;
`;

const SetAdRanking = styled.span`
  font-size: 0.85em;
`;

const SetRanking = styled.span`
  font-size: 0.85em;
  color: #c0c0c0;
  /* color: ${(props) => props.theme.colors.gray}; */
`;

// const RankingNot = styled.span`
//   color: #a7a7a7;
// `;

const RankingOut = styled.span`
  color: #a7a7a7;
`;

const RankingPageText = styled.span`
  margin-left: 0.15em;
  font-size: 0.85em;
  color: ${(props) => props.theme.colors.darkGray};
`;

const MemoTracking = styled.span`
  display: flex;
  width: fit-content;
  height: 15px;
  position: relative;
  top: -18px;
  left: 45px;
  .memo-on {
    position: relative;
    width: 15px;
    height: 15px;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.625 5.625H4.375V6.875H5.625V5.625Z' fill='%23FFC83A'/%3E%3Cpath d='M6.875 5.625H8.125V6.875H6.875V5.625Z' fill='%23FFC83A'/%3E%3Cpath d='M10.625 5.625H9.375V6.875H10.625V5.625Z' fill='%23FFC83A'/%3E%3Cpath d='M1.875 3.125V13.125L4.875 10.875C5.09114 10.7123 5.35446 10.6245 5.625 10.625H11.875C12.5654 10.625 13.125 10.0654 13.125 9.375V3.125C13.125 2.43464 12.5654 1.875 11.875 1.875H3.125C2.43464 1.875 1.875 2.43464 1.875 3.125ZM3.125 10.625V3.125H11.875V9.375H5.20875C4.93817 9.37427 4.67478 9.46207 4.45875 9.625L3.125 10.625Z' fill='%23FFC83A'/%3E%3C/svg%3E%0A");
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5em;
  min-height: 18em;
  justify-content: center;
  align-items: center;
`;

const InfoText = styled.span`
  font-size: 1.3em;
  font-weight: 600;
  margin-bottom: 0.2em;
`;

const InfoSubText = styled.span`
  font-size: 1em;
  margin-bottom: 1.2em;
`;

const InfoAddButton = styled.button`
  width: 12.5em;
  height: 3.2em;
  background: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  border-radius: 1em;
  font-size: 1.2em;
  margin-left: 0.5em;
  &:hover,
  &:focus,
  &:active {
    background: #4771da99;
    color: ${(props) => props.theme.colors.white};
    box-shadow: none;
  }
  @media ${(props) => props.theme.mobile} {
  }
`;

const QuestionCircle = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.35em;
`;
