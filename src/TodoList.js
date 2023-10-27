import React from "react";
import { BsFillTrash3Fill } from "react-icons/bs";

const ToDoList = ({ todos, toggleCheckbox, onDelete }) => {
  return (
    <ul>
      {!!todos.length &&
        todos.map((todoItem) => (
          <li key={todoItem.ID} className="todo-item">
            <input
              checked={todoItem.isDone}
              onChange={() => toggleCheckbox(todoItem)}
              type="checkbox"
            />
            <p
              className="task"
              style={todoItem.isDone ? { textDecoration: "line-through" } : {}}
            >
              {todoItem.todo}
            </p>
            <button
              onClick={() => onDelete(todoItem)}
              className="delete-button"
            >
              <BsFillTrash3Fill />
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ToDoList;
