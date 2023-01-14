import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from 'gray-matter';
import { parseMarkdownIntoHTMLString } from "./utils.markdown";
import { BlogPost, validateBlogPostOrThrow } from "./blog.schema";
import { capitalize } from "./utils.string";
export { type BlogPost };

const getBlogDirPath = () => path.resolve(process.cwd(), "./src/blog-contents");
export const getAllBlogPostSlugs = () => readdirSync(getBlogDirPath()).map(filename => filename.replace('.md', ''));
const getBlogPostFileBySlug = (slug: string) => readFileSync(`${getBlogDirPath()}/${slug}.md`);

export type BlogPost = {
  slug: string,
  title: string,
  content: {
    markdownAsHTMLString: string,
  },
};

export const getBlogPostBySlug = (slug: string): BlogPost => {
  const file = getBlogPostFileBySlug(slug);
  const metadata = matter(file.toString());
  const markdownAsString = metadata.content;
  const contentAsHTMLString = parseMarkdownIntoHTMLString(markdownAsString);
  const blogPost: BlogPost = {
    // required fields
    slug,
    title: metadata.data.title ?? capitalize(slug.replaceAll('-', ' ')),
    contentAsHTMLString,
    // custom fields
    excerpt: metadata.data.excerpt,
    date: metadata.data.date,
    author: metadata.data.author,
    coverImage: metadata.data.coverImage,
  };
  validateBlogPostOrThrow(blogPost);
  return blogPost;
};
export const getAllBlogPosts = (): BlogPost[] => {
  const slugs = getAllBlogPostSlugs();
  return slugs.map(getBlogPostBySlug);
};