import Head from 'next/head';
import Link from 'next/link';
// import { Inter } from '@next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>test next blog flat file</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className='min-h-screen py-12 px-8'
        style={{
          "backgroundImage": "radial-gradient(circle at -100% 51%, hsl(67, 100%, 50%) 51%, hsl(302, 100%, 50%) 100%),\n  radial-gradient(circle at -100% 51%, hsl(67, 100%, 50%) 79%, hsl(302, 100%, 50%) 100%)",
          "backgroundSize": "81% 20%,\n  68% 20%",
          "backgroundPosition": "99% 100%,\n  99% 75%",
          "backgroundRepeat": "no-repeat,\n  no-repeat"
        }}>
        <ul className='space-y-6'>
          {[
            ['/blog-with-tailwind', "Blog with Tailwind"],
            // ['/blog-with-chakra', "Blog with Chakra"],
          ].map(([url, label]) => (
            <li key={url} className='text-5xl font-semibold underline'>
              <Link href={url}>{label}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
