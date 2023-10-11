import { FormEvent, useState } from "react";
import styles from "./AddArticle.module.css";
import TextareaAutosize from "react-textarea-autosize";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddArticle = () => {
  const [elements, setElements] = useState<
    { type: string; text: string; order: number; editing?: boolean }[]
  >([]);
  const { id } = useParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      content: elements,
    };

    try {
      const response = await axios.put(
        `http://localhost:3002/article/${id}`,
        formData
      );
      console.log("Respuesta del servidor:", response.data.content);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleAddTitle = () => {
    setElements([
      ...elements,
      {
        type: "title",
        text: "",
        order: elements.length + 1,
        editing: true,
      },
    ]);
  };

  const handleAddSubtitulo = () => {
    setElements([
      ...elements,
      {
        type: "subtitle",
        text: "",
        order: elements.length + 1,
        editing: true,
      },
    ]);
  };

  const handleAddTexto = () => {
    setElements([
      ...elements,
      {
        type: "text",
        text: "",
        order: elements.length + 1,
        editing: true,
      },
    ]);
  };

  const handleAddCode = () => {
    setElements([
      ...elements,
      {
        type: "code",
        text: "",
        order: elements.length + 1,
        editing: true,
      },
    ]);
  };

  const handleEditCode = (index: number) => {
    const updatedElements = [...elements];
    updatedElements[index].editing = true;
    setElements(updatedElements);
  };

  const handleSaveCode = (index: number) => {
    const updatedElements = [...elements];
    updatedElements[index].editing = false;
    setElements(updatedElements);
  };

  const handleRemoveElement = (index: number) => {
    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
  };

  const handleChangeElement = (index: number, text: string) => {
    const updatedElements = [...elements];
    updatedElements[index].text = text;
    setElements(updatedElements);
  };

  const handleMoveElementUp = (index: number) => {
    if (index > 0) {
      const updatedElements = [...elements];
      const currentElement = updatedElements[index];
      const previousElement = updatedElements[index - 1];

      // Intercambiar los valores de order entre los dos elementos.
      currentElement.order = previousElement.order;
      previousElement.order = index + 1;

      // Reordenar los elementos en la matriz.
      updatedElements[index] = previousElement;
      updatedElements[index - 1] = currentElement;

      setElements(updatedElements);
    }
  };

  const handleMoveElementDown = (index: number) => {
    if (index < elements.length - 1) {
      const updatedElements = [...elements];
      const currentElement = updatedElements[index];
      const nextElement = updatedElements[index + 1];

      // Intercambiar los valores de order entre los dos elementos.
      currentElement.order = nextElement.order;
      nextElement.order = index + 1;

      // Reordenar los elementos en la matriz.
      updatedElements[index] = nextElement;
      updatedElements[index + 1] = currentElement;

      setElements(updatedElements);
    }
  };
  return (
    <div className={styles.container}>
      {elements.map((element, index) => (
        <div key={index} className={styles.elementContainer}>
          <div className={styles.elementContent}>
            {element.type === "title" && (
              <input
                className={styles.title}
                placeholder="Titulo"
                type="text"
                value={element.text}
                onChange={(e) => handleChangeElement(index, e.target.value)}
              />
            )}
            {element.type === "subtitle" && (
              <input
                className={styles.subtitle}
                placeholder="Subtitulo"
                type="text"
                value={element.text}
                onChange={(e) => handleChangeElement(index, e.target.value)}
              />
            )}
            {element.type === "text" && (
              <TextareaAutosize
                minRows={1}
                className={styles.text}
                placeholder="Texto"
                value={element.text}
                onChange={(e) => handleChangeElement(index, e.target.value)}
              />
            )}
            {element.type === "code" && (
              <div className={styles.codeContainer}>
                {element.editing ? (
                  <div>
                    <TextareaAutosize
                      wrap="hard"
                      minRows={1}
                      className={styles.code}
                      placeholder="Código"
                      value={element.text}
                      onChange={(e) =>
                        handleChangeElement(index, e.target.value)
                      }
                    />
                    <button
                      className={styles.addButton}
                      onClick={() => handleSaveCode(index)}
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div>
                    <SyntaxHighlighter
                      language="javascript"
                      style={atomOneDark}
                    >
                      {element.text}
                    </SyntaxHighlighter>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditCode(index)}
                    >
                      Editar Código
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.moveButtons}>
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveElement(index)}
            >
              Eliminar
            </button>
            <button
              className={styles.moveButton}
              onClick={() => handleMoveElementUp(index)}
            >
              ▲
            </button>
            <button
              className={styles.moveButton}
              onClick={() => handleMoveElementDown(index)}
            >
              ▼
            </button>
          </div>
        </div>
      ))}

      <div className={styles.addButtons}>
        <button className={styles.addButton} onClick={handleAddTitle}>
          Agregar Titulo
        </button>
        <button className={styles.addButton} onClick={handleAddSubtitulo}>
          Agregar Subtitulo
        </button>
        <button className={styles.addButton} onClick={handleAddTexto}>
          Agregar Texto
        </button>
        <button className={styles.addButton} onClick={handleAddCode}>
          Agregar Codigo
        </button>
      </div>
      <button className={styles.addButton} onClick={handleSubmit}>
        Guardar
      </button>
    </div>
  );
};

export default AddArticle;
