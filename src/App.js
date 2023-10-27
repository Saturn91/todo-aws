import "./style.css";
import { useState } from "react";
import Navbar from "./Navbar";
import TodoSection from "./TodoSection";
import { createContext } from "react";

export const TodoContext = createContext();
export const ApiStateContext = createContext();

function App() {
  const todoListState = useState([]);
  const apiState = useState({
    isLoading: false,
    error: undefined,
  });
  return (
    <ApiStateContext.Provider value={apiState}>
      <TodoContext.Provider value={todoListState}>
        <Navbar />
        <TodoSection />
      </TodoContext.Provider>
    </ApiStateContext.Provider>
  );
}

export default App;
