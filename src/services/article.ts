import axios from "axios";

const baseUrl = "http://localhost:3002/";

export const fetchArticleById = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/article/${id}`);
    return response;
  } catch (error) {
    console.error("Error al obtener el artículo por ID:", error);
    return null;
  }
};
