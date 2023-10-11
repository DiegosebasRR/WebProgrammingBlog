export interface Article {
  _id: string;
  title: string;
  description: string;
  content: Content[];
  tag: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Content {
  type: string;
  text: string;
  order: number;
  editing: boolean;
}
