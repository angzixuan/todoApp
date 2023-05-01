import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Status } from "../utils/global";
import { AiFillEdit } from "react-icons/ai";
import {
  IoCheckmarkDoneSharp,
  IoClose,
  IoArrowBackOutline,
} from "react-icons/io5";
// eslint-disable-next-line
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import styles from "../css/Todo.module.css";

const Todo = ({ item, onRemove, onUpdate }) => {
  const [previousState, setPreviousState] = useState();
  const navigate = useNavigate();
  const editTodoHandler = () => {
    navigate(`./${item.id}`, { state: item });
  };

  const handleTaskRemove = () => {
    onRemove(item.id);
  };

  const handleTaskCompletion = () => {
    setPreviousState(item.status);
    onUpdate({ ...item, status: Status.COMPLETED });
  };

  const handleUndoCompletion = () => {
    onUpdate({ ...item, status: previousState });
  };

  const buttonStatusIndicator = () => {
    switch (item.status) {
      case Status.NOT_START:
        return (
          <span
            className={styles.statusIndicator}
            style={{ backgroundColor: "lightsalmon" }}
          >
            Not Started
          </span>
        );

      case Status.IN_PROGRESS:
        return (
          <span
            className={styles.statusIndicator}
            style={{ backgroundColor: "blueviolet" }}
          >
            In Progress
          </span>
        );

      case Status.COMPLETED:
        return (
          <span
            className={styles.statusIndicator}
            style={{ backgroundColor: "green" }}
          >
            Completed
          </span>
        );

      default:
        break;
    }
  };

  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className={styles.card}
    >
      {<span className={styles.dueDateIndicator}>{item.dueDate}</span>}
      {buttonStatusIndicator()}
      <br />
      <h3 className={styles.cardName}>{item.name}</h3>
      <textarea
        disabled
        rows={3}
        className={styles.cardDescription}
        value={item.description}
      />
      <div className={styles.cardButtons}>
        {item.status !== Status.COMPLETED ? (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "blue" }}
            onClick={handleTaskCompletion}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        ) : (
          previousState && (
            <motion.button
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              style={{ color: "purple" }}
              onClick={handleUndoCompletion}
            >
              <IoArrowBackOutline />
            </motion.button>
          )
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "green" }}
          onClick={editTodoHandler}
        >
          <AiFillEdit />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={handleTaskRemove}
        >
          <IoClose />
        </motion.button>
      </div>
    </motion.li>
  );
};

export default Todo;
