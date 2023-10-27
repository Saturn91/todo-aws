import React from "react";
import ToDoItem from "./components/ToDoItem";

const ToDoList = ({ todos, toggleCheckbox, onDelete }) => {
  return (
    <ul>{!!todos.length && todos.map((todo) => <ToDoItem todo={todo} />)}</ul>
  );
};

export default ToDoList;
