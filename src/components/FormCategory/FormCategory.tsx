import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import styles from "./FormCategory.module.css";

const FormCategory = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    image: null as File | null, // Estado para la imagen seleccionada
    imagePreview: "" as string, // Estado para la previsualización de la imagen
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData({
            ...formData,
            image: file,
            imagePreview: event.target.result as string,
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("tag", formData.tag);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/category/",
        formDataToSend
      );

      // Manejar la respuesta del servidor aquí, por ejemplo, mostrar un mensaje de éxito.
      console.log("Respuesta del servidor:", response.data);

      // Limpiar el formulario
      setFormData({
        title: "",
        description: "",
        tag: "",
        image: null,
        imagePreview: "",
      });
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error.
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Crear una nueva categoría</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="tag">Etiqueta (Tag):</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Imagen:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          {formData.imagePreview && (
            <img
              src={formData.imagePreview}
              alt="Imagen Previa"
              className={styles.imagePreview}
            />
          )}
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormCategory;
