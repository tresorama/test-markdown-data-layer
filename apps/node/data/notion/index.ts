import { z } from "zod";
import { createCollection } from "markdown-data-layer/src/create-collection";
import { createDb_Notion, createNotionClient } from "markdown-data-layer/src/create-db/notion";
import { sortByDateDescending } from "markdown-data-layer/src/utils.sort";


// notion client

/** 
 * In order to use the Notion API and read from a Notion database you need to:
 * 1. Create a new integration from the Notion Dashboard, 
 *   that will generate a sort of API KEY, called NOTION_INTERNAL_INTEGRATION_TOKEN.
 *   Get it from Notion Dashboard > Integrations
 * 2. Get the database/page id of the Notion Page that has the data
 * */
export const notionConfig = {
  /** Notion Internal Integration Key (API KEY) used to interact to a Notion database. */
  internalIntegrationToken: process.env.NOTION_INTERNAL_INTEGRATION_TOKEN!,
  /** Notion database/pages id where data lives*/
  databaseIds: {
    blogpost: process.env.NOTION_DATABASE_ID_BLOGPOST!,
  }
};
const notionClient = createNotionClient({ auth: notionConfig.internalIntegrationToken });

// collections

const blogCollection = createCollection({
  slug: 'blog',
  db: createDb_Notion({
    notionClient,
    databaseId: notionConfig.databaseIds.blogpost,
    dataExtractor: (notionPage, nu) => ({
      excerpt: nu.getPageProperty(notionPage, 'excerpt'),
      coverImage: null,
      date: nu.getPageProperty(notionPage, 'date'),
      author: {
        name: nu.getPageProperty(notionPage, 'author_name'),
        picture: null,
      },
    }),
  }),
  schema: (baseSchema) => baseSchema.extend({
    /* Add here your front-matter markdown custom fields */
    excerpt: z.string(),
    coverImage: z.string().nullable(),
    date: z.string().datetime(),
    author: z.object({
      name: z.string(),
      picture: z.string().nullable(),
    }),
  }),
});

type BlogPost_Base = z.infer<typeof blogCollection.fullSchema>;


// =====================================================
// Public API
// Use this in Next.js Pages on Server Side
// =====================================================

export type BlogPost = Awaited<ReturnType<typeof getAllBlogPosts>>[number];

export const getAllBlogPostSlugs = async () => {
  const blogPosts = await blogCollection.getAll();
  return blogPosts
    .sort((a, b) => sortByDateDescending(a.date, b.date))
    .map(b => b.slug);
};

export const getAllBlogPosts = async () => {
  const blogPosts = await blogCollection.getAll();
  return blogPosts.sort((a, b) => sortByDateDescending(a.date, b.date));
};

export const getBlogPostBySlug = async (slug: BlogPost_Base['slug']) => {
  const blogPost = await blogCollection.getOneBySlug(slug);
  if (!blogPost) return null;
  return blogPost;
};

/** Return blogpost published immediatly before the blogpost with slug provided. Null if not found. */
export const getPrevBlogPostBySlug = async (slug: BlogPost_Base['slug']) => {
  const slugs = await getAllBlogPostSlugs();
  const index = slugs.findIndex(s => s === slug);
  const isNotFound = index === -1;
  const isFirst = index === 0;
  if (isNotFound || isFirst) return null;
  const prevSlug = slugs[index - 1];
  return getBlogPostBySlug(prevSlug);
};

/** Return blogpost published immediatly after the blogpost with slug provided. Null if not found. */
export const getNextBlogPostBySlug = async (slug: BlogPost_Base['slug']) => {
  const slugs = await getAllBlogPostSlugs();
  const index = slugs.findIndex(s => s === slug);
  const isNotFound = index === -1;
  const isLast = index === slugs.length - 1;
  if (isNotFound || isLast) return null;
  const nextSlug = slugs[index + 1];
  return getBlogPostBySlug(nextSlug);
};


