## How to use

```ts

// in src/data/blog.ts

import { z } from "zod";
import { createCollection } from "@/lib/markdown-data-layer/create-collection";
import { createDb_Flatfile } from "@/lib/markdown-data-layer/create-db/flat-file";
import { sortByDateDescending } from "@/lib/markdown-data-layer/utils.sort";

const getFilePathFromRoot = (relativePath: string) => path.resolve(process.cwd(), relativePath);

// collection (who read the data from data source)

const collection = createCollection({
  slug: 'blog',
  db: createDb_Flatfile({
    dirPath: getFilePathFromRoot('./src/contents'),
  }),
  schema: {
    /* Add here your front-matter markdown custom fields */
    status: z.enum(["published", "draft"]),
    published_date: z.string().datetime(),
    author: z.string(),
    crossposted_url: z.string().optional(),
  },
});

type BlogPost_Raw = z.infer<typeof collection.fullSchema>;

// public api for app layer (that use collection under the hood)

export type BlogPost = Awaited<ReturnType<typeof collection.getOneBySlug>>;

export const getAllBlogPostSlugs = async (): Promise<BlogPost_Raw['slug'][]> => {
  const blogPosts = await collection.getAll();
  return blogPosts
    .sort((a, b) => sortByDateDescending(a.published_date, b.published_date))
    .map(b => b.slug);
};

export const getAllBlogPosts = async (): Promise<BlogPost_Raw[]> => {
  const blogPosts = await collection.getAll();
  return blogPosts.sort((a, b) => sortByDateDescending(a.published_date, b.published_date));
};

export const getBlogPostBySlug = async (slug: BlogPost_Raw['slug']) => {
  return collection.getOneBySlug(slug);
};

/** Return blogpost published immediatly before the blogpost with slug provided. Null if not found. */
export const getPrevBlogPostBySlug = async (slug: BlogPost_Raw['slug']) => {
  const slugs = await getAllBlogPostSlugs();
  const index = slugs.findIndex(s => s === slug);
  const isNotFound = index === -1;
  const isFirst = index === 0;
  if (isNotFound || isFirst) return null;
  const prevSlug = slugs[index - 1];
  return getBlogPostBySlug(prevSlug);
};

/** Return blogpost published immediatly after the blogpost with slug provided. Null if not found. */
export const getNextBlogPostBySlug = async (slug: BlogPost_Raw['slug']) => {
  const slugs = await getAllBlogPostSlugs();
  const index = slugs.findIndex(s => s === slug);
  const isNotFound = index === -1;
  const isLast = index === slugs.length - 1;
  if (isNotFound || isLast) return null;
  const nextSlug = slugs[index + 1];
  return getBlogPostBySlug(nextSlug);
};

```

```tsx
// src/pages/blog/index.tsx

import { getAllBlogPosts } from "@/data/blog";

export async function getStaticProps() {
  const blogPosts = await getAllBlogPosts();
  return { props: { blogPosts } };
}

export default function Blog({ blogPosts }) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {blogPosts.map(blogPost => (
          <li key={blogPost.slug}>
            <a href={blogPost.url}>{blogPost.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

```

```ts
// src/pages/blog/[slug].tsx

import { getAllBlogPosts } from "@/data/blog";

export async function getStaticPaths() {
  const blogPosts = await getAllBlogPosts();
  return {
    paths: blogPosts.map(blogPost => ({ params: { slug: blogPost.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blogPost = await getBlogPostBySlug(params.slug);
  return { props: { blogPost } };
}

```