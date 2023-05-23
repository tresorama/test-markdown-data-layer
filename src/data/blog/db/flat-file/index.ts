import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from 'gray-matter';
import { compileMarkdownToHTMLString } from "@/data/blog/utils/utils.markdown";
import { capitalize } from "@/data/blog/utils/utils.string";
import { sortByDateDescending } from "@/data/blog/utils/utils.sort";
import { type BlogPost, validateBlogPostOrThrow } from "@/data/blog/blog.schema";
import { type BlogPostDatasource } from "@/data/blog/blog.datasource.types";

// Utils for working with disk
const getBlogDirPath = () => path.resolve(process.cwd(), "./src/blog-contents");
const getAllBlogPostFileNames = () => readdirSync(getBlogDirPath()).map(filename => filename.replace('.md', ''));
const getBlogPostFileBySlug = (slug: string) => readFileSync(`${getBlogDirPath()}/${slug}.md`);

// Utils 
const getAllBlogPostSlugs = () => getAllBlogPostFileNames();

// Public API for this datasource
export const flatFileDB: BlogPostDatasource = {
  getAllBlogPost: async () => {
    const slugs = getAllBlogPostSlugs();
    const blogPosts: BlogPost[] = [];
    for (const slug of slugs) {
      const blogPost = await flatFileDB.getBlogPostBySlug(slug);
      if (!blogPost) continue;
      blogPosts.push(blogPost);
    }
    return blogPosts.sort((a, b) => sortByDateDescending(a.date, b.date));
  },
  getBlogPostBySlug: async (slug) => {
    const file = getBlogPostFileBySlug(slug);
    const metadata = matter(file.toString());
    const markdownAsString = metadata.content;
    const contentAsHTMLString = compileMarkdownToHTMLString(markdownAsString);
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
  }
};