import React from 'react';

export const ModalContext = React.createContext({
  open: false,
  openModal: () => {},
  closeModal: () => {},
  setContent: () => {
    return <div>test</div>
  },
})

ModalContext.displayName = 'ModalContext';
