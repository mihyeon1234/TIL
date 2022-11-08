import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

const NoDataText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
  color: ${(props) => props.theme.colors.gray};
`;

function AgeChart({ data: { age } }) {
  const ageGroup = [];
  const ageRatio = [];
  let checkData = false;

  if (age) {
    age.forEach((a) => {
      ageGroup.push(`${a.group}대`);
      ageRatio.push(Math.round(a.ratio));
    });
    checkData = age.filter((value) => !value.ratio).length === 6;
  }

  const ageDataChart = {
    legend: 'none',
    labels: ageGroup,
    datasets: [
      {
        data: ageRatio,
        backgroundColor: '#ffda4f80',
        borderColor: '#646464',
      },
    ],
  };

  if (!age || checkData) {
    return <NoDataText>데이터 없음</NoDataText>;
  }

  return (
    <Bar data={ageDataChart} options={ageOptions} height={100} width={170} />
  );
}

export default AgeChart;

const ageOptions = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          display: true,
          fontSize: 9.5,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
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
    display: false,
    labels: false,
    datalabels: {
      display: false,
    },
    // legend: {

    // },
  },
};
