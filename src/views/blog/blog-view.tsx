import { PageProps } from "@/pages/blog-with-tailwind/index";
import { AppShell } from "@/views/shared/components/app-shell";
import { BackButtonBar } from "@/views/shared/components/back-button-bar";
import { BgGradientBase } from "@/views/shared/components/bg-gradient-base";
import { Footer } from "@/views/shared/components/footer";
import Link from "next/link";

export const BlogView = ({ blogPostsLinks }: PageProps) => (
  <BgGradientBase>
    <AppShell
      topBar={<BackButtonBar className="absolute" />}
      content={(
        <div className='w-full min-h-full grid grid-rows-[minmax(0,1fr)_auto]'>
          <main className="py-12 px-8">
            <h1 className="pt-6 pb-14 text-4xl font-extralight text-gray-700">Blog with Tailwind</h1>
            <ul className='space-y-6'>
              {blogPostsLinks.map(({ url, title }) => (
                <li key={url} className='text-4xl font-normal underline'>
                  <Link href={url}>{title}</Link>
                </li>
              ))}
            </ul>
          </main>
          <Footer />
        </div>
      )}
    />
  </BgGradientBase>
);