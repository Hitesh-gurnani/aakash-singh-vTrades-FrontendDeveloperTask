import React from "react";
import styles from "./modal.module.css";
import message from "../../assets/message.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
  buttonText?: string;
  image?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  buttonText = "Close",
  image = message,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img
          src={image}
          alt="modal"
          className="flex justify-center items-center"
          width={100}
          height={100}
        />
        {title && <h2 className={styles.modalTitle}>{title}</h2>}
        <div className={styles.modalBody}>{content}</div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <button className={styles.modalButton} onClick={onClose}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
