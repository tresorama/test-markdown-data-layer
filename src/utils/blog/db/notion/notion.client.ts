import * as Notion from '@notionhq/client';
import { notionConfig } from '@/utils/blog/db/notion/notion.config';
import { NotionToMarkdown } from 'notion-to-md';

// Notion SDK Client
export const notion = new Notion.Client({ auth: notionConfig.internalIntegrationToken });

// Notion To Markdown Client
export const n2m = new NotionToMarkdown({ notionClient: notion });

