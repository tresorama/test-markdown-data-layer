import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { BlogPost, getAllBlogPostSlugs, getBlogPostBySlug } from "@/utils/blog";

type PathParams = {
  slug: BlogPost['slug'];
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const slugs = getAllBlogPostSlugs();
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  };
};

type PageProps = {
  blogPost: BlogPost;
};

export const getStaticProps: GetStaticProps<PageProps, PathParams> = async ({ params }) => {
  const { slug } = params!;
  const blogPost = getBlogPostBySlug(slug);

  return {
    props: { blogPost }
  };
};


const Page: NextPage<PageProps> = ({ blogPost }) => {
  return (
    <main className='min-h-screen py-10 px-8'>
      <h1 className="py-20 font-medium text-7xl text-center text-gray-700">{blogPost.title}</h1>
      <div className="max-w-lg mx-auto">
        <div
          className="prose prose-sm"
          dangerouslySetInnerHTML={{ __html: blogPost.content.markdownAsHTMLString }}
        />
      </div>
    </main>
  );
};

export default Page;  