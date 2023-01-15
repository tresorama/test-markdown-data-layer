import { PageProps } from "@/pages/blog/index";
import { AppShell } from "@/views/shared/components/app-shell";
import { BackButtonBar } from "@/views/shared/components/back-button-bar";
import { BgGradientBase } from "@/views/shared/components/bg-gradient-base";
import { Footer } from "@/views/shared/components/footer";
import Link from "next/link";

const formatDate = (date: Date | string) => new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: '2-digit' });
const formatExcerpt = (excerpt: string) => {
  const maxLength = 50;
  const isLonger = excerpt.length > maxLength;
  if (!isLonger) return excerpt;
  return excerpt.slice(0, maxLength) + '...';
};

export const BlogView = ({ blogPostsWithLink }: PageProps) => (
  <BgGradientBase>
    <AppShell
      topBar={<BackButtonBar className="absolute" />}
      content={(
        <div className='w-full min-h-full grid grid-rows-[minmax(0,1fr)_auto]'>
          <main className="py-12 px-8">
            <h1 className="pt-6 pb-14 text-4xl font-extralight text-gray-700">Blog with Tailwind</h1>
            <ul className='space-y-8'>
              {blogPostsWithLink.map(({ url, title, excerpt, date }) => (
                <li key={url}>
                  <Link href={url} className="flex flex-col">
                    <span className='text-sm font-normal text-gray-500'>{formatDate(date)}</span>
                    <span className='text-4xl font-normal underline'>{title}</span>
                    {/* <span className='mt-2 text-sm font-normal max-w-[50ch] text-gray-500'>{formatExcerpt(excerpt)}</span> */}
                  </Link>
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