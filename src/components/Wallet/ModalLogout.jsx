import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ResetApi } from '../../redux/AuthRedux/operations';
import s from './ModalAddTransaction.module.css';



export function ModalLogOut({ setIsModalOpen }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const closeOnEsc = e => {
      if (e.code === 'Escape') {
        dispatch(ModalLogOut());
      }
    };
    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [dispatch]);

  function closeOnOverlay(e) {
    if (e.target === e.currentTarget) {
      dispatch(ModalLogOut());
    }
  }

const handleModalClose = () => {
  dispatch(ResetApi());
  setIsModalOpen(false);
}

  return (
    <div className={s.backdrop} onClick={closeOnOverlay}>
      <div className={s.modal}>
        <form className={s.modalForm}>
          <h2>Are you sure</h2>
          <div>
            <button type="button" onClick={handleModalClose}>
              Exit
            </button>
            <button type="button" onClick={() => setIsModalOpen()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
