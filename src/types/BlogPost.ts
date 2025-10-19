interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  coverImage?: string; // Optional cover image URL
  tags?: string[]; // Optional tags/categories
}

export default BlogPost;
