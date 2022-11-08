import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputNumber } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { theme } from 'styles';
import { setFilter, setView } from '../reducer';

/**
 * 경쟁률, 클릭지수, 상품수, 브랜드 점유율 필터
 * @param {String} dataIndex
 * dataIndex 정보 - 경쟁률: competitiveness, 클릭지수: clickSum, 상품수: productAmount, 브랜드 점유율: brandful
 * @returns {Object} 필터 컴포넌트 리턴
 */
function getSearchFilter(dataIndex) {
  const [minData, setMinData] = useState();
  const [maxData, setMaxData] = useState();
  const [useable, setUseable] = useState(true);
  const [filtered, setFiltered] = useState(false);

  const dispatch = useDispatch();
  const { filtering, firstData } = useSelector((state) => state.categorySub);

  /**
   * 초기화 버튼 disabled 셋팅
   * 작성자: 장다영
   * 업데이트: 2022.06.15
   */
  useEffect(() => {
    // minData, maxData 둘다 입력값 없으면 초기화 버튼 사용 불가
    if (!minData && !maxData) {
      setUseable(true);
    } else {
      setUseable(false);
    }
  }, [minData, maxData]);

  /**
   * 필터 값 바뀌면 테이블 데이터 재 셋팅
   * 작성자: 장다영
   * 업데이트: 2022.06.15
   */
  useEffect(() => {
    const {
      minCompete,
      maxCompete,
      minClickSum,
      maxClickSum,
      minProductAmount,
      maxProductAmount,
      minBrandful,
      maxBrandful,
    } = filtering;

    const newData = firstData.filter((obj) => {
      // 경쟁률 범위 체크
      const competeCheck =
        minCompete <= obj.competePercentage &&
        obj.competePercentage <= maxCompete;
      // 클릭지수 범위 체크
      const clickCheck =
        minClickSum <= obj.clickSumPercentage &&
        obj.clickSumPercentage <= maxClickSum;
      // 상품수 범위 체크
      const productCheck =
        minProductAmount <= obj.productAmount &&
        obj.productAmount <= maxProductAmount;
      // 브랜드 점유율 범위 체크
      const brandfulCheck =
        minBrandful <= (obj.brandful || 0) &&
        (obj.brandful || 0) <= maxBrandful;

      if (competeCheck && clickCheck && productCheck && brandfulCheck) {
        return true;
      }

      return false;
    });

    dispatch(
      setView({
        data: newData,
      }),
    );
  }, [filtering]);

  /**
   * 초기화 버튼 클릭 시
   * 작성자: 장다영
   * 업데이트: 2022.06.15
   */
  function resetFilter() {
    // input 값 초기화
    setMinData('');
    setMaxData('');
    // 필터에 색상 초기화
    setFiltered(false);
  }

  /**
   * 필터 적용 버튼 클릭 시 filter 데이터 셋팅
   * 작성자: 장다영
   * 업데이트: 2022.06.15
   * @param {Function} confirm
   */
  function setFilterEvent(confirm) {
    // 필터 닫기
    confirm({
      closeDropdown: true,
    });

    // 필터된 값으로 보여줄 때 필터 색상 변경
    if (!useable) setFiltered(true);
    // min, max값 둘다 없으면 필터 색상 초기화
    else setFiltered(false);

    switch (dataIndex) {
      // 경쟁률
      case 'competitiveness':
        dispatch(
          setFilter({
            minCompete: minData || 0,
            maxCompete: maxData || Infinity,
          }),
        );
        break;
      // 클릭지수
      case 'clickSum':
        dispatch(
          setFilter({
            minClickSum: minData || 0,
            maxClickSum: maxData || Infinity,
          }),
        );
        break;
      // 상품수
      case 'productAmount':
        dispatch(
          setFilter({
            minProductAmount: minData || 0,
            maxProductAmount: maxData || Infinity,
          }),
        );
        break;
      // 브랜드 점유율
      case 'brandful':
        dispatch(
          setFilter({
            minBrandful: minData || 0,
            maxBrandful: maxData || Infinity,
          }),
        );
        break;
      default:
        break;
    }
  }

  return {
    filterDropdown: ({ confirm }) => (
      <Container>
        <FilterInputContent>
          <FilterInput
            placeholder="최소"
            value={minData}
            min={0}
            addonAfter="%"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            onChange={(value) => setMinData(value)}
            onPressEnter={() => setFilterEvent(confirm)}
          />
          <Hyphen>-</Hyphen>
          <FilterInput
            placeholder="최대"
            value={maxData}
            min={0}
            addonAfter="%"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            onChange={(value) => setMaxData(value)}
            onPressEnter={() => setFilterEvent(confirm)}
          />
        </FilterInputContent>
        <ButtonContent>
          <FilterBtn
            type="link"
            disabled={useable}
            onClick={() => resetFilter()}
          >
            초기화
          </FilterBtn>
          <FilterBtn
            type="primary"
            onClick={() => {
              setFilterEvent(confirm);
            }}
          >
            필터 적용
          </FilterBtn>
        </ButtonContent>
      </Container>
    ),
    filterIcon: () => (
      <FilterFilled
        style={{
          color: filtered ? theme.colors.primary : undefined,
        }}
      />
    ),
  };
}

export default getSearchFilter;

const Container = styled.div`
  padding: 10px;
`;

const FilterInputContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const FilterInput = styled(InputNumber)`
  height: 35px !important;
  margin: 0;
  font-size: 13px;

  .ant-input-number {
    width: 6em;
  }

  .ant-input-number-group-addon {
    color: ${(props) => props.theme.colors.darkGray};
    background-color: ${(props) => props.theme.colors.white};
    font-size: 0.8em;
  }
`;

const Hyphen = styled.span`
  margin: 0 5px;
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FilterBtn = styled(Button)`
  width: 7em;
  height: 30px;
  font-size: 13px;

  &[class~='ant-btn-link'] {
    text-align: left;
  }
`;
