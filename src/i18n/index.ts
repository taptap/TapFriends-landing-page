import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import config from '@/config';
import en_us from './locales/en-us.json';
import zh_cn from './locales/zh-cn.json';

i18n.use(initReactI18next).init({
  resources: {
    'en-US': { translation: en_us },
    'zh-CN': { translation: zh_cn },
  },
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});

if (config.language) {
  i18n.changeLanguage(config.language);
}
