import React from "react";

const ValidationModal = ({ message, show, close }: { message: string, show: boolean, close: () => void }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modalContent">
        {message}
        <button onClick={close}>Okay</button>
      </div>
    </div>);
};

export default ValidationModal;