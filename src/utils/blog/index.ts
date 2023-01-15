import { type BlogPost } from "./blog.schema";
import { db } from './blog.datasource';
import { sortByDateDescending } from "./utils/utils.sort";

export { type BlogPost };

// Public API for fetching data
export const getAllBlogPostSlugs = async (): Promise<BlogPost['slug'][]> => {
  const blogPosts = await db.getAllBlogPost();
  return blogPosts
    .sort((a, b) => sortByDateDescending(a.date, b.date))
    .map(b => b.slug);
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const blogPosts = await db.getAllBlogPost();
  return blogPosts.sort((a, b) => sortByDateDescending(a.date, b.date));
};

export const getBlogPostBySlug = async (slug: BlogPost['slug']) => {
  return db.getBlogPostBySlug(slug);
};