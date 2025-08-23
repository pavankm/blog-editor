interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default BlogPost;
