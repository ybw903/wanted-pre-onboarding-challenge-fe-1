import React, { useCallback, useEffect, useRef } from "react";

import ReactDOM from "react-dom";
import { useHandleClickOutside } from "../../hooks";

export interface ModalProps {
  visible: boolean;
  closeHandler: () => void;
  heightStr?: string;
  widthStr?: string;
  children?: React.ReactNode;
}

const Portal = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(children, document.body);
};

const Modal: React.FC<ModalProps> = ({ visible, closeHandler, children }) => {
  const ref = useRef(null);

  useHandleClickOutside(ref, closeHandler);

  const handleUserKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyDown);
    return () => window.removeEventListener("keydown", handleUserKeyDown);
  }, [handleUserKeyDown]);

  return (
    <Portal>
      <div />
      <div ref={ref}>
        <div>{children}</div>
      </div>
      {/* <ModalOverlay isVisible={visible} />
      <ModalWrapper isVisible={visible} ref={ref}>
        <ModalInner heightStr={heightStr} widthStr={widthStr}>
          {children}
        </ModalInner>
      </ModalWrapper> */}
    </Portal>
  );
};
export default Modal;
function useOnClickOutside(
  ref: React.MutableRefObject<null>,
  closeHandler: () => void
) {
  throw new Error("Function not implemented.");
}
