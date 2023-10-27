import React, { useContext } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { deleteTodo } from "../api/apiRequests";
import { TodoContext } from "../App";

const ToDoItem = ({ todo, toggleCheckbox }) => {
  const [todos, setTodos] = useContext(TodoContext);

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
      <button
        onClick={async () => {
          setTodos(todos.filter((cur) => todo.ID !== cur.ID));
          const response = await deleteTodo(todo);
          if (!response.ok) {
            console.error("something went wrong...");
            setTodos({ ...todos, todo });
          }
        }}
        className="delete-button"
      >
        <BsFillTrash3Fill />
      </button>
    </li>
  );
};

export default ToDoItem;
