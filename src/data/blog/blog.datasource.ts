import { type BlogPostDatasource } from "./blog.datasource.types";

// The datasource will be resolved dynamically at runtime,
// Baesd on the DATASOURCE env var defined in current env.
// We export a function the return a Promise of the BlogPostDatasource
export let getDB: () => Promise<BlogPostDatasource>;

if (process.env.DATASOURCE === 'FLATFILEMD') {
  getDB = () => import('./db/flat-file').then(resp => resp.flatFileDB);
}
else if (process.env.DATASOURCE === 'NOTION') {
  getDB = () => import('./db/notion').then(resp => resp.notionDB);
}
else {
  throw new Error(`Missing or unrecognized DATASOURCE env var.`);
}