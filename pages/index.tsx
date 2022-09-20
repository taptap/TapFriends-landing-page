import { GetServerSideProps } from 'next';
import Head from 'next/head';
import i18next from 'i18next';
import { decode as decodeBase64 } from 'js-base64';
import _ from 'lodash';
import { Button } from 'components/button';
import { QRCode } from 'components/qrcode';
import { OpenInBrowser } from 'components/open-in-browser';
import { getPlatform, Platform } from 'utils/get-platform';

interface HomePageProps {
  documentTitle?: string;
  game: {
    icon?: string;
    name: string;
    description: string;
    url?: string;
    image?: string;
  };
  roleName: string;
  inviteText: string;
  action: {
    text: string;
    link: string | [string, string];
  };
  openInBrowser?: {
    text: string;
  };
}

export default function HomePage({
  documentTitle,
  game,
  roleName,
  inviteText,
  action,
  openInBrowser,
}: HomePageProps) {
  const handleClick = () => {
    if (typeof action.link === 'string') {
      location.href = action.link;
    } else {
      location.href = action.link[0];
      setTimeout(() => (location.href = action.link[1]), 500);
    }
  };

  return (
    <div className="flex flex-col h-full mx-auto select-none lg:justify-center">
      <Head>
        <meta property="og:title" content={game.name} />
        <meta property="og:description" content={game.description} />
        <meta property="og:image" content={game.image} />
        <title>{documentTitle}</title>
      </Head>
      <div className="relative flex flex-grow flex-col bg-white rounded-2xl p-6 mx-4 mt-8 mb-10 sm:w-[530px] sm:mx-auto sm:my-3 lg:w-[343px] max-h-[508px] shadow-[0_2px_5px_rgba(0,0,0,0.1),inset_0_-2px_0_#f2f2f2]">
        <div className="mt-6 sm:mt-0 text-center">
          <img
            className="inline-block pointer-events-none"
            src={game.icon}
            width={80}
            height={80}
          />
          <h1 className="mt-2 font-bold">{game.name}</h1>
          <p className="mt-1 text-xs text-[#888]">{game.description}</p>
        </div>

        <div className="flex grow relative mt-[30px] sm:mt-4 bg-[#FAFAFA] border border-[rgba(0,0,0,0.08)] rounded-xl after:absolute after:w-4 after:h-4 after:left-[calc(50%-8px)] after:bottom-[-9px] after:bg-[#FAFAFA] after:transform after:-rotate-45 after:border-l after:border-b after:rounded-bl">
          <div className="m-auto p-2 text-center">
            <div className="text-[#00B9C8]">{roleName}</div>
            <div className="mt-1 text-xl font-bold">{inviteText}</div>
          </div>
        </div>

        <Button className="mt-[34px] sm:mt-6" onClick={handleClick}>
          {action.text}
        </Button>

        {game.url && (
          <div className="hidden lg:block absolute left-full bottom-0 transform translate-x-10 p-2 bg-white rounded">
            <QRCode src={game.url} size={100} />
          </div>
        )}

        {openInBrowser && <OpenInBrowser text={openInBrowser.text} />}
      </div>
    </div>
  );
}

const env = { ...process.env };

const e = (key: string) => env[key] ?? key;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (ctx) => {
  const { roleName, lang, ext } = parseP(ctx.query.p);
  const lng = lang ?? getAcceptLanguage(ctx.req.headers['accept-language']);
  const { t } = i18next.cloneInstance({ lng });

  const ua = ctx.req.headers['user-agent'];
  const platform = getPlatform(Array.isArray(ua) ? ua[0] : ua);

  const gameName = t('game.name') || e('GAME_NAME');
  const gameUrl = e('GAME_URL');
  const follow = e('INVITE_TYPE') === 'follow';

  return {
    props: {
      documentTitle: e('DOCUMENT_TITLE'),
      game: {
        icon: e('GAME_ICON'),
        name: gameName,
        description: t('game.description') || e('GAME_DESC'),
        url: gameUrl,
        image: t('game.image') || e('GAME_IMAGE'),
      },
      roleName: roleName
        ? `“${roleName}”`
        : gameName
        ? `${gameName} ${t('friend.anonymousRoleName')}`
        : t('friend.anonymousRoleName'),
      inviteText: follow ? t('friend.inviteToFollow') : t('friend.inviteToBeFriend'),
      action: {
        text: follow ? t('friend.follow') : t('friend.sendFriendInvitation'),
        link:
          platform === Platform.Android
            ? [
                generateFriendLink(e('GAME_ANDROID_LINK'), ctx.resolvedUrl, ext),
                e('GAME_ANDROID_STORE'),
              ]
            : platform === Platform.IOS
            ? [generateFriendLink(e('GAME_IOS_LINK'), ctx.resolvedUrl, ext), e('GAME_IOS_STORE')]
            : gameUrl,
      },
    },
  };
};

function parseP(value?: string | string[]) {
  let roleName: string | undefined;
  let ext: string | undefined;
  let lang: string | undefined;

  if (Array.isArray(value)) {
    value = value[0];
  }

  if (value) {
    try {
      const p = JSON.parse(decodeBase64(value));
      if (typeof p.role_name === 'string') {
        roleName = p.role_name;
      }
      if (typeof p.ext === 'string') {
        ext = p.ext;
      }
      if (typeof p.lang === 'string') {
        // zh_CN -> zh-CN
        lang = p.lang.replaceAll('_', '-');
      }
    } catch {} // ignore
  }

  return { roleName, ext, lang };
}

function getAcceptLanguage(value?: string) {
  return value?.match(/(?:^|,\s*)([a-zA-Z\-]+)(?:;q=[0-9\.]+)?/)?.at(1);
}

function generateFriendLink(baseUrl: string, currentUrl: string, ext?: string) {
  const url = new URL(baseUrl);
  let pIsSetted = false;
  new URLSearchParams(_.trimStart(currentUrl, '/')).forEach((value, key) => {
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
