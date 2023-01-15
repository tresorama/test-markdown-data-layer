import { getDatabaseIdByName } from "./notion.config";
import { notion, n2m } from "./notion.client";
import { createNotionUtils } from "./notion.utils";
import { type BlogPost, validateBlogPostOrThrow } from "@/utils/blog/blog.schema";
import { compileMarkdownToHTMLString } from "@/utils/blog/utils/utils.markdown";

// Project specific utilities
const { getDatabaseRecords, getPageProperty, getPageById } = createNotionUtils(notion);
const getBlogPostDatabaseRecords = async () => getDatabaseRecords(getDatabaseIdByName('blogpost'));
const getAllBlogPostPageId = async (): Promise<string[]> => {
  const records = await getBlogPostDatabaseRecords();
  return records.map(r => r.id);
};
const getBlogPostPageIdBySlug = async (slug: BlogPost['slug']): Promise<string | null> => {
  const records = await getBlogPostDatabaseRecords();
  const record = records.find(r => getPageProperty(r, 'slug') === slug);
  if (!record) return null;
  return record.id;
};
const getBlogPostByPageId = async (pageId: string): Promise<BlogPost> => {
  const notionPage = await getPageById(pageId);
  const markdowndBlocks = await n2m.pageToMarkdown(notionPage.id);
  const contentAsMarkdownString = n2m.toMarkdownString(markdowndBlocks);
  const contentAsHTMLString = compileMarkdownToHTMLString(contentAsMarkdownString);
  const blogPost: BlogPost = {
    // required fields
    slug: getPageProperty(notionPage, 'slug'),
    title: getPageProperty(notionPage, 'title'),
    contentAsHTMLString,
    // custom fields
    excerpt: getPageProperty(notionPage, 'excerpt'),
    coverImage: null,
    date: getPageProperty(notionPage, 'date'),
    author: {
      name: getPageProperty(notionPage, 'author_name'),
      picture: null,
    },
  };
  validateBlogPostOrThrow(blogPost);
  return blogPost;
};

// Public API for this datasource
export const notionDB = {
  getAllBlogPost: async (): Promise<BlogPost[]> => {
    const pageIds = await getAllBlogPostPageId();
    const blogPosts = await Promise.all(
      pageIds.map(pageId => getBlogPostByPageId(pageId))
    );
    return blogPosts;
  },
  getBlogPostBySlug: async (slug: string): Promise<BlogPost | null> => {
    const pageId = await getBlogPostPageIdBySlug(slug);
    if (!pageId) return null;
    return getBlogPostByPageId(pageId);
  }
};
