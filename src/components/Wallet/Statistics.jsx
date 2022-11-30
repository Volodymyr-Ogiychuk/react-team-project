import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsSummary } from 'redux/statistics/statisticsOperations';
import { categoriesSummary } from 'redux/statistics/statisticsSelectors';

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const stateStatistics = useSelector(categoriesSummary);

  let dataStatistics = [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionsSummary());

    // eslint-disable-next-line
  }, [dispatch]);

  const data = {
    labels: [
      // 'Basic expenses',
      // 'Products',
      // 'Car',
      // 'Self care',
      // 'Child care',
      // 'Household products',
      // 'Education',
      // 'Leisure',
      // 'Other expenses',
    ],
    datasets: [
      {
        // label: '# of Votes',
        data: dataStatistics,
        backgroundColor: [
          'rgba(254, 208, 87, 1)',
          'rgba(255, 216, 208, 1)',
          'rgba(253, 148, 152, 1)',
          'rgba(197, 186, 255, 1)',
          'rgba(110, 120, 232, 1)',
          'rgba(74, 86, 226, 1)',
          'rgba(129, 225, 255, 1)',
          'rgba(36, 204, 167, 1)',
          'rgba(0, 173, 132, 1)',
        ],
        borderColor: [],
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <h1>Statistics</h1>
      <Doughnut data={data} />

      <table>
        <tr>
          <th>Category</th>
          <th>Sum</th>
        </tr>

        {stateStatistics.map(({ name, type, total }) => {
          dataStatistics.push(total);
          return (
            <tr>
              <td>{name}</td>
              <td>{total}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default Statistics;
