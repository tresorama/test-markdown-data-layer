import { PageProps } from "@/pages/blog-with-tailwind/[slug]";
import { AppShell } from "@/views/shared/components/app-shell";
import { BackButtonBar } from "@/views/shared/components/back-button-bar";
import { Footer } from "@/views/shared/components/footer";


export const BlogPostView = ({ blogPost }: PageProps) => (
  <AppShell
    topBar={<BackButtonBar className="absolute" />}
    content={(
      <div className='min-h-full grid grid-rows-[minmax(0,1fr)_auto]'>
        <main className="py-10 pb-40 px-8">
          <h1 className="py-20 max-w-3xl mx-auto blogpost-title text-left">{blogPost.title}</h1>
          <div
            className="blogpost-prose max-w-3xl mx-auto "
            dangerouslySetInnerHTML={{ __html: blogPost.content.markdownAsHTMLString }}
          />
        </main>
        <Footer className="mx-auto max-w-lg" />
      </div>
    )}
  />
);