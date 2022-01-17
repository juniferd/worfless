import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root')

function ModalPortal({children}) {
  const elRef = useRef(null);
  if (!elRef.current) elRef.current = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(elRef.current)
    return () => {
      modalRoot.removeChild(elRef.current)
    }
  }, [])

  return ReactDOM.createPortal(
    <>{children}</>,
    elRef.current,
  );
}

export default ModalPortal;
