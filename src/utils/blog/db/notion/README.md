# Datasource - Flat File in Disk

## Overview

When you are initializing the project you:
- Define your blog post front-matter custom fields schema
- Code in React to customize appearance.

When you have a new blogpost to add:
- Create a new `.md` file inside a specific folder.
- Re-Deploy

## Configuration

You should have completed the "datasource agnostic" initial setup and be redirected here to perform additional configiration.  
In case you did't , [start here](../../../../../README.md).

### Additional Configration

#### Overview

1. Install needed packages
2. Creata a Notion database
3. Create a Notion Integration for this app
4. Add env vars

#### 1. Install needed Packages

```bash
yarn add @notionhq/client notion-to-md
```

These are versions used when creating this project

```json
"@notionhq/client": "^2.2.3",
"notion-to-md": "^2.5.5",
```

#### 2. Creata a Notion database

TODO

#### 3. Create a Notion Integration for this app

TODO

#### 4. Add env vars

Go in `src/utils/blog/db/notion/.env.notion.example`.  
Inside you find which env vars are needed and how to get them.
Add env vars to `.env.local` (in development) and in your Deploy Service (Netlify/Vercel) when in production.
