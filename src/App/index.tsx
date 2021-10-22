import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import config from '@/config';
import Friend from './Friend';

export default function App() {
  const { t } = useTranslation();
  const title = useMemo(() => t('document.title') || config.title, [t]);

  if (document.title !== title) {
    document.title = title;
  }

  return <Friend />;
}
