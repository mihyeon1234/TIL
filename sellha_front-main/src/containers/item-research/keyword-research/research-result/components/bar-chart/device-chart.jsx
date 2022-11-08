import React from 'react';
import styled from 'styled-components';
import { HorizontalBar } from 'react-chartjs-2';

const NoDataText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
  color: ${(props) => props.theme.colors.gray};
`;

function DeviceChart({ data: { device } }) {
  const deviceChart = {
    legend: 'none',
    labels: ['label'],
    datasets: [
      {
        label: '모바일',
        backgroundColor: '#ffda4f80',
        data: [Math.round(device && device.mo * 100)],
      },
      {
        label: 'PC',
        backgroundColor: '#eeeeee',
        data: [Math.round(device && device.pc * 100)],
      },
    ],
  };

  if (!device || (!device.mo && !device.pc)) {
    return <NoDataText>데이터 없음</NoDataText>;
  }

  return (
    <HorizontalBar
      data={deviceChart}
      options={deviceOptions}
      height={70}
      width={170}
    />
  );
}

export default DeviceChart;

const deviceOptions = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'top',
    labels: {
      boxWidth: 11,
      fontSize: 11,
    },
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      display: true,
      align: 'bottom',
      anchor: 'center',
      clamp: true,
      labels: {
        title: {
          font: {
            weight: '500',
            lineHeight: 2,
            size: 11,
          },
        },
      },
      formatter(value) {
        return `${value}%`;
      },
    },
  },
  tooltips: {
    intersect: false,
    enabled: false,
  },
};
