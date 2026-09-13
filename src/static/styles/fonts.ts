import { Outfit, Playfair_Display } from 'next/font/google';

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});
