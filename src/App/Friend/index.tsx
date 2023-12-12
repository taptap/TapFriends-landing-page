import { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { decode as decodeBase64 } from 'js-base64';

import config from '@/config';
import { usePlatform } from 'utils/usePlatform';
import { Button } from 'components/Button';
import { QRCode } from 'components/QRCode';
import styles from './index.module.css';
import { OpenInBrowser } from './OpenInBrowser';

function parseSearchParamP(value: string) {
  const p: {
    role_name?: string;
    ext?: string;
    lang?: string;
  } = {};

  try {
    const { role_name, ext, lang } = JSON.parse(decodeBase64(value));
    if (typeof role_name === 'string') {
      p.role_name = role_name;
    }
    if (typeof ext === 'string') {
      p.ext = ext;
    }
    if (typeof lang === 'string') {
      // zh_CN -> zh-CN
      p.lang = lang.replace(/_/g, '-');
    }
  } catch {} // ignore

  return p;
}

function generateFriendLink(baseUrl: string, searchParams: URLSearchParams, ext?: string) {
  const url = new URL(baseUrl);
  let pIsSetted = false;
  searchParams.forEach((value, key) => {
    if (key === 'p') {
      if (!pIsSetted && ext !== undefined) {
        url.searchParams.append('ext', ext);
        pIsSetted = true;
      }
    } else {
      url.searchParams.append(key, value);
    }
  });
  return url.href;
}

export default function Friend() {
  const { t } = useTranslation();
  const { isIOS, isAndroid, isWechat } = usePlatform();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [roleName, ext] = useMemo(() => {
    const p = searchParams.get('p');
    if (p) {
      const { role_name, ext, lang } = parseSearchParamP(p);
      if (lang && !config.language) {
        i18n.changeLanguage(lang);
      }
      return [role_name, ext];
    }
    return [undefined, undefined];
  }, [searchParams]);

  const { gameName, gameDesc } = useMemo(
    () => ({
      gameName: t('game.name') || config.game.name,
      gameDesc: t('game.description') || config.game.description,
    }),
    [t]
  );

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
      return [generateFriendLink(config.game.iosLink, searchParams, ext), config.game.iosStore];
    }
    if (isAndroid) {
      return [
        generateFriendLink(config.game.androidLink, searchParams, ext),
        config.game.androidStore,
      ];
    }
    return [config.game.url, ''];
  }, [isIOS, isAndroid, ext, searchParams]);

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
            <div className="text-tapBlue font-bold">{displayRoleName}</div>
            <div className="mt-1 text-xl font-bold">
              {config.inviteType === 'follow'
                ? t('friend.inviteToFollow')
                : t('friend.inviteToBeFriend')}
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
