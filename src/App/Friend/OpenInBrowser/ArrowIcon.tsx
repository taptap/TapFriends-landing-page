import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={70}
      height={98}
      viewBox="0 0 70 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M63.84 14.035l-.525 6.311C60.367 55.881 36.277 86.128 2.304 96.953l-.953.303-.607-1.905.952-.304c33.202-10.579 56.745-40.139 59.626-74.866l.524-6.312-5.98-.496L64 0l5.819 14.53-5.98-.495z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgComponent;
