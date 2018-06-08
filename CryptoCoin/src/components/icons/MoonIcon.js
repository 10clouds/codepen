import React from 'react';

const Icon = props => (
  <svg width={25} height={25} viewBox="0 0 33 33" {...props}>
    <g fill="none" fillRule="evenodd">
      <circle
        cx={16.48}
        cy={16.48}
        r={13.98}
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        d="M11.91 16.48h18.55m-17.3-6.1H28.8M13.16 21.63h16.31m-13.23 5.05h9.79M17.25 6.03h8.51"
      />
      <path d="M0 0h33v33H0z" />
    </g>
  </svg>
);

export default Icon;
