import path from 'path';
import { z } from "zod";
import { createCollection } from "markdown-data-layer/src/create-collection";
import { createDb_Flatfile } from "markdown-data-layer/src/create-db/flat-file";
import { sortByDateDescending } from "markdown-data-layer/src/utils.sort";

const getFilePathFromRoot = (relativePath: string) => path.resolve(process.cwd(), relativePath);

// collections

const blogCollection = createCollection({
  slug: 'blog',
  db: createDb_Flatfile({
    dirPath: getFilePathFromRoot("./data/flatfile/blog"),
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


