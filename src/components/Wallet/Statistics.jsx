import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsSummary } from 'redux/statistics/statisticsOperations';
import {
  categoriesSummary,
  expenseSummary,
  incomeSummary,
} from 'redux/statistics/statisticsSelectors';

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const stateStatistics = useSelector(categoriesSummary);
  const expense = useSelector(expenseSummary);
  const income = useSelector(incomeSummary);

  let dataStatistics = [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionsSummary());
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
        <tbody>
          <tr>
            <th>Category</th>
            <th>Sum</th>
          </tr>
          {stateStatistics.map(({ name, type, total }) => {
            dataStatistics.push(total);

            return type !== 'INCOME' ? (
              <tr key={name}>
                <td>{name}</td>
                <td>{total}</td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
      <ul>
        <li>
          <span>Expenses:</span>
          <p>{expense}</p>
        </li>
        <li>
          <span>Income:</span>
          <p>{income}</p>
        </li>
      </ul>
    </>
  );
};

export default Statistics;
