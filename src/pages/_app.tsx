import { MotionConfig } from 'framer-motion';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import '../static/styles/app.css';
import { outfit, playfairDisplay } from '../static/styles/fonts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion='user'>
      <div className={`${outfit.variable} ${playfairDisplay.variable}`}>
        <Component {...pageProps} />
      </div>
    </MotionConfig>
  );
}
export default appWithTranslation(MyApp);
