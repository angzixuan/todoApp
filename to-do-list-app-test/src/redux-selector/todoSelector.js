import { createSelector } from "reselect";
import { Status, DefaultFilter, SortBy } from "../utils/global";

export const selectTodos = (state) => state.todo.todos;
export const selectFilters = (state) => state.filter;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilters],
  (todos, filter) => {
    let filteredTodos;
    // filtering
    if (filter.status === DefaultFilter.ALL) {
      filteredTodos = todos;
    } else if (filter.status === DefaultFilter.INITIAL) {
      filteredTodos = todos.filter((task) => task.status === Status.NOT_START);
    } else if (filter.status === DefaultFilter.ACTIVE) {
      filteredTodos = todos.filter(
        (task) => task.status === Status.IN_PROGRESS
      );
    } else if (filter.status === DefaultFilter.DONE) {
      filteredTodos = todos.filter((task) => task.status === Status.COMPLETED);
    }
    // sorting
    if (filter.sortBy === SortBy.NAME) {
      filteredTodos = [...filteredTodos].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (filter.sortBy === SortBy.DATE) {
      filteredTodos = [...filteredTodos].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
      console.log(filteredTodos);
    }

    return filteredTodos;
  }
);
