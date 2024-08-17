import Link from "next/link";
import { PageProps } from "@/pages/blog/[slug]";
import { AppShell } from "@/views/shared/components/app-shell";
import { BackButtonBar } from "@/views/shared/components/back-button-bar";
import { Footer } from "@/views/shared/components/footer";
import 'highlight.js/styles/github-dark-dimmed.css'; //This is the theme your code is going to be displayed with.

const formatDate = (date: Date | string) => new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: '2-digit' });

export const BlogPostView = ({ blogPost, prevBlogPostWithLink, nextBlogPostWithLink }: PageProps) => (
  <AppShell
    topBar={<BackButtonBar className="absolute" />}
    content={(
      <div className='min-h-full grid grid-cols-1 grid-rows-[minmax(0,1fr)_auto_auto]'>
        <main className="py-10 px-8 w-full max-w-3xl mx-auto">
          <section className="py-20 text-left">
            <div className="mb-3">
              <p className="font-light">{blogPost.author.name}</p>
              <p className="font-light">{formatDate(blogPost.date)}</p>
            </div>
            <h1 className="blogpost-title">{blogPost.title}</h1>
          </section>
          <div
            className="blogpost-prose"
            dangerouslySetInnerHTML={{ __html: blogPost.contentAsHTMLString }}
          />
        </main>
        <nav className="pt-48 pb-20 px-8 w-full max-w-3xl mx-auto flex flex-wrap gap-12">
          {nextBlogPostWithLink && (
            <div className="max-w-[18ch] text-3xl text-left">
              <span className="block text-sm font-light">Older Post</span>
              <Link href={nextBlogPostWithLink.url}>{nextBlogPostWithLink.title}</Link>
            </div>
          )}
          {prevBlogPostWithLink && (
            <div className="ml-auto max-w-[18ch] text-3xl text-right">
              <span className="block text-sm font-light">Newer Post</span>
              <Link href={prevBlogPostWithLink.url}>{prevBlogPostWithLink.title}</Link>
            </div>
          )}
        </nav>
        <Footer className="mx-auto max-w-lg" />
      </div>
    )}
  />
);