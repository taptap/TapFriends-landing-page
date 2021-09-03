import rqcode from 'qrcode';
import { useEffect, useRef } from 'react';

export interface QRCodeProps {
  src: string;
}

export function QRCode({ src }: QRCodeProps) {
  const $canvas = useRef<HTMLCanvasElement>(null!);
  useEffect(() => {
    rqcode.toCanvas($canvas.current, src, {
      margin: 0,
      color: {
        dark: '#15C5CE',
      },
    });
  }, [src]);

  return <canvas ref={$canvas} />;
}
