import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareDesc, format, parseISO } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getCategories,
  getTransactions,
} from 'redux/transactions/transactions-operations';
import {
  selectCategories,
  selectTransactions,
  selectModalStatus,
  selectError,
} from 'redux/transactions/transactions-selectors';
import { toggleModal } from 'redux/transactions/transactions-slice';
import { ModalAddTransaction } from './ModalAddTransaction';

// Продумана max-height: 60vh; (наприклад, а далі включається скролл всередині компонента, скільки vh проговорити це з автором DashboardPage)

const Transactions = () => {
  const isModalOpen = useSelector(selectModalStatus);
  const categories = useSelector(selectCategories);
  const transactionsData = useSelector(selectTransactions);
  const isError = useSelector(selectError);
  const dispatch = useDispatch();

  const sortedTransactions = [...transactionsData].sort((a, b) =>
    compareDesc(parseISO(a.transactionDate), parseISO(b.transactionDate))
  );

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getCategories());
  }, [dispatch]);

  !!isError && toast.error(isError);

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
          {sortedTransactions.map(
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
                <td style={{ padding: '5px' }}>
                  {format(parseISO(transactionDate), 'dd.MM.yyyy')}
                </td>
                <td style={{ padding: '5px' }}>{type}</td>
                <td style={{ padding: '5px' }}>
                  {
                    categories.find(category => category.id === categoryId)
                      ?.name
                  }
                </td>
                <td style={{ padding: '5px' }}>{comment}</td>
                <td style={{ padding: '5px' }}>{Math.abs(amount)}</td>
                <td style={{ padding: '5px' }}>{balanceAfter}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <button
        type="button"
        aria-label="add transaction button"
        onClick={() => dispatch(toggleModal())}
      >
        Add Transaction
      </button>
      {isModalOpen && <ModalAddTransaction />}

      <ToastContainer />
    </>
  );
};

export default Transactions;

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
