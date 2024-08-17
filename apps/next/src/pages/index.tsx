import Head from 'next/head';
import { NextPage } from 'next';
import { HomeView } from '@/views/home/home-view';
// import { Inter } from '@next/font/google';

// const inter = Inter({ subsets: ['latin'] });

const Page: NextPage = () => (
  <>
    <Head>
      <title>test next blog flat file</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HomeView />
  </>
);

export default Page;
