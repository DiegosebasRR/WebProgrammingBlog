import { Article } from "../../types/article.interface";
import ClassCard from "../ClassCard/ClassCard";
import styles from "./Cardsection.module.css";

interface CardsectionProps {
  articles?: Article[]; // Define el tipo de prop 'article'
}

const Cardsection: React.FC<CardsectionProps> = ({ articles }) => {
  return (
    <div className={styles.container}>
      {articles?.map((article) => (
        <ClassCard key={article._id} article={article} />
      ))}
    </div>
  );
};

export default Cardsection;
