let modalState = null;

function setModalState(key) {
  modalState = key;
}

function resetModalState() {
  modalState = null;
}


export { modalState, setModalState, resetModalState };
