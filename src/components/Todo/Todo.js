import React, { useState, useCallback } from "react";
import TodoForm from "./TodoForm/TodoForm";
import styles from "./Todo.module.css";
import TodoList from "./TodoList/TodoList";
import ErrorModel from "../UI/ErrorModal";
import Search from "./Search/Search";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const addTodoHandler = useCallback((todo) => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/todo/", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((responseData) => {
        setLoading(false);

        setTodos((prevtodos) => [
          ...prevtodos,
          { id: responseData.id, ...todo },
        ]);
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to add the todo");
      });
  }, []);

  const filteredTodos = useCallback(
    (searchedTodos) => {
      setTodos(searchedTodos);
      setLoading(false);
    },
    [setTodos]
  );

  const isLoadingSet = useCallback(() => {
    setLoading((prevState) => !prevState);
  }, [setLoading]);

  const removeTodoHandler = useCallback((id) => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/todo/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        setLoading(false);
        if (!response.ok) throw Error(response.statusText);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to delete the todo");
      });
  }, []);

  const errorConfirm = useCallback(() => {
    setError();
  }, []);

  return (
    <div>
      {error && <ErrorModel onClose={errorConfirm}>{error}</ErrorModel>}
      <Search searchTodos={filteredTodos} isLoadingSet={isLoadingSet} />
      <div className={styles.container}>
        <TodoForm onAddItem={addTodoHandler} isLoading={loading} />

        <TodoList todos={todos} onRemoveItem={removeTodoHandler} />
      </div>
    </div>
  );
};

export default Todo;
