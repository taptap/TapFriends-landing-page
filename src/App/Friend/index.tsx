import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import gameIcon from 'assets/game_icon.png';
import { Button } from 'components/Button';
import { QRCode } from 'components/QRCode';
import styles from './index.module.css';
import BrowserHintIcon from './BrowserHintIcon';

function useIsInWechat() {
  const [flag, setFlag] = useState(false);
  useLayoutEffect(() => {
    setFlag(navigator.userAgent.toLowerCase().includes('micromessenger'));
  }, []);
  return flag;
}

function OpenInBrowserHint() {
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
          <BrowserHintIcon />
        </div>
        <div className="absolute top-[120px] right-[98px] text-sm text-white">请使用浏览器打开</div>
      </div>
    </div>
  );
}

export default function Friend() {
  const isInWechat = useIsInWechat();

  return (
    <div className="flex flex-col h-full mx-auto select-none lg:justify-center">
      <div
        className={`${styles.card} relative flex flex-grow flex-col bg-white rounded-2xl p-6 mx-4 mt-8 mb-10 sm:(w-[530px] mx-auto my-3) lg:w-[343px] max-h-[508px]`}
      >
        <div className="mt-6 sm:mt-0 text-center">
          <img className="inline-block pointer-events-none" src={gameIcon} width={80} height={80} />
          <h1 className="mt-2 font-bold">{import.meta.env.VITE_GAME_NAME}</h1>
          <p className="mt-1 text-xs text-[#888]">{import.meta.env.VITE_GAME_DESC}</p>
        </div>

        <div
          className={`${styles.pop} flex flex-grow relative mt-[30px] sm:mt-4 bg-[#FAFAFA] border border-[rgba(0,0,0,0.08)] rounded-xl`}
        >
          <div className="m-auto p-2 text-center">
            <div className="text-[#00B9C8]">”人来人往“</div>
            <div className="mt-1 text-xl font-bold">邀请你成为游戏好友</div>
          </div>
        </div>

        <Button className="mt-[34px] sm:mt-6">发送好友申请</Button>

        <div className="hidden lg:block absolute left-full bottom-0 transform translate-x-10 p-2 bg-white rounded">
          <QRCode src={import.meta.env.VITE_GAME_URL} size={100} />
        </div>

        {isInWechat && createPortal(<OpenInBrowserHint />, document.body)}
      </div>
    </div>
  );
}
