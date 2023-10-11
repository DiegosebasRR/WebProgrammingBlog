import Card from "../Card/Card";
import styles from "./languages.module.css";

const Languages = () => {
  return (
    <div className={styles.container}>
      <Card name="Python" backgroundColor="#77dd77" icon="python" />
      <Card
        horizontal
        name="JavaScript"
        backgroundColor="#F0BD14"
        icon="javascript"
      />
      <Card name="TypeScript" backgroundColor="#84b6f4" icon="typescript" />
      <Card name="Java" backgroundColor="#ff6961" icon="java" />
      <Card
        horizontal
        name="C Sharp"
        backgroundColor="#b186f1"
        icon="c_sharp"
      />
      <Card name="Kotlin" backgroundColor="#FFA07A" icon="kotlin" />
    </div>
  );
};

export default Languages;
