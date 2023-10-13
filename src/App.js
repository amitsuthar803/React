import { useState } from "react";

const data = [
  {
    id: 1,
    todo: "Clear the garden",
    check: false,
  },
  {
    id: 2,
    todo: "Buy Grocery",
    check: false,
  },
  {
    id: 3,
    todo: "Go to College",
    check: false,
  },
];

export default function App() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState(data);
  // const [selectedTodo, setSelectedTodo] = useState("null");

  function submitHandler(e) {
    e.preventDefault();
    if (!input) return;
    setInput("");

    const newTodo = { id: Date.now(), todo: input, check: false };
    setTodo((data) => [...data, newTodo]);
  }

  function deleteHandler(todo) {
    setTodo((c) => c.filter((c) => c.id !== todo.id));
  }

  function selectedHandler(todo) {
    setTodo((items) =>
      items.map((item) =>
        item.id === todo.id ? { ...item, check: !item.check } : item
      )
    );
  }

  return (
    <div className="app">
      <h2>Todo List App</h2>
      <Input value={input} onInput={setInput} submitHandler={submitHandler} />
      <Output
        todo={todo}
        onDelete={deleteHandler}
        onSelect={selectedHandler}
        // selectedTodo={selectedTodo}
      ></Output>
      <Footer />
    </div>
  );
}

function Input({ value, onInput, submitHandler }) {
  return (
    <form className="todo-form" onSubmit={(e) => submitHandler(e)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onInput(e.target.value)}
        placeholder="Add Todo Here..."
      ></input>
      <button className="input-btn">Add</button>
    </form>
  );
}

function Output({ todo, onDelete, onSelect, selectedTodo }) {
  return (
    <ul className="output">
      {todo.map((item) => (
        <TodoList
          item={item}
          onDelete={onDelete}
          onSelect={onSelect}
          key={item.id}
        />
      ))}
    </ul>
  );
}

function TodoList({ item, onDelete, onSelect, selectedTodo }) {
  // const isSelected = selectedTodo === item;

  return (
    <li className="list">
      <div className="text-box">
        <input
          type="checkbox"
          value={item.check}
          onChange={() => onSelect(item)}
        ></input>
        <span className={item.check ? "list-text selected" : "list-text"}>
          {item.todo}
        </span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(item)}>
        ❌
      </button>
    </li>
  );
}

function Footer() {
  return (
    <footer>
      <p>©Copyright 2023. All Rights Reserved By Amit</p>
    </footer>
  );
}
