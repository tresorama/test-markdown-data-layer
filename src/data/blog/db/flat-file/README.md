# Datasource - Flat File in Disk

## Configuration

You should have completed the "datasource agnostic" initial setup and be redirected here to perform additional configiration.  
In case you did't , [start here](../../../../../README.md).

### Additional Configration

#### Overview

1. Install needed packages
2. Create a blogpost folder

#### 1. Install needed Packages

```bash
yarn add gray-matter
```

These are versions used when creating this project

```json
"gray-matter": "^4.0.3",
```

#### 2. Create a blogpost folder

Move `src/data/blog/db/flat-file/example/blog-contents` directory to `src`.  
At the end you will have `src/blog-contents`.  
Inside that folder you have some example of blog post to start with.  
> IMPORTANT: Do not move or rename `src/blog-contents` directory or the fetching code will not be able to read your blogposts.

### 3. Add env vars

Copy `src/data/blog/db/flat-file/.env.flat-file.example` file in the root of the project and rename it as `.env.local`.  
Fill the missing env following the instruction that you can find inside the template duplicated at the previous step.

> NOTE: 
> In local development `.env.local` is used as source, but in producction you must define these vars in your Deploy Service (Netlify/Vercel) as Environment Variables.
