import { AppShell } from "@/views/shared/components/app-shell";
import { BgGradientBase } from "@/views/shared/components/bg-gradient-base";
import { Footer } from "@/views/shared/components/footer";
import Link from "next/link";


export const HomeView = () => (
  <BgGradientBase>
    <AppShell
      content={(
        <div className='w-full min-h-full grid grid-rows-[minmax(0,1fr)_auto]'>
          <main className="py-20 px-8">
            <ul className='space-y-6'>
              {[
                ['/blog-with-tailwind', "Blog with Tailwind"],
                // ['/blog-with-chakra', "Blog with Chakra"],
              ].map(([url, label]) => (
                <li key={url} className='text-8xl lg:text-9xl font-normal underline'>
                  <Link href={url}>{label}</Link>
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