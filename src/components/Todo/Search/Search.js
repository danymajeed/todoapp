import React, { useState, useEffect, useRef } from "react";
import styles from "./Search.module.css";

const Search = React.memo((props) => {
  const { searchTodos } = props;
  const { isLoadingSet } = props;
  const [search, setSearch] = useState("");

  const inputRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === inputRef.current.value) {
        isLoadingSet();
        const queryParams = search.length === 0 ? "" : search;
        fetch("http://127.0.0.1:8000/todo/?search=" + queryParams)
          .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
          })
          .then((responseData) => {
            const loadedTodos = [];
            for (let key in responseData) {
              loadedTodos.push({
                id: responseData[key].id,
                title: responseData[key].title,
                description: responseData[key].description,
              });
            }
            searchTodos(loadedTodos);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search, searchTodos, inputRef, isLoadingSet]);

  return (
    <section className={styles.search}>
      <div className={styles.searchInput}>
        <p>
          <strong>Search</strong>
        </p>
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    </section>
  );
});

export default Search;
