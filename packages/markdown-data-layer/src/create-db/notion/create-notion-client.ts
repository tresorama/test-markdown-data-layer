import * as Notion from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { createNotionUtils } from './notion-utils';

export const createNotionClient = (notionClientProps: {
  /** This is what Notion calls an "internal integration token" */
  auth: string;
}) => {

  // Notion SDK Client
  const notionClient = new Notion.Client({ auth: notionClientProps.auth });

  // Notion To Markdown Client
  const n2m = new NotionToMarkdown({ notionClient });

  // This packages (createNotionUtils) could be migrated to a NPM packae later on.
  const nu = createNotionUtils(notionClient);

  return {
    notionClient,
    n2m,
    nu,
  };

};