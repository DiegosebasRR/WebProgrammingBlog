import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Card.module.css";
import axios from "axios";
import { Category } from "../../types/category.interface";
import { useNavigate } from "react-router-dom";

interface Props {
  horizontal?: boolean;
  name: string;
  icon: string;
  backgroundColor: string;
}

const Card: FunctionComponent<Props> = ({
  backgroundColor,
  icon,
  horizontal,
  name,
}) => {
  const [data, setData] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3002/category/title/${name}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setIsLoading(false);
      });
  }, [name]);

  const handleClick = () => {
    if (data) {
      navigate(`/category/${data._id}`);
    }
  };

  return (
    <div
      className={`${styles.container} ${
        horizontal ? styles.horizontal : styles.vertical
      } `}
      style={{ backgroundColor, gridArea: icon }}
      onClick={handleClick}
    >
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className={styles.content}>
          <p className={styles.category}>{data?.tag}</p>
          <h2 className={styles.name}>{data?.title}</h2>
          <p className={styles.description}>{data?.description}</p>
        </div>
      )}
      <img className={styles.icon} src={`/img/${icon}.svg`} alt={icon} />
    </div>
  );
};

export default Card;
