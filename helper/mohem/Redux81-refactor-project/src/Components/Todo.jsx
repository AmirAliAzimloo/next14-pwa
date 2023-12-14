import React from "react";

export default function Todo({ todo }) {
  return (
    <div className="todo">
      <li className="todo-item">{todo}</li>
      <button className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}
