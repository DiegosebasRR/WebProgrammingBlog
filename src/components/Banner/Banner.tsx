import { FunctionComponent } from "react";
import styles from "./Banner.module.css";

interface Props {
  name?: string;
}

const Banner: FunctionComponent<Props> = ({ name }) => {
  return (
    <div className={styles.container} style={{ backgroundColor: "red" }}>
      <h1 className={styles.title}>{name}</h1>
    </div>
  );
};

export default Banner;
