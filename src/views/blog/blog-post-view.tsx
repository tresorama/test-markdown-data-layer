import { PageProps } from "@/pages/blog-with-tailwind/[slug]";
import { AppShell } from "@/views/shared/components/app-shell";
import { BackButtonBar } from "@/views/shared/components/back-button-bar";
import { Footer } from "@/views/shared/components/footer";

const formatDate = (date: Date | string) => new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: '2-digit' });

export const BlogPostView = ({ blogPost }: PageProps) => (
  <AppShell
    topBar={<BackButtonBar className="absolute" />}
    content={(
      <div className='min-h-full grid grid-rows-[minmax(0,1fr)_auto]'>
        <main className="py-10 pb-40 px-8">
          <section className="py-20 mx-auto max-w-3xl text-left">
            <div className="mb-3">
              <p className="font-light">{blogPost.author.name}</p>
              <p className="font-light">{formatDate(blogPost.date)}</p>
            </div>
            <h1 className="blogpost-title">{blogPost.title}</h1>
          </section>
          <div
            className="blogpost-prose max-w-3xl mx-auto "
            dangerouslySetInnerHTML={{ __html: blogPost.contentAsHTMLString }}
          />
        </main>
        <Footer className="mx-auto max-w-lg" />
      </div>
    )}
  />
);