import { Article } from "./article.interface";

export interface Category {
  _id: string;
  title: string;
  description: string;
  tag: string;
  article: Article[];
  createdAt: Date;
  updatedAt: Date;
}
