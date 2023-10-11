import { FunctionComponent } from "react";
import ArticleItem from "../ArticleItem/ArticleItem";
import styles from "./Section.module.css";
import { Category } from "../../types/category.interface";

interface Props {
  rigth?: boolean;
  data: Category;
}

const Section: FunctionComponent<Props> = ({ rigth, data }) => {
  const sortedData = data?.article.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Limita la cantidad de elementos a 5
  const limitedData = sortedData?.slice(0, 4);

  const gridAreas = ["articleOne", "articleTwo", "articleThree", "articleFour"];
  return (
    <>
      <h2 className={styles.title}>{data.title}</h2>
      <section
        className={`${styles.container} ${rigth ? styles.rigth : styles.left}`}
      >
        {limitedData?.map((article, index) => (
          <ArticleItem
            data={article}
            key={index}
            gridArea={gridAreas[index]} // Asigna el gridArea correspondiente
          />
        ))}
      </section>
    </>
  );
};

export default Section;
