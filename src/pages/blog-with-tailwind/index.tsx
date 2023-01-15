import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import { BlogPost, getAllBlogPosts } from "@/utils/blog";
import { BlogView } from "@/views/blog/blog-view";

type BlogPostWithLink = BlogPost & { url: string; };
export type PageProps = {
  blogPostsWithLink: BlogPostWithLink[];
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const blogPosts = await getAllBlogPosts();
  const blogPostsWithLink: BlogPostWithLink[] = blogPosts.map(blogPost => ({
    ...blogPost,
    url: `/blog-with-tailwind/${blogPost.slug}`,
  }));

  return {
    props: { blogPostsWithLink }
  };
};


const Page: NextPage<PageProps> = (pageProps) => (
  <>
    <Head>
      <title>Blog</title>
    </Head>
    <BlogView {...pageProps} />
  </>
);


export default Page;  