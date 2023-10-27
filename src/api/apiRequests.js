const awsURL = "https://m7xf5hxi5i.execute-api.us-east-1.amazonaws.com/dev";

export const getTodo = async () => {
  try {
    const response = await fetch(awsURL);
    if (!response.ok) {
      throw new Error("oops somenting went wrong!");
    }
    return response;
  } catch (error) {
    return error;
  }
};

export const postTodo = async (todo) => {
  if (todo.todo.trim().length === "") {
    return "Todo description cannot be empty";
  }
  try {
    const response = await fetch(awsURL, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
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
    if (response.ok) {
      console.log(`successfully deleted "${todoToDelete.todo}"`);
    }

    return response;
  } catch (error) {
    return error;
  }
};

export const patchTodo = async (todoToUpdate) => {
  try {
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
    return error;
  }
};
