import React, { useEffect, useState, useContext } from "react";
import TodoList from "./TodoList";
import { LiaPoopSolid } from "react-icons/lia";
import { FidgetSpinner } from "react-loader-spinner";
import IconError from "../IconError.svg";
import { TodoContext } from "../App";
import { getTodo } from "../api/apiRequests";
import ToDoForm from "./ToDoForm";

const TodoSection = () => {
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
    setActiveTodos(todos.filter((todo) => !todo.isDone));
    setDoneTodos(todos.filter((todo) => !!todo.isDone));
  }, [todos]);

  if (error) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img className="img" src={IconError} />;
  }

  if (isLoading) {
    return (
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

  if (todos.length > 0) {
    return (
      <>
        <ToDoForm setError={setError} />
        <TodoList todos={activeTodos} title="todo:" />
        <TodoList todos={doneTodos} title="dones:" />
      </>
    );
  }

  return (
    <>
      <ToDoForm setError={setError} />
      <h1 className="loadingSpinner">
        Found no todos
        <LiaPoopSolid />
      </h1>
    </>
  );
};

export default TodoSection;