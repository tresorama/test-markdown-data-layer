import { Client as NotionClient, isFullPage } from '@notionhq/client';
import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

//
// Generic Utils for getting data from notion
//
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



export class Logger {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
  buildMessage(status: 'error' | 'info', ...args: unknown[]) {
    return `
============ ${this.key} - ${status} - START ===========
${args.map(item => "\n" + item + "\n").join('')}
============ BlogPost Not Valid - END ===========
    `.trimEnd();
  }
  log(...args: unknown[]) {
    const message = this.buildMessage('info', ...args);
    console.log(message);
    return message;
  }
  error(...args: unknown[]) {
    const message = this.buildMessage('error', ...args);
    console.error(message);
    return message;
  }
  errorAndThrow(...args: unknown[]) {
    const message = this.error(...args);
    throw new Error(message);
  }
}