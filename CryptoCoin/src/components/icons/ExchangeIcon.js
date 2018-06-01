import React from 'react';

const Icon = props => (
  <svg width={32} height={33} viewBox="0 0 32 33" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M8.844 27.516V6.188l-3.75 3.75c-.235.234-.625.234-.899 0-.234-.235-.234-.626 0-.899L9 4.234a.662.662 0 0 1 .898 0l4.844 4.844c.235.235.235.625 0 .899a.627.627 0 0 1-.43.195.627.627 0 0 1-.43-.195l-3.75-3.75v21.328a.617.617 0 0 1-.624.625c-.352-.04-.664-.313-.664-.664zM23.53 4.078a.617.617 0 0 0-.625.625v21.328l-3.75-3.75c-.234-.234-.625-.234-.898 0-.235.235-.235.625 0 .899l4.805 4.804a.627.627 0 0 0 .43.196.627.627 0 0 0 .429-.196l4.844-4.843c.234-.235.234-.625 0-.899-.235-.273-.625-.234-.899 0l-3.75 3.75V4.703c.04-.351-.273-.625-.586-.625z"
      />
      <circle cx={23.531} cy={6.344} r={2.344} fill="currentColor" />
      <circle cx={9.469} cy={25.875} r={2.344} fill="currentColor" />
      <path d="M0 0h32v33H0z" />
    </g>
  </svg>
);

export default Icon;