let modalState = null;

const setModalState = (key) => {
  modalState = key;
};

const resetModalState = () => {
  modalState = null;
};

const getModalState = () => modalState;

export { setModalState, resetModalState, getModalState };
