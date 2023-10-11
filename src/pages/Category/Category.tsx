import axios from "axios";
import Banner from "../../components/Banner/Banner";
import Cardsection from "../../components/Cardsection/Cardsection";
import styles from "./Category.module.css";
import { Category as CategoryI } from "../../types/category.interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState<CategoryI | undefined>();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3002/category/${id}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el artículo:", error);
      });
  }, [id]);

  return (
    <div className={styles.container}>
      <Banner name={category?.title} />
      <Cardsection articles={category?.article} />
    </div>
  );
};

export default Category;
