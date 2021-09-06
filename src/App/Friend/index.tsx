import styles from './index.module.css';

import gameIcon from 'assets/game_icon.png';
import { Button } from 'components/Button';
import { QRCode } from 'components/QRCode';

export default function Friend() {
  return (
    <div className="flex flex-col h-full mx-auto select-none lg:justify-center">
      <div
        className={`${styles.card} relative flex flex-grow flex-col bg-white rounded-2xl p-6 mx-4 mt-8 mb-10 sm:(w-[530px] mx-auto my-3) lg:w-[343px] max-h-[508px]`}
      >
        <div className="mt-6 sm:mt-0 text-center">
          <img className="inline-block pointer-events-none" src={gameIcon} width={80} height={80} />
          <h1 className="mt-2 font-bold">人类：跌落梦境</h1>
          <p className="mt-1 text-xs text-[#888]">人类一败涂地独家船新版本</p>
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

        <div className="hidden lg:block absolute left-full bottom-0 transform translate-x-10 w-[116px] h-[116px] p-2 bg-white rounded">
          <QRCode src="https://taptap.com" />
        </div>
      </div>
    </div>
  );
}
