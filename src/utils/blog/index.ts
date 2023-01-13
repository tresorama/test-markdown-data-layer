import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from 'gray-matter';
import { parseMarkdownIntoHTMLString } from "./utils.markdown";
import { capitalize } from "./utils.string";

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
  const markdownAsHTMLString = parseMarkdownIntoHTMLString(markdownAsString);
  return {
    slug,
    title: metadata.data.title ?? capitalize(slug.replaceAll('-', ' ')),
    content: {
      markdownAsHTMLString,
    },
  };
};
export const getAllBlogPosts = (): BlogPost[] => {
  const slugs = getAllBlogPostSlugs();
  return slugs.map(getBlogPostBySlug);
};