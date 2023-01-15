import { Logger } from "../../utils/utils.logger";

export const notionConfig = {
  internalIntegrationToken: process.env.NOTION_INTERNAL_INTEGRATION_TOKEN!,
  databaseIds: {
    blogpost: process.env.NOTION_DATABASE_ID_BLOGPOST!,
  }
};
export type DatabaseName = keyof typeof notionConfig.databaseIds;

export const getDatabaseIdByName = (databaseName: DatabaseName) => {
  const databaseId = notionConfig.databaseIds[databaseName];
  if (!databaseId) {
    const errorMessage = new Logger('getDatabaseRecord').error(`Database with name "${databaseName}" is not allowed`);
    throw new Error(errorMessage);
  }
  return databaseId;
};
