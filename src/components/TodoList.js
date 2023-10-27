import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ todos }) => {
  return (
    <ul>{!!todos.length && todos.map((todo) => <ToDoItem todo={todo} />)}</ul>
  );
};

export default ToDoList;
