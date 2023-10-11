import { Article } from "../../types/article.interface";
import styles from "./ClassCard.module.css";
import { useNavigate } from "react-router-dom";
interface ClassCardProps {
  article?: Article; // Define el tipo de prop 'article'
}

const ClassCard: React.FC<ClassCardProps> = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article?._id}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <img
        className={styles.imgClass}
        src="https://keepcoding.io/wp-content/uploads/2022/11/10-componentes-del-virtual-box-300x146.jpg"
      />
      <div className={styles.content}>
        <p>{article?.tag}</p>
        <h2>{article?.title}</h2>
        <p>{article?.description}</p>
        <p>2023 - 07 - 22</p>
      </div>
    </div>
  );
};

export default ClassCard;
