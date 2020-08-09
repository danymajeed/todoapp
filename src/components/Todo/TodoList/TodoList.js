import React from "react";
import styles from "./TodoList.module.css";
import Card from "../../UI/Card";
const todoList = (props) => {
  let todo = props.todos.map((todo) => (
    <li key={todo.id}>
      <div className={styles.sameLine}>
        <h3>{todo.title}</h3>
        <button onClick={props.onRemoveItem.bind(this, todo.id)}>Done</button>
      </div>
      <p>{todo.description}</p>
    </li>
  ));

  if (props.todos.length === 0) todo = <h1>NOTHING TODO</h1>;
  return (
    <section className={styles.todolist}>
      <Card>
        <h2>Todo</h2>
        {todo}
      </Card>
    </section>
  );
};

export default todoList;
