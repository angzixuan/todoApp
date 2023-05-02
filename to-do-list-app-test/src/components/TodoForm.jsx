import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { postTodo, putTodo } from "../redux-thunk/todoThunk";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from "../components/Modal";
import styles from "../css/TodoForm.module.css";
import { Link, Form } from "react-router-dom";
import { Status } from "../utils/global";
import { nanoid } from "@reduxjs/toolkit";

const TodoForm = () => {
  const [currentTodo, setTodo] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [currentDate, setDate] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state) {
      setTodo(location.state);
      setDate(new Date(location.state.dueDate));
      setSelectedOption(location.state.status);
    }
  }, [location.state]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFormSubmit = (event) => {
    // wondering wanna add id myself
    const todo = {
      id: nanoid(7),
      ...currentTodo,
      ...Object.fromEntries(new FormData(event.target)),
    };
    //
    let dispatchFunction = location.state ? putTodo(todo) : postTodo(todo);
    dispatch(dispatchFunction)
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <Modal>
      <Form onSubmit={handleFormSubmit} className={styles.form}>
        <label htmlFor="name">Title</label>
        <textarea
          defaultValue={currentTodo && currentTodo.name}
          id="name"
          name="name"
          required
        />
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          defaultValue={currentTodo && currentTodo.description}
          id="description"
          name="description"
          required
          rows={3}
        />
        <br />
        <label htmlFor="status">Status</label>
        <div>
          <select
            id="status"
            name="status"
            required
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value={Status.NOT_START}>Not Started</option>
            <option value={Status.IN_PROGRESS}>In Progress</option>
            <option value={Status.COMPLETED}>Completed</option>
          </select>
        </div>
        <br />
        <label htmlFor="dueDate">Due date</label>
        <DatePicker
          id="dueDate"
          name="dueDate"
          required
          filterDate={(d) => {
            return new Date() < d;
          }}
          showTimeInput
          dateFormat="MMMM dd, yyyy hh:mm aa"
          selected={currentDate}
          onChange={(date) => setDate(date)}
        />
        <br />
        <p className={styles.actions}>
          <Link className={styles.cancel} to=".." type="button">
            Cancel
          </Link>
          <button className={styles.button}>Submit</button>
        </p>
      </Form>
    </Modal>
  );
};

export default TodoForm;
