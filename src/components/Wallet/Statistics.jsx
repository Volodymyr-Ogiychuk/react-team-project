import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsSummary } from 'redux/statistics/statisticsOperations';
import { categoriesSummary } from 'redux/statistics/statisticsSelectors';

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [basic, setBasic] = useState(null);
  const [product, setProduct] = useState(null);
  const [car, setCar] = useState(null);
  const [self, setSelf] = useState(null);
  const [child, setChild] = useState(null);
  const [house, setHouse] = useState(null);
  const [education, setEducation] = useState(null);
  const [leisure, setLeisure] = useState(null);
  const [other, setOther] = useState(null);
  const summaryStat = useSelector(categoriesSummary);

  const SwitchValue = data => {
    const { name, total } = data;
    switch (name) {
      case 'Basic expenses':
        setBasic(prev => prev + total);
        console.log(basic);
        break;
      case 'Products':
        setProduct(prev => prev + total);
        break;
      case 'Car':
        setCar(prev => prev + total);
        break;
      case 'Self care':
        setSelf(prev => prev + total);
        break;
      case 'Child care':
        setChild(prev => prev + total);
        break;
      case 'Household products':
        setHouse(prev => prev + total);
        break;
      case 'Education':
        setEducation(prev => prev + total);
        break;
      case 'Leisure':
        setLeisure(prev => prev + total);
        break;
      case 'Other expenses':
        setOther(prev => prev + total);
        break;
      default:
        return;
    }
  };
  //   const resetValue = () => {
  //     setBasic(null);
  //     setProduct(null);
  //     setCar(null);
  //     setSelf(null);
  //     setChild(null);
  //     setHouse(null);
  //     setEducation(null);
  //     setLeisure(null);
  //     setOther(null);
  //   };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionsSummary());
    summaryStat.map(data => {
      return SwitchValue(data);
    });
    // eslint-disable-next-line
  }, [dispatch]);

  const data = {
    labels: [
      'Basic expenses',
      'Products',
      'Car',
      'Self care',
      'Child care',
      'Household products',
      'Education',
      'Leisure',
      'Other expenses',
    ],
    datasets: [
      {
        // label: '# of Votes',
        data: [
          basic,
          product,
          car,
          self,
          child,
          house,
          education,
          leisure,
          other,
        ],
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
      <Doughnut data={data} />;
    </>
  );
};

export default Statistics;
