import { type Client as NotionClient, isFullPage } from '@notionhq/client';
import type { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Logger } from '@/data/blog/utils/utils.logger';


/**
 * A wrapped for the `NotionClient` (of `@notionhq/client`) that simplify fetching data from Notion.  
 * It includes a set of utils function that will interact with notion
 * because notion api is no so well to read.
 * *This packages (createNotionUtils) could be migrated to a NPM packae later on.*
 * 
 * Usage:
 * ```ts
 * import * as Notion from '@notionhq/client';
 * import { createNotionUtils } from '...path/to/here';
 * 
 * const notionClient = new Notion.Client({ 
 *   auth: process.env.NOTION_INTERNAL_INTEGRATION_TOKEN 
 * });
 * 
 * const nu = createNotionUtils(notionClient);
 * nu.getDatabaseRecords(...);
 * nu.getPageById(...);
 * ```
 * @param notion NotionClient - A notion client from `@notionhq/client` package, already authorized.
 */
export const createNotionUtils = (notion: NotionClient) => {

  const getDatabaseRecords = async (database_id: string) => {
    const database = await notion.databases.query({ database_id });
    return database.results;
  };
  const getDatabaseSchema = async (database_id: string) => {
    const database = await notion.databases.retrieve({ database_id });
    return database.properties;
  };
  const getPageById = async (pageId: string) => {
    return notion.pages.retrieve({ page_id: pageId });
  };
  const getPageProperty = (notionPage: PartialPageObjectResponse | PageObjectResponse, propertyName: string) => {
    if (!isFullPage(notionPage)) {
      const logger = new Logger('notionDB - getProperty');
      const message = logger.error(`This page has no "properties" object`);
      throw new Error(message);
    }
    const property = notionPage.properties[propertyName];
    switch (property.type) {
      case "title":
        return property.title[0].plain_text;
      case "rich_text":
        return property.rich_text[0].plain_text;
      case "created_time":
        return property.created_time;
      default:
        const logger = new Logger('notionDB - getProperty');
        const message = logger.error(`Unallowed property type, type "${property.type}"`);
        throw new Error(message);
    }
  };

  return {
    getDatabaseRecords,
    getDatabaseSchema,
    getPageById,
    getPageProperty,
  };

};