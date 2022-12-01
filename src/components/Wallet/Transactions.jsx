import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareDesc, format, parseISO } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from 'redux/transactions/transactions-operations';
import {
  selectCategories,
  selectTransactions,
  selectModalStatus,
  selectError,
} from 'redux/transactions/transactions-selectors';
import { toggleModal } from 'redux/transactions/transactions-slice';
import { ModalAddTransaction } from './ModalAddTransaction';
import s from './Transactions.module.css';
import sprite from '../../images/transactions/transactionSprite.svg';

// Продумана max-height: 60vh; (наприклад, а далі включається скролл всередині компонента, скільки vh проговорити це з автором DashboardPage)

const Transactions = () => {
  const isModalOpen = useSelector(selectModalStatus);
  const categories = useSelector(selectCategories);
  const transactionsData = useSelector(selectTransactions);
  const isError = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const sortedTransactions = [...transactionsData].sort((a, b) =>
    compareDesc(parseISO(a.transactionDate), parseISO(b.transactionDate))
  );

  !!isError && toast.error(isError);

  return (
    <section className={s.transactions}>
      <table className={s.transactionsTable}>
        <thead className={s.tableHeader}>
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
                  className={`${s.tableData} ${idx === 0 && s.firstTableData} ${
                    idx === arr.length - 1 && s.lastTableData
                  }`}
                >
                  {format(parseISO(transactionDate), 'dd.MM.yyyy')}
                </td>
                <td
                  className={`${s.tableData} ${idx === 0 && s.firstTableData} ${
                    idx === arr.length - 1 && s.lastTableData
                  }`}
                >
                  {type === 'INCOME' ? '+' : '-'}
                </td>
                <td
                  className={`${s.tableData} ${idx === 0 && s.firstTableData} ${
                    idx === arr.length - 1 && s.lastTableData
                  }`}
                >
                  {
                    categories.find(category => category.id === categoryId)
                      ?.name
                  }
                </td>
                <td
                  className={`${s.tableData} ${idx === 0 && s.firstTableData} ${
                    idx === arr.length - 1 && s.lastTableData
                  }`}
                >
                  {comment}
                </td>
                <td
                  className={`${
                    type === 'INCOME' ? s.tableDataIncome : s.tableDataExpense
                  } ${idx === 0 && s.firstTableData} ${
                    idx === arr.length - 1 && s.lastTableData
                  }`}
                >
                  {Math.abs(amount)}
                </td>
                <td
                  className={`${s.tableDataRight} ${
                    idx === 0 && s.firstTableData
                  } ${idx === arr.length - 1 && s.lastTableData}`}
                >
                  {balanceAfter}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <button
        type="button"
        className={s.addButton}
        aria-label="add transaction button"
        onClick={() => dispatch(toggleModal())}
      >
        <svg width={20} height={20}>
          <use href={sprite + '#icon-plus'}></use>
        </svg>
      </button>

      {isModalOpen && <ModalAddTransaction />}

      <ToastContainer />
    </section>
  );
};

export default Transactions;
