
![Preview](/README.repo-preview.png)

## Demo

[View Demo](https://test-next-blog-flat-file.vercel.app/)

## Overview

When you are initializing the project you:
- Define your blog post front-matter custom fields schema
- Code in React to customize appearance.

When you have a new blogpost to add:
- Create a new `.md` file inside a specific folder.
- Re-Deploy

## Stack

- Next.js
- Markdown in Git repo
- Tailwind CSS

## Usage - Dev

Install deps
```bash
yarn
# or
npm install
```

Start development server
```bash
yarn dev
# or
npm run dev
```

Open http://localhost:3000  

Code

## Usage - Deploy

Install deps.
```bash
yarn 
# or 
npm install
```

Compile the app.
```bash
yarn build 
# or 
npm run build
```

Run the app.
```bash
yarn start 
# or 
npm run start
```

## Customize

All your blogposts are flat files in `src/blog-contents`.
Front-matter is enabled and some custom fields are there as starting point, but you are free make your changes.

### Customize BlogPost fields

Edit the zod schema.
Some required fields cannot be deleted or edited, check comments.  
> NOTE: the zod schema is also used to validate every blogposts during build, to be sure you don't forget some fields when you are creating a new blog post.
```ts
// src/utils/blog/blog.schema.ts

const blogPostSchema = z.object({
  /** These fields are required! Don't edit unless you know what you are doing */
  slug: z.string(),
  title: z.string(),
  contentAsHTMLString: z.string(),
}).extend({
  /* Add here your front-matter markdown custom fields */
  excerpt: z.string(),
  coverImage: z.string(),
  date: z.string().datetime(),
  author: z.object({
    name: z.string(),
    picture: z.string(),
  }),
});

```

Now thanks to typescript, your React views receive blogposts that are typesafe.

## Resources

[Next.js](https://nextjs.org/)