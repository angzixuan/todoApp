import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy } from "../redux-reducer-actions/filterSlice";
import { selectFilteredTodos } from "../redux-selector/todoSelector";
import { deleteTodo, fetchAllTodo, putTodo } from "../redux-thunk/todoThunk";
import { DefaultFilter, SortBy } from "../utils/global";
// eslint-disable-next-line
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import styles from "../css/TodoList.module.css";

import Todo from "./Todo";

const TodoList = () => {
  const [selectedOption, setSelectedOption] = useState(SortBy.NAME);
  const todoList = useSelector(selectFilteredTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Initial Fetch");
    dispatch(fetchAllTodo());
  }, [dispatch]);

  const handleFilter = (event) => {
    console.log(`Dispatched setFilter with ${event.target.value}`);
    dispatch(setFilter(event.target.value));
  };

  const handleSelectionChange = (event) => {
    console.log(`Dispatched setSortBy with ${event.target.value}`);
    setSelectedOption(event.target.value);
    dispatch(setSortBy(event.target.value));
  };

  const removeTodos = (taskID) => {
    console.log(`Dispatched addTodo with ${taskID}`);
    dispatch(deleteTodo(taskID));
  };

  const updateTodos = (todo) => {
    console.log(`Dispatched updateTodo with ${todo}`);
    dispatch(putTodo(todo));
  };

  return (
    <div className={styles.todoListContainer}>
      <div className={styles.todoListContainerButtons}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFilter}
          value={DefaultFilter.ALL}
        >
          All
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFilter}
          value={DefaultFilter.INITIAL}
        >
          Not Started
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFilter}
          value={DefaultFilter.ACTIVE}
        >
          In Progress
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFilter}
          value={DefaultFilter.DONE}
        >
          Done
        </motion.button>
        <motion.select
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          value={selectedOption}
          onChange={handleSelectionChange}
        >
          <option value={SortBy.NAME}>Sort By Name</option>
          <option value={SortBy.DATE}>Sort By Date</option>
        </motion.select>
      </div>
      {todoList && todoList.length > 0 ? (
        <ul className={styles.todoList}>
          <AnimatePresence>
            {todoList.map((task) => (
              <Todo
                key={task.id}
                item={task}
                onRemove={removeTodos}
                onUpdate={updateTodos}
              />
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <h1
          style={{
            margin: "10%",
            textAlign: "center",
          }}
        >
          No Task Yet....
        </h1>
      )}
    </div>
  );
};

export default TodoList;
