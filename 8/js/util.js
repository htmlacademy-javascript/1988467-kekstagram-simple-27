let modalState = null;

function setModalState(key) {
  modalState = key;
}

function resetModalState() {
  modalState = null;
}

function getModalState() {
  return modalState;
}

export { setModalState, resetModalState, getModalState };
