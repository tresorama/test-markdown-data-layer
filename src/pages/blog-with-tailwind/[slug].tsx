import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { BlogPost, getAllBlogPostSlugs, getBlogPostBySlug } from "@/utils/blog";
import { BlogPostView } from "@/views/blog/blog-post-view";

type PathParams = {
  slug: BlogPost['slug'];
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const slugs = await getAllBlogPostSlugs();
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
  const blogPost = await getBlogPostBySlug(slug);
  if (!blogPost) return { notFound: true };

  return {
    props: { blogPost }
  };
};


const Page: NextPage<PageProps> = (pageProps) => (
  <>
    <Head>
      <title>{`${pageProps.blogPost.title} - Blog`}</title>
    </Head>
    <BlogPostView {...pageProps} />
  </>
);

export default Page;  