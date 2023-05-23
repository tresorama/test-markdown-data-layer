import { getDatabaseIdByName } from "./notion.config";
import { notionClient, n2m } from "./notion.client";
import { createNotionUtils } from "./utils/notion-utils";
import { compileMarkdownToHTMLString } from "@/data/blog/utils/utils.markdown";
import { type BlogPost, validateBlogPostOrThrow } from "@/data/blog/blog.schema";
import { type BlogPostDatasource } from "@/data/blog/blog.datasource.types";

// create a set of utils function that will interact with notion
// because notion api is no so well to read.
// This packages (createNotionUtils) could be migrated to a NPM packae later on.
const nu = createNotionUtils(notionClient);

// Utils
const getBlogPostDatabaseRecords = async () => nu.getDatabaseRecords(getDatabaseIdByName('blogpost'));
const getAllBlogPostPageId = async (): Promise<string[]> => {
  const records = await getBlogPostDatabaseRecords();
  return records.map(r => r.id);
};
const getBlogPostPageIdBySlug = async (slug: BlogPost['slug']): Promise<string | null> => {
  const records = await getBlogPostDatabaseRecords();
  const record = records.find(r => nu.getPageProperty(r, 'slug') === slug);
  if (!record) return null;
  return record.id;
};
const getBlogPostByPageId = async (pageId: string): Promise<BlogPost> => {
  const notionPage = await nu.getPageById(pageId);
  const markdowndBlocks = await n2m.pageToMarkdown(notionPage.id);
  const contentAsMarkdownString = n2m.toMarkdownString(markdowndBlocks);
  const contentAsHTMLString = compileMarkdownToHTMLString(contentAsMarkdownString);
  const blogPost: BlogPost = {
    // required fields
    slug: nu.getPageProperty(notionPage, 'slug'),
    title: nu.getPageProperty(notionPage, 'title'),
    contentAsHTMLString,
    // custom fields
    excerpt: nu.getPageProperty(notionPage, 'excerpt'),
    coverImage: null,
    date: nu.getPageProperty(notionPage, 'date'),
    author: {
      name: nu.getPageProperty(notionPage, 'author_name'),
      picture: null,
    },
  };
  validateBlogPostOrThrow(blogPost);
  return blogPost;
};

// Public API for this datasource
export const notionDB: BlogPostDatasource = {
  getAllBlogPost: async () => {
    // NOTE:
    // every "blog post" is a notion page, with an id defined by notion
    // every "blog post" page is a child of the database named "blogpost"
    const pageIds = await getAllBlogPostPageId();
    const blogPosts = await Promise.all(
      pageIds.map(pageId => getBlogPostByPageId(pageId))
    );
    return blogPosts;
  },
  getBlogPostBySlug: async (slug) => {
    const pageId = await getBlogPostPageIdBySlug(slug);
    if (!pageId) return null;
    return getBlogPostByPageId(pageId);
  }
};
