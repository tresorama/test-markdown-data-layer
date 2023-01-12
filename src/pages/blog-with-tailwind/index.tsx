import { BlogPost, getAllBlogPosts } from "@/utils/blog";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

type PageProps = {
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


const Page: NextPage<PageProps> = ({ blogPostsLinks }) => {
  return (
    <main
      className='min-h-screen py-12 px-8'
      style={{
        "backgroundImage": "radial-gradient(circle at -100% 51%, hsl(67, 100%, 50%) 51%, hsl(302, 100%, 50%) 100%),\n  radial-gradient(circle at -100% 51%, hsl(67, 100%, 50%) 79%, hsl(302, 100%, 50%) 100%)",
        "backgroundSize": "81% 20%,\n  68% 20%",
        "backgroundPosition": "99% 100%,\n  99% 75%",
        "backgroundRepeat": "no-repeat,\n  no-repeat"
      }}>
      <h1 className="pt-6 pb-14 font-thin text-4xl text-gray-700">Blog with Tailwind</h1>
      <ul className='space-y-6'>
        {blogPostsLinks.map(({ url, title }) => (
          <li key={url} className='text-4xl font-medium underline'>
            <Link href={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Page;  