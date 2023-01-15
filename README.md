
![Preview](/README.repo-preview.png)

## Demo

[View Demo](https://test-next-blog-flat-file.vercel.app/)

## Overview

When you are initializing the project you:
- Decide "BlogPost" custom fields schema for your and configure it.
- Decide which datasource you want to use , and from which fetch blogposts, between
  - Flat File on Disk (.md)
  - Notion
- Code in React to customize appearance.

When you have a new blogpost to add:
- Create a new blog post based on datasource
  - FlatFile: Create a new `.md` file inside a specific folder.
  - Notion: Create a new Notion record/page in your Database
- Re-Deploy

## Stack

- Next.js
- Tailwind CSS
- DB (one of these)
  - Flat File on Disk (.md)
  - Notion

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

## Bootstrap the project

When you are initializing the project you:
1. Decide "BlogPost" custom fields schema for your and configure it.
2. Decide which datasource you want to use , and from which fetch blogposts, between
  - Flat File on Disk (.md)
  - Notion
3. Code in React to customize appearance.

### 1. Decide "BlogPost" custom fields schema

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

### 2. Decide which datasource you want to use

#### 2.1 Overview

Every datasource is a subdirectory of `src/utils/blog/db` with an `index.ts`.  
In `src/utils/blog/blog.datasource` you must export the desired datasource that will be imported in `src/utils/blog/index`.  

#### 2.3 Setup

Uncomment your desired line.  
The file must have only one `db` export.  

```ts
// src/utils/blog/blog.datasource

// When using Flat File
export { flatFileDB as db } from "./db/flat-file";

// When using Notion
export { notionDB as db } from "./db/notion";

```

Follow additional configuration based on datasource

[with FlatFile](/src/utils/blog/db//falt-file/README.md)  
[with Notion](/src/utils/blog/db//notion/README.md)  

### 3.Code in React to customize appearance

You know how to do it 😜.  
Pages are in `src/pages` and components used in pages are in `src/views`.

## Resources
[Next.js](https://nextjs.org/)