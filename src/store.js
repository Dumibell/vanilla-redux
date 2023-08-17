import { legacy_createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addTodo = (text) => {
  return { type: ADD, text };
};

const deleteTodo = (id) => {
  return { type: DELETE, id: parseInt(id) };
};

const reducer = (
  state = JSON.parse(
    localStorage.getItem("todo") ||
      localStorage.setItem("todo", JSON.stringify([]))
  ),
  action
) => {
  switch (action.type) {
    case ADD:
      localStorage.setItem(
        "todo",
        JSON.stringify([{ text: action.text, id: Date.now() }, ...state])
      );
      return JSON.parse(localStorage.getItem("todo"));
    case DELETE:
      localStorage.setItem(
        "todo",
        JSON.stringify(state.filter((todo) => todo.id !== action.id))
      );
      return JSON.parse(localStorage.getItem("todo"));
    default:
      return state;
  }
};

const store = legacy_createStore(reducer);

export const actionCreators = {
  addTodo,
  deleteTodo,
};

export default store;
