import React, { useState, useContext } from "react";
import { MdSwitchAccessShortcutAdd } from "react-icons/md";
import uuid from "react-uuid";
import { postTodo } from "../api/apiRequests";
import { TodoContext } from "../App";

const ToDoForm = ({ setError }) => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useContext(TodoContext);

  const changeHandler = (event) => {
    setTodo(event.target.value);
  };

  const submit = async () => {
    const newTodo = {
      ID: uuid(),
      todo: todo,
      isDone: false,
    };
    //optimistic update
    const oldTodos = [...todos];
    setTodos([...oldTodos, newTodo]);

    // reset form
    setTodo("");

    const response = await postTodo(newTodo);
    if (!response.ok) {
      setError(response.message);
    }
  };

  return (
    <form
      //using submit allows input on enter and on "button type = 'submit'"
      onSubmit={(e) => {
        e.preventDefault(); //do not reload page!
        submit();
      }}
    >
      <h2>Please add some todos</h2>
      <div className="add-todo">
        <input onChange={changeHandler} value={todo} required />
        <button type="submit">
          <MdSwitchAccessShortcutAdd />
        </button>
      </div>
    </form>
  );
};

export default ToDoForm;
