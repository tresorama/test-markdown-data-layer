import * as Notion from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { notionConfig } from './notion.config';

// Notion SDK Client
export const notionClient = new Notion.Client({ auth: notionConfig.internalIntegrationToken });

// Notion To Markdown Client
export const n2m = new NotionToMarkdown({ notionClient });

