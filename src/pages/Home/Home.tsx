import { useEffect, useState } from "react";
import Languages from "../../components/Languages/Languages";
import Section from "../../components/Section/Section";
import { Category } from "../../types/category.interface";
import styles from "./Home.module.css";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/category/`);
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener el artículo:", error);
      }
    };
    fetchData();
  }, []);

  // Ordena los datos por createdAt de forma descendente
  const sortedData = data?.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  // Limita la cantidad de elementos a 5
  const limitedData = sortedData?.slice(0, 5);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Programacion</h1>
      <Languages />
      {limitedData?.map((category, index) => (
        <Section data={category} key={index} rigth={index % 2 !== 0} />
      ))}
    </div>
  );
};

export default Home;
