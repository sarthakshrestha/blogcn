export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  tags?: string[];
}
