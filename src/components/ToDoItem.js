import React from "react";
import { BsFillTrash3Fill } from "react-icons/bs";

const ToDoItem = ({ todo, toggleCheckbox, onDelete }) => {
  return (
    <li key={todo.ID} className="todo-item">
      <input
        checked={todo.isDone}
        onChange={() => toggleCheckbox(todo)}
        type="checkbox"
      />
      <p
        className="task"
        style={todo.isDone ? { textDecoration: "line-through" } : {}}
      >
        {todo.todo}
      </p>
      <button onClick={() => onDelete(todo)} className="delete-button">
        <BsFillTrash3Fill />
      </button>
    </li>
  );
};

export default ToDoItem;
