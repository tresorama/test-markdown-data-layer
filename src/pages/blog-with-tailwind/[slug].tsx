import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { BlogPost, getAllBlogPostSlugs, getBlogPostBySlug } from "@/utils/blog";
import { BlogPostView } from "@/views/blog/blog-post-view";

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

export type PageProps = {
  blogPost: BlogPost;
};

export const getStaticProps: GetStaticProps<PageProps, PathParams> = async ({ params }) => {
  const { slug } = params!;
  const blogPost = getBlogPostBySlug(slug);

  return {
    props: { blogPost }
  };
};


const Page: NextPage<PageProps> = ({ blogPost }) => (
  <>
    <Head>
      <title>{`${blogPost.title} - Blog`}</title>
    </Head>
    <BlogPostView blogPost={blogPost} />
  </>
);

export default Page;  