import { useState } from "react";
import TodoApp from "./components/TodoApp";
import NotesApp from "./components/NotesApp";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("todo");

  return (
    <div className="container">
      <header>
        <h1>Minor Project 04 - Web Development</h1>
        <div className="tab-buttons">
          <button
            className={activeTab === "todo" ? "active" : ""}
            onClick={() => setActiveTab("todo")}
          >
            To-Do App
          </button>
          <button
            className={activeTab === "notes" ? "active" : ""}
            onClick={() => setActiveTab("notes")}
          >
            Notes App
          </button>
        </div>
      </header>
      <main>
        {activeTab === "todo" ? <TodoApp /> : <NotesApp />}
      </main>
    </div>
  );
}