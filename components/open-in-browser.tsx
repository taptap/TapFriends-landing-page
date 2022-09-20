import { useEffect, useRef } from 'react';

interface OpenInBrowserProps {
  text: string;
}

export function OpenInBrowser({ text }: OpenInBrowserProps) {
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
          <svg
            width={70}
            height={98}
            viewBox="0 0 70 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M63.84 14.035l-.525 6.311C60.367 55.881 36.277 86.128 2.304 96.953l-.953.303-.607-1.905.952-.304c33.202-10.579 56.745-40.139 59.626-74.866l.524-6.312-5.98-.496L64 0l5.819 14.53-5.98-.495z"
              fill="#fff"
            />
          </svg>
        </div>
        <div className="absolute top-[120px] right-[98px] text-sm text-white">{text}</div>
      </div>
    </div>
  );
}
