import React, { useEffect, useState, useCallback, useContext } from "react";
import TodoList from "./components/TodoList";
import { MdSwitchAccessShortcutAdd } from "react-icons/md";
import { LiaPoopSolid } from "react-icons/lia";
import { FidgetSpinner } from "react-loader-spinner";
import IconError from "./IconError.svg";
import uuid from "react-uuid";
import { TodoContext } from "./App";
import { getTodo } from "./api/apiRequests";

const TodoSection = () => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const newUuid = uuid();
  const [todos, setTodos] = useContext(TodoContext);

  const postTodo = async () => {
    setError(null);
    if (todo.trim().length === "") {
      setError("Todo description cannot be empty");
      return;
    }
    try {
      const newTodoData = {
        ID: newUuid,
        todo: todo,
        isDone: false,
      };
      const response = await fetch(
        "https://m7xf5hxi5i.execute-api.us-east-1.amazonaws.com/dev",
        {
          method: "POST",
          body: JSON.stringify(newTodoData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      console.log(`successfully posted "${newTodoData.todo}"`);
      setTodo("");
    } catch (error) {
      setError(error.message);
    }
    getTodo();
  };

  const patchTodo = async (todoToUpdate) => {
    setError(null);
    try {
      todoToUpdate.isDone = !todoToUpdate.isDone;
      /*setTodos([...todos]);*/
      const response = await fetch(
        `https://m7xf5hxi5i.execute-api.us-east-1.amazonaws.com/dev`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: todoToUpdate.ID,
            todo: todoToUpdate.todo,
            isDone: todoToUpdate.isDone,
          }),
        }
      );

      console.log(response, "response");
      if (!response.ok) {
        throw new Error("Update request failed");
      }
      console.log(todoToUpdate, "todo to update ");
      console.log(`successfully updated "${todoToUpdate.todo}"`);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      const response = await getTodo();
      if (response.ok) {
        const data = await response.json();
        setTodos(JSON.parse(data.body));
      } else {
        setError(response.error);
      }
    };

    load();
  }, [setTodos]);

  const changeHandler = (event) => {
    setTodo(event.target.value);
  };
  const doneTodos = todos.filter(
    (notDoneTodos) => notDoneTodos.isDone === true
  );
  const newTodos = todos.filter((todo) => todo.isDone === false);

  let content;

  if (error) {
    // eslint-disable-next-line jsx-a11y/alt-text
    content = <img className="img" src={IconError} />;
  }

  const inputField = (
    <>
      <h2>Please add some todos</h2>
      <div className="add-todo">
        <input onChange={changeHandler} value={todo} />
        <button onClick={postTodo}>
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
          <TodoList
            toggleCheckbox={(test) => patchTodo(test)}
            todos={newTodos}
          />
        </div>
        <div className="todo-container">
          <h3>dones:</h3>
          <TodoList
            toggleCheckbox={(test) => patchTodo(test)}
            todos={doneTodos}
          />
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
