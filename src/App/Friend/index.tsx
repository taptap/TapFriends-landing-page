import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import config from '@/config';
import { usePlatform } from 'utils/usePlatform';
import { Button } from 'components/Button';
import { QRCode } from 'components/QRCode';
import styles from './index.module.css';
import { OpenInBrowser } from './OpenInBrowser';

function useP() {
  const [roleName, setRoleName] = useState<string>();
  const [ext, setExt] = useState<string>();

  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search);
    const p = params.get('p');
    if (p) {
      try {
        const { role_name, ext, lang } = JSON.parse(decodeURIComponent(escape(atob(p))));
        if (typeof role_name === 'string') {
          setRoleName(role_name);
        }
        if (typeof ext === 'string') {
          setExt(ext);
        }
        if (typeof lang === 'string' && !config.language) {
          // zh_CH -> zh-CN
          i18n.changeLanguage(lang.replace(/_/g, '-'));
        }
      } catch {}
    }
  }, []);

  return { roleName, ext };
}

function appendSearchParams(url: string, params: Record<string, string>): string {
  const [base, search] = url.split('?');
  const sp = new URLSearchParams(search);
  Object.entries(params).forEach(([key, value]) => sp.set(key, value));
  const newSearch = sp.toString();
  if (newSearch) {
    return base + '?' + newSearch;
  }
  return base;
}

export default function Friend() {
  const { t } = useTranslation();
  const { isIOS, isAndroid, isWechat } = usePlatform();
  const { roleName, ext } = useP();

  const gameName = useMemo(() => t('game.name') || config.game.name, [t]);
  const gameDesc = useMemo(() => t('game.description') || config.game.description, [t]);

  const displayRoleName = useMemo(() => {
    if (roleName) {
      return `“${roleName}”`;
    }
    if (gameName) {
      return `${gameName} ${t('friend.anonymousRoleName')}`;
    }
    return t('friend.anonymousRoleName');
  }, [roleName, gameName, t]);

  const [link, store] = useMemo(() => {
    if (isIOS) {
      return [
        ext ? appendSearchParams(config.game.iosLink, { ext }) : config.game.iosLink,
        config.game.iosStore,
      ];
    }
    if (isAndroid) {
      return [
        ext ? appendSearchParams(config.game.androidLink, { ext }) : config.game.androidLink,
        config.game.androidStore,
      ];
    }
    return [config.game.url, ''];
  }, [isIOS, isAndroid, ext]);

  const handleClick = useCallback(() => {
    location.href = link;
    if (store) {
      setTimeout(() => {
        location.href = store;
      }, 500);
    }
  }, [link, store]);

  return (
    <div className="flex flex-col h-full mx-auto select-none lg:justify-center">
      <div
        className={`${styles.card} relative flex flex-grow flex-col bg-white rounded-2xl p-6 mx-4 mt-8 mb-10 sm:(w-[530px] mx-auto my-3) lg:w-[343px] max-h-[508px]`}
      >
        <div className="mt-6 sm:mt-0 text-center">
          <img
            className="inline-block pointer-events-none"
            src={config.game.icon}
            width={80}
            height={80}
          />
          <h1 className="mt-2 font-bold">{gameName}</h1>
          <p className="mt-1 text-xs text-[#888]">{gameDesc}</p>
        </div>

        <div
          className={`${styles.pop} flex flex-grow relative mt-[30px] sm:mt-4 bg-[#FAFAFA] border border-[rgba(0,0,0,0.08)] rounded-xl`}
        >
          <div className="m-auto p-2 text-center">
            <div className="text-[#00B9C8]">{displayRoleName}</div>
            <div className="mt-1 text-xl font-bold">
              {config.inviteType === 'follow'
                ? t('friend.invitToFollow')
                : t('friend.invitToBeFriend')}
            </div>
          </div>
        </div>

        <Button className="mt-[34px] sm:mt-6" onClick={handleClick}>
          {config.inviteType === 'follow' ? t('friend.follow') : t('friend.sendFriendInvitation')}
        </Button>

        {config.game.url && (
          <div className="hidden lg:block absolute left-full bottom-0 transform translate-x-10 p-2 bg-white rounded">
            <QRCode src={config.game.url} size={100} />
          </div>
        )}

        {isWechat && createPortal(<OpenInBrowser />, document.body)}
      </div>
    </div>
  );
}
