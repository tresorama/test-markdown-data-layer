import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import { BlogPost, getAllBlogPosts } from "@/utils/blog";
import { BlogView } from "@/views/blog/blog-view";

export type PageProps = {
  blogPostsLinks: {
    title: BlogPost['title'],
    url: string,
  }[];
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const blogPosts = getAllBlogPosts();
  const blogPostsLinks: PageProps['blogPostsLinks'] = blogPosts.map(blogPost => ({
    title: blogPost.title,
    url: `/blog-with-tailwind/${blogPost.slug}`,
  }));

  return {
    props: { blogPostsLinks }
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