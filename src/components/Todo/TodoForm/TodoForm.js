import React, { useState } from "react";
import styles from "./TodoForm.module.css";
import LoadingIndicator from "../../UI/LoadingIndicator";
import Card from "../../UI/Card";

const TodoForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddItem({ title: title, description: description });
  };

  return (
    <section className={styles.todoform}>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={styles.formcontrol}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              required
              id="title"
              value={title}
              onChange={titleChangeHandler}
            />
          </div>
          <div className={styles.formcontrol}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              required
              id="description"
              value={description}
              onChange={descriptionChangeHandler}
            />
          </div>
          <div className={styles.todoformactions}>
            <button type="submit">ADD</button>
            {props.isLoading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
};

export default TodoForm;
