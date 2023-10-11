import { Outlet } from "react-router-dom";

import styles from "./Article.module.css";

const Article = () => {
  return (
    <div className={styles.container}>
      <aside></aside>
      <Outlet />
      <aside></aside>
    </div>
  );
};

export default Article;
