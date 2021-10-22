import { useRef } from 'react';

export function usePlatform() {
  const $platform = useRef({
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
    isAndroid: /Android/i.test(navigator.userAgent),
    isWechat: /micromessenger/i.test(navigator.userAgent),
  });

  return $platform.current;
}
