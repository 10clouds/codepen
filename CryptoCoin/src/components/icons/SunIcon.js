import React from 'react';

const Icon = props => (
  <svg width={24} height={24} viewBox="0 0 32 32" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <circle cx={15.86} cy={15.86} r={7.73} />
      <path d="M15.86 26.65v3.57m0-28.72v3.58M5.08 15.86H1.5m28.72 0h-3.57M8.24 23.49l-2.53 2.53M26.02 5.71l-2.53 2.53m-15.25 0L5.71 5.71m20.31 20.31l-2.53-2.53" />
    </g>
  </svg>
);

export default Icon;
