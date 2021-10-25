import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import ArrowIcon from './ArrowIcon';

export function OpenInBrowser() {
  const { t } = useTranslation();
  const $container = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    $container.current.addEventListener('touchstart', (e) => e.preventDefault());
  }, []);

  return (
    <div
      ref={$container}
      className="fixed inset-0 bg-[rgba(0,0,0,0.8)] pr-[env(safe-area-inset-right)]"
    >
      <div className="relative top-0 right-0">
        <div className="absolute top-[26px] right-[22px]">
          <ArrowIcon />
        </div>
        <div className="absolute top-[120px] right-[98px] text-sm text-white">
          {t('openInBrowser')}
        </div>
      </div>
    </div>
  );
}
