import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import styles from "./FormArticle.module.css";
import { useNavigate } from "react-router-dom";

const FormArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [] as string[],
    category: "",
    image: null as File | null,
    imagePreview: "" as string,
  });

  const [categories, setCategories] = useState(
    [] as { _id: string; title: string }[]
  );

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3002/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    setFormData({ ...formData, category: selectedCategoryId });
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",");
    setFormData({ ...formData, tags });
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
    formDataToSend.append("tags", formData.tags.join(","));
    formDataToSend.append("category", formData.category);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/article/",
        formDataToSend
      );

      console.log("Respuesta del servidor:", response.data);

      setFormData({
        title: "",
        description: "",
        tags: [],
        category: "",
        image: null,
        imagePreview: "",
      });
      navigate(`/article/addArticle/${response.data._id}`);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Crear un nuevo artículo</h2>
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
          <label htmlFor="tags">Tags (Separa por comas):</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(",")}
            onChange={handleTagsChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
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

export default FormArticle;
