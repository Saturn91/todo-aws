import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ todos, toggleCheckbox }) => {
  return (
    <ul>{!!todos.length && todos.map((todo) => <ToDoItem todo={todo} />)}</ul>
  );
};

export default ToDoList;
