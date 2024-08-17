import { type CollectionDB } from "../../create-collection";
import { compileMarkdownToHTMLString } from "../../utils.markdown";
import { type createNotionClient } from "./create-notion-client";
import { type NotionUtils } from "./notion-utils";

type ExtraFields = { [key: string]: any; };
export const createDb_Notion = ({
  notionClient,
  databaseId,
  dataExtractor,
}: {
  /** Init this client using `import { createNotionClient } from "markdown-data-layer/create-db/notion` */
  notionClient: ReturnType<typeof createNotionClient>;
  /** Notion database "id" where items must be read from.  
   * Search in Notion docs, they explain how to get the id.  
   * Short version:
   * - Notion > Open Database in Full Page > get from url
  */
  databaseId: string;
  /** Fucntion that extract data from Notion Page. It must return an object.  
   * @example
   * (notionPage,nu) => {
   *   return {
   *     publish_date: nu.getPageProperty(notionPage, 'pub_date'),
   *     author: nu.getPageProperty(notionPage, 'author'),
   *   }
   * }
   */
  dataExtractor: (
    notionPage: Awaited<ReturnType<NotionUtils['getPageById']>>,
    nu: NotionUtils
  ) => ExtraFields,
}) => {

  const { n2m, nu } = notionClient;

  // Utils for working with notion

  const getAllItemNotionPageIds = async (): Promise<string[]> => {
    const records = await nu.getDatabaseRecords(databaseId);
    return records.map(r => r.id);
  };

  // private api
  const convertFileToItem = async (notionPageId: string) => {
    const notionPage = await nu.getPageById(notionPageId);
    try {
      // @ts-expect-error
      console.log("notionPage", notionPage.properties.title.rich_text[0].plain_text);
    } catch (error) { }
    const markdowndBlocks = await n2m.pageToMarkdown(notionPageId);
    const contentAsMarkdownString = n2m.toMarkdownString(markdowndBlocks);
    const contentAsHTMLString = await compileMarkdownToHTMLString(contentAsMarkdownString);

    const item = {
      // required fields
      slug: nu.getPageProperty(notionPage, 'slug') as string,
      title: nu.getPageProperty(notionPage, 'title') as string,
      contentAsHTMLString,
      // custom fields
      ...(dataExtractor(notionPage, nu)),
    };
    return item;
  };

  type Item = Awaited<ReturnType<typeof convertFileToItem>>;


  // public api

  const notionDb: CollectionDB = {
    getAll: async () => {
      // NOTE:
      // every "blog post" is a notion page, with an id defined by notion
      // every "blog post" page is a child of the database named "blogpost"
      const pageIds = await getAllItemNotionPageIds();
      const items: Item[] = await Promise.all(
        pageIds.map(pageId => convertFileToItem(pageId))
      );
      return items;
    },
    getOneBySlug: async (slug) => {
      const items = await notionDb.getAll();
      const item = items.find(i => i.slug === slug);
      if (!item) return null;
      return item;
    }
  };

  return notionDb;
};