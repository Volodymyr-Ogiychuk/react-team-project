import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareDesc, format, parseISO } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Media from 'react-media';
import { getCategories } from 'redux/transactions/transactions-operations';
import {
  selectCategories,
  selectTransactions,
  selectModalStatus,
  selectError,
} from 'redux/transactions/transactions-selectors';
import { ModalAddTransaction } from './ModalAddTransaction';
import s from './Transactions.module.css';
import { mediaQueries } from './Wallet';

//// Media query using js:

// function AlterTable() {
//   const [isMobile, setIsMobile] = useState(false);
//   window.matchMedia('(max-width: 767px)').addEventListener('change', e => {
//     e.matches ? setIsMobile(true) : setIsMobile(false);
//   });

//   return isMobile && <h1>BAALKSJFLA</h1>;
// }

//// Toggle body scroll lock:

function bodyScrollLock(isOpen) {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
  } else {
    document.body.style.overflow = 'visible';
    document.body.style.position = 'static';
  }
}

const Transactions = () => {
  const isModalOpen = useSelector(selectModalStatus);
  const categories = useSelector(selectCategories);
  const transactionsData = useSelector(selectTransactions);
  const isError = useSelector(selectError);
  const dispatch = useDispatch();

  // ckecking user's device:
  const [isMobile, setIsMobile] = useState(false);
  window.matchMedia('(max-width: 767px)').addEventListener('change', e => {
    e.matches ? setIsMobile(true) : setIsMobile(false);
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const sortedTransactions = [...transactionsData].sort((a, b) =>
    compareDesc(parseISO(a.transactionDate), parseISO(b.transactionDate))
  );

  !!isError && toast.error(isError);

  isMobile && bodyScrollLock(isModalOpen);

  return (
    <section className={s.transactions}>
      <Media queries={mediaQueries}>
        {matches =>
          matches.mobile || matches.response ? (
            <div className={s.mobTableContainer}>
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
                  <div className={s.mobTransaction} key={id}>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Date</p>
                      <p className={s.transactionData}>
                        {format(parseISO(transactionDate), 'dd.MM.yyyy')}
                      </p>
                    </div>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Type</p>
                      <p className={s.transactionData}>
                        {type === 'INCOME' ? '+' : '-'}
                      </p>
                    </div>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Category</p>
                      <p className={s.transactionData}>
                        {
                          categories.find(
                            category => category.id === categoryId
                          )?.name
                        }
                      </p>
                    </div>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Comment</p>
                      <p className={s.transactionData}>{comment}</p>
                    </div>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Sum</p>
                      <p
                        className={
                          type === 'INCOME'
                            ? s.transactionDataIncome
                            : s.transactionDataExpense
                        }
                      >
                        {Math.abs(amount)}
                      </p>
                    </div>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Balance</p>
                      <p className={s.transactionData}>{balanceAfter}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <table className={s.transactionsTable}>
              <thead>
                <tr className={s.tableHeaderRow}>
                  <th className={s.tableHeaderData}>Date</th>
                  <th className={s.tableHeaderData}>Type</th>
                  <th className={s.tableHeaderData}>Category</th>
                  <th className={s.tableHeaderData}>Comment</th>
                  <th className={s.tableHeaderDataRight}>Sum</th>
                  <th className={s.tableHeaderDataRight}>Balance</th>
                </tr>
              </thead>
              <tbody className={s.tableBody}>
                {sortedTransactions.map(
                  (
                    {
                      id,
                      transactionDate,
                      type,
                      categoryId,
                      comment,
                      amount,
                      balanceAfter,
                    },
                    idx,
                    arr
                  ) => (
                    <tr key={id}>
                      <td
                        className={`${s.tableData} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        {format(parseISO(transactionDate), 'dd.MM.yyyy')}
                      </td>
                      <td
                        className={`${s.tableData} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        {type === 'INCOME' ? '+' : '-'}
                      </td>
                      <td
                        className={`${s.tableData} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        {
                          categories.find(
                            category => category.id === categoryId
                          )?.name
                        }
                      </td>
                      <td
                        className={`${s.tableData} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        {comment}
                      </td>
                      <td
                        className={`${
                          type === 'INCOME'
                            ? s.tableDataIncome
                            : s.tableDataExpense
                        } ${idx === 0 ? s.firstTableData : ''} ${
                          idx === arr.length - 1 ? s.lastTableData : ''
                        }`}
                      >
                        {Math.abs(amount)}
                      </td>
                      <td
                        className={`${s.tableDataRight} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        {balanceAfter}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )
        }
      </Media>

      {isModalOpen && <ModalAddTransaction />}

      <ToastContainer />
    </section>
  );
};

export default Transactions;
