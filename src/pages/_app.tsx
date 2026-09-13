import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import '../static/styles/app.css';
import { outfit, playfairDisplay } from '../static/styles/fonts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${outfit.variable} ${playfairDisplay.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
export default appWithTranslation(MyApp);
