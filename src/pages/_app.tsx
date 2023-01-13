import '../styles/globals.css';
import 'highlight.js/styles/github-dark-dimmed.css'; //This is the theme your code is going to be displayed with.
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
