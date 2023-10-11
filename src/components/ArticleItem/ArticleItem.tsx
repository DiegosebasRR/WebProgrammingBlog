import { FunctionComponent } from "react";
import styles from "./ArticleItem.module.css";
import { Article } from "../../types/article.interface";
import { useNavigate } from "react-router-dom";

interface Props {
  gridArea: string;
  data: Article;
}
const ArticleItem: FunctionComponent<Props> = ({ gridArea, data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (data) {
      navigate(`/article/${data._id}`);
    }
  };

  return (
    <div
      className={styles.container}
      style={{ gridArea }}
      onClick={handleClick}
    >
      {gridArea == "articleOne" && (
        <img
          className={styles.img}
          src="https://keepcoding.io/wp-content/uploads/2023/09/modularidad-en-programacion-768x375.jpg"
        />
      )}
      <div className={styles.content}>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <p>25 de septiembre de 2023</p>
      </div>
    </div>
  );
};

export default ArticleItem;
