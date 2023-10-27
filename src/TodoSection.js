import React, { useEffect, useState, useContext } from "react";
import TodoList from "./components/TodoList";
import { MdSwitchAccessShortcutAdd } from "react-icons/md";
import { LiaPoopSolid } from "react-icons/lia";
import { FidgetSpinner } from "react-loader-spinner";
import IconError from "./IconError.svg";
import { TodoContext } from "./App";
import { getTodo, postTodo } from "./api/apiRequests";
import uuid from "react-uuid";

const TodoSection = () => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useContext(TodoContext);
  const [doneTodos, setDoneTodos] = useState(
    todos.filter((todo) => todo.isDone)
  );

  const [activeTodos, setActiveTodos] = useState(
    todos.filter((todo) => !todo.isDone)
  );

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const response = await getTodo();
      if (response.ok) {
        const data = await response.json();
        setTodos(JSON.parse(data.body));
      } else {
        setError(response.error);
      }

      setIsLoading(false);
    };

    load();
  }, [setTodos]);

  useEffect(() => {
    setDoneTodos(todos.filter((todo) => !!todo.isDone));
    setActiveTodos(todos.filter((todo) => !todo.isDone));
  }, [todos]);

  const changeHandler = (event) => {
    setTodo(event.target.value);
  };

  let content;

  if (error) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img className="img" src={IconError} />;
  }

  const inputField = (
    <>
      <h2>Please add some todos</h2>
      <div className="add-todo">
        <input onChange={changeHandler} value={todo} />
        <button
          onClick={async () => {
            const newTodo = {
              ID: uuid(),
              todo: todo,
              isDone: false,
            };
            //optimistic update
            const oldTodos = [...todos];
            setTodos([...oldTodos, newTodo]);
            const response = await postTodo(newTodo);
            if (!response.ok) {
              setError(response.message);
            }
          }}
        >
          <MdSwitchAccessShortcutAdd />
        </button>
      </div>
    </>
  );

  if (todos.length > 0) {
    content = (
      <>
        {inputField}
        <div className="todo-container">
          <h3>todo:</h3>
          <TodoList todos={activeTodos} />
        </div>

        <div className="todo-container">
          <h3>dones:</h3>
          <TodoList todos={doneTodos} />
        </div>
      </>
    );
  } else if (todos.length === 0 && !error) {
    content = (
      <>
        {inputField}
        <h1 className="loadingSpinner">
          Found no todos
          <LiaPoopSolid />
        </h1>
      </>
    );
  }
  if (isLoading) {
    content = (
      <div className="loadingSpinner">
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={["#ff0000", "#00ff00", "#0000ff"]}
          backgroundColor="#6d5390"
        />
      </div>
    );
  }

  return (
    <>
      <div>{content}</div>
    </>
  );
};

export default TodoSection;
