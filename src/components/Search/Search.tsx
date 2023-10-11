import styles from "./Search.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "../../types/category.interface";
import { Article } from "../../types/article.interface"; // Asegúrate de importar la interfaz correcta para los artículos
import { Link } from "react-router-dom";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]); // Agrega el estado para los artículos
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]); // Agrega el estado para los artículos filtrados

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Filtrar categorías
    if (newSearchTerm === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((category) =>
        category.title.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    }

    // Filtrar artículos
    if (newSearchTerm === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:3002/category"
        );
        const categoriesData: Category[] = categoryResponse.data;
        setCategories(categoriesData);
        setFilteredCategories(categoriesData);

        const articleResponse = await axios.get(
          "http://localhost:3002/article"
        );
        const articlesData: Article[] = articleResponse.data;
        setArticles(articlesData);
        setFilteredArticles(articlesData);
      } catch (error) {
        console.error("Error al obtener las categorías o artículos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        placeholder="Buscar categoría o artículo"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className={styles.ul}>
        <h3>Categories</h3>
        {filteredCategories.map((category) => (
          <li key={category._id}>
            <Link to={`/category/${category._id}`}>{category.title}</Link>
          </li>
        ))}
        <h3>Articles</h3>
        {filteredArticles.map((article) => (
          <li key={article._id}>
            <Link to={`/article/${article._id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
