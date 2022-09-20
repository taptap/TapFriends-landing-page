import i18n from 'i18next';

import en_us from './locales/en-us.json';
import zh_cn from './locales/zh-cn.json';

i18n.init({
  resources: {
    'en-US': { translation: en_us },
    'zh-CN': { translation: zh_cn },
  },
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});
