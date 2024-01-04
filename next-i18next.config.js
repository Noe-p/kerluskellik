/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next-i18next').UserConfig} */

module.exports = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
  },
  reloadOnPrerender: true,
  localePath: require('path').resolve('./src/i18n'),
};
