import "./style.css";
import { useState } from "react";
import Navbar from "./Navbar";
import TodoSection from "./TodoSection";
import { createContext } from "react";

export const TodoContext = createContext();

function App() {
  const todoListState = useState([]);

  return (
    <TodoContext.Provider value={todoListState}>
      <Navbar />
      <TodoSection />
    </TodoContext.Provider>
  );
}

export default App;
