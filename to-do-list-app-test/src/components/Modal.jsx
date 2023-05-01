import { useNavigate } from "react-router-dom";
import styles from "../css/Modal.module.css";

let Modal = ({ children }) => {
  const navigate = useNavigate();
  const closeHandler = () => {
    navigate("..");
  };

  return (
    <>
      <div className={styles.backdrop} onClick={closeHandler} />
      <dialog open className={styles.modal}>
        {children}
      </dialog>
    </>
  );
};

export default Modal;
