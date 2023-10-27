import uuid from "react-uuid";

const awsURL = "https://m7xf5hxi5i.execute-api.us-east-1.amazonaws.com/dev";

export const getTodo = async () => {
  try {
    const response = await fetch(awsURL);
    if (!response.ok) {
      throw new Error("oops somenting went wrong!");
    }
    const data = await response.json();
    return JSON.parse(data.body);
  } catch (error) {
    return error.message;
  }
};

export const postTodo = async (todo) => {
  if (todo.trim().length === "") {
    return "Todo description cannot be empty";
  }
  try {
    const newTodoData = {
      ID: uuid(),
      todo: todo,
      isDone: false,
    };
    const response = await fetch(awsURL, {
      method: "POST",
      body: JSON.stringify(newTodoData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error.message;
  }
};

export const deleteTodo = async (todoToDelete) => {
  try {
    const response = await fetch(awsURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: todoToDelete.ID,
        todo: todoToDelete.todo,
      }),
    });
    if (!response.ok) {
      throw new Error("Delete request failed");
    }
    console.log(`successfully deleted "${todoToDelete.todo}"`);

    return todoToDelete;
  } catch (error) {
    return error.message;
  }
};

export const patchTodo = async (todoToUpdate) => {
  try {
    todoToUpdate.isDone = !todoToUpdate.isDone;
    const response = await fetch(awsURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: todoToUpdate.ID,
        todo: todoToUpdate.todo,
        isDone: todoToUpdate.isDone,
      }),
    });

    console.log(`successfully updated "${todoToUpdate.todo}"`);

    return response;
  } catch (error) {
    return error.message;
  }
};
