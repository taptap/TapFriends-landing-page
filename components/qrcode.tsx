import rqcode from 'qrcode';
import { useEffect, useRef } from 'react';

export interface QRCodeProps {
  src: string;
  size?: number;
}

export function QRCode({ src, size }: QRCodeProps) {
  const $canvas = useRef<HTMLCanvasElement>(null!);
  useEffect(() => {
    rqcode.toCanvas($canvas.current, src, {
      margin: 0,
      color: {
        dark: '#15C5CE',
      },
      width: size,
    });
  }, [src]);

  return <canvas ref={$canvas} />;
}
