import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { Outlet } from "react-router-dom";

import styles from "../css/App.module.css";

import TodoList from "./TodoList";
// eslint-disable-next-line
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line
  }, []);

  const newTodoHandler = () => {
    navigate("./addTodo");
  };

  return (
    <div>
      <div className={styles.App}>
        <motion.h1
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          TODO List
        </motion.h1>
        <motion.button
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={styles.addButton}
          onClick={newTodoHandler}
        >
          <GoPlus />
        </motion.button>
      </div>

      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
      >
        <Outlet />
        {/* <MainBody /> */}
        <TodoList />
      </motion.div>
    </div>
  );
}

export default App;
