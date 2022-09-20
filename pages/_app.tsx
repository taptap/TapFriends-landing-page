import type { AppProps } from 'next/app';
import 'i18n';
import 'styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
