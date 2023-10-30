import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ todos, title }) => {
  return (
    <div className="todo-container">
      <h3>{title}</h3>
      <ul>{!!todos.length && todos.map((todo) => <ToDoItem todo={todo} />)}</ul>
    </div>
  );
};

export default ToDoList;
