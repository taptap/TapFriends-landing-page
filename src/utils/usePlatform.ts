import { useLayoutEffect, useState } from 'react';

export function usePlatform() {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isWechat, setIsWechat] = useState(false);

  useLayoutEffect(() => {
    setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
    setIsAndroid(/Android/i.test(navigator.userAgent));
    setIsWechat(/micromessenger/i.test(navigator.userAgent));
  }, []);

  return { isIOS, isAndroid, isWechat };
}
