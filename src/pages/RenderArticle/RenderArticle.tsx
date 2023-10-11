import SyntaxHighlighter from "react-syntax-highlighter";
import styles from "./RenderArticle.module.css";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";
import { useEffect, useState } from "react";
import { Article, Content } from "../../types/article.interface"; // Asegúrate de importar las interfaces adecuadas
import { useParams } from "react-router-dom";
const RenderArticle = () => {
  const [article, setArticle] = useState<Article | undefined>();
  const { id } = useParams();
  useEffect(() => {
    // Realizar la solicitud GET usando Axios
    axios
      .get(`http://localhost:3002/article/${id}`)
      .then((response) => {
        // Actualizar el estado con los datos recibidos
        setArticle(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el artículo:", error);
      });
  }, []);

  const renderContent = (content: Content[]) => {
    // Ordenar el contenido por el campo 'order'
    const sortedContent = content.slice().sort((a, b) => a.order - b.order);

    return sortedContent.map((item, index) => {
      if (item.type === "title") {
        return (
          <h1 key={index} className={styles.title}>
            {item.text}
          </h1>
        );
      } else if (item.type === "subtitle") {
        return (
          <h2 key={index} className={styles.subtitle}>
            {item.text}
          </h2>
        );
      } else if (item.type === "text") {
        const textWithLineBreaks = item.text.replace(/\n/g, "<br />");
        return (
          <p
            key={index}
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: textWithLineBreaks }}
          ></p>
        );
      } else if (item.type === "code") {
        return (
          <div key={index} className={styles.codeContainer}>
            <div className={styles.codeHeader}>
              <div className={styles.trafficLight}>
                <div className={styles.redCircle}></div>
                <div className={styles.yellowCircle}></div>
                <div className={styles.greenCircle}></div>
              </div>
            </div>
            <SyntaxHighlighter
              key={index}
              language="javascript"
              style={atomOneDark}
              className={styles.code}
            >
              {item.text}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        return null; // Manejo de otros tipos de contenido, si es necesario
      }
    });
  };

  return (
    <div className={styles.container}>
      {article && (
        <>
          <div className={styles.text}>
            {article.content && renderContent(article.content)}
          </div>
        </>
      )}
    </div>
  );
};

export default RenderArticle;
