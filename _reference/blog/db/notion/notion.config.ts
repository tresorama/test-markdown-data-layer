import { Logger } from "@/data/blog/utils/utils.logger";

// Get config from environment
// 
// In order to use the Notion API
// and read frmom a Notion database you need to:
// - Create a new integration from the Notion Dashboard, 
//   that will generate a sort of API KEY.
//   It's called NOTION_INTERNAL_INTEGRATION_TOKEN,
//   and yu must get it from Notion Dashboard > Integrations
// - Get the database/page id of the Notion Page that has the data
export const notionConfig = {
  /** Notion Internal Integration Key 
   * (API KEY) used to interact to a Notion database. 
   * */
  internalIntegrationToken: process.env.NOTION_INTERNAL_INTEGRATION_TOKEN!,
  /**
   * Notion database/pages id where data lives
   */
  databaseIds: {
    blogpost: process.env.NOTION_DATABASE_ID_BLOGPOST!,
  }
};
type DatabaseName = keyof typeof notionConfig.databaseIds;


export const getDatabaseIdByName = (databaseName: DatabaseName) => {
  const databaseId = notionConfig.databaseIds[databaseName];
  if (!databaseId) {
    const errorMessage = new Logger('getDatabaseRecord').error(`Database with name "${databaseName}" is not allowed`);
    throw new Error(errorMessage);
  }
  return databaseId;
};
