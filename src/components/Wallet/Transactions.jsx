// import { useEffect } from 'react';
// import { getTransactions } from 'redux/transactions/transactions-operations';
// import { selectTransactions } from 'redux/transactions/transactions-selectors';
import { useDispatch, useSelector } from 'react-redux';

import { selectModalStatus } from 'redux/transactions/transactions-selectors';
import { toggleModal } from 'redux/transactions/transactions-slice';
import { ModalAddTransaction } from './ModalAddTransaction';

const transData = [
  {
    id: '1',
    transactionDate: '12.11.2022',
    type: '-',
    categoryId: 'car',
    userId: 'id214',
    comment: 'wheels',
    amount: 2000,
    balanceAfter: 7000,
  },
  {
    id: '2',
    transactionDate: '15.11.2022',
    type: '-',
    categoryId: 'food',
    userId: 'id214',
    comment: 'meat',
    amount: 500,
    balanceAfter: 6500,
  },
  {
    id: '3',
    transactionDate: '22.11.2022',
    type: '-',
    categoryId: 'cinema',
    userId: 'id214',
    comment: 'batman',
    amount: 200,
    balanceAfter: 6300,
  },
];

// Логіка фільтрації транзакцій реалізується в цьому компоненті, зверху мають бути найсвіжіші транзакції за датою
// Продумана max-height: 60vh; (наприклад, а далі включається скролл всередині компонента, скільки vh проговорити це з автором DashboardPage)

const Transactions = () => {
  // const transactionsData = useSelector(selectTransactions);
  const isModalOpen = useSelector(selectModalStatus);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getTransactions());
  // }, [dispatch]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th style={{ padding: '5px' }}>Date</th>
            <th style={{ padding: '5px' }}>Type</th>
            <th style={{ padding: '5px' }}>Category</th>
            <th style={{ padding: '5px' }}>Comment</th>
            <th style={{ padding: '5px' }}>Sum</th>
            <th style={{ padding: '5px' }}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transData.map(
            ({
              id,
              transactionDate,
              type,
              categoryId,
              comment,
              amount,
              balanceAfter,
            }) => (
              <tr key={id}>
                <td style={{ padding: '5px' }}>{transactionDate}</td>
                <td style={{ padding: '5px' }}>{type}</td>
                <td style={{ padding: '5px' }}>{categoryId}</td>
                <td style={{ padding: '5px' }}>{comment}</td>
                <td style={{ padding: '5px' }}>{amount}</td>
                <td style={{ padding: '5px' }}>{balanceAfter}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <button type="button" onClick={() => dispatch(toggleModal())}>
        Add Transaction
      </button>
      {isModalOpen && <ModalAddTransaction />}
    </>
  );
};

export default Transactions;

/* 
  
  Paste to Dashboard to load transactions on component mount:

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

 */

// <div className="transaction-wrap">
//   <div className="transaction-header" style={{ display: 'flex' }}>
//     <div style={{ marginLeft: '20px' }}>Date</div>
//     <div style={{ marginLeft: '20px' }}>Type</div>
//     <div style={{ marginLeft: '20px' }}>Category</div>
//     <div style={{ marginLeft: '20px' }}>Comment</div>
//     <div style={{ marginLeft: '20px' }}>Sum</div>
//     <div style={{ marginLeft: '20px' }}>Balance</div>
//   </div>
//   <ul
//     className="transaction-list"
//     style={{ listStyle: 'none', padding: '0' }}
//   >
//     {transData.map(trans => (
//       <li style={{ display: 'flex' }}>
//         <div className="transDetails" style={{ marginLeft: '20px' }}>
//           {trans.transactionDate}
//         </div>
//         <div className="transDetails" style={{ marginLeft: '20px' }}>
//           {trans.type}
//         </div>
//         <div className="transDetails" style={{ marginLeft: '20px' }}>
//           {trans.categoryId}
//         </div>
//         <div className="transDetails" style={{ marginLeft: '20px' }}>
//           {trans.comment}
//         </div>
//         <div className="transDetails" style={{ marginLeft: '20px' }}>
//           {trans.amount}
//         </div>
//         <div className="transDetails" style={{ marginLeft: '20px' }}>
//           {trans.balanceAfter}
//         </div>
//       </li>
//     ))}
//   </ul>
// </div>
