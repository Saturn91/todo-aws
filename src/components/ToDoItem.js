import React, { useContext } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { deleteTodo, patchTodo } from "../api/apiRequests";
import { ApiStateContext, TodoContext } from "../App";

const ToDoItem = ({ todo }) => {
  const [todos, setTodos] = useContext(TodoContext);
  // eslint-disable-next-line no-unused-vars
  const [_, setApiState] = useContext(ApiStateContext);

  return (
    <li key={todo.ID} className="todo-item">
      <input
        checked={todo.isDone}
        onChange={async () => {
          patchTodo({
            ...todo,
            isDone: !todo.isDone,
          });

          todo.isDone = !todo.isDone;
          setTodos([...todos]);
        }}
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
            setApiState({ error: response.message });
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
