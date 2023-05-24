# Datasource - Notion

## Configuration

You should have completed the "datasource agnostic" initial setup and be redirected here to perform additional configiration.  
In case you did't , [start here](../../../../../README.md).

## Additional Configration

### Overview

1. Install needed packages
2. Creata a Notion database
3. Create a Notion Integration for this app
4. Add env vars

### 1. Install needed Packages

```bash
yarn add @notionhq/client notion-to-md
```

These are versions used when creating this project

```json
"@notionhq/client": "^2.2.3",
"notion-to-md": "^2.5.5",
```

### 2. Creata a Notion database

Duplicate this [Notion page](https://elastic-cymbal-9af.notion.site/starter-next-blog-DEMO-NOTION-DATABASE-e70f32d503614367a9f714854dc898aa) that contains a stater blogpost database.  
It includes also information of how to get extra necessary data from Notion-side.

### 3. Add env vars

Copy `src/data/blog/db/notion/.env.notion.example` file in the root of the project and rename it as `.env.local`.  
Fill the missing env following the instruction that you can find inside the template duplicated at the previous step.

> NOTE: 
> In local development `.env.local` is used as source, but in producction you must define these vars in your Deploy Service (Netlify/Vercel) as Environment Variables.
