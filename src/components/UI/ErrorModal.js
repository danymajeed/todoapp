import React from "react";

import styles from "./ErrorModel.module.css";

const ErrorModel = React.memo((props) => {
  return (
    <React.Fragment>
      <div className={styles.backdrop} onClick={props.onClose} />
      <div className={styles.errorModel}>
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className={styles.errorModelActions}>
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModel;
