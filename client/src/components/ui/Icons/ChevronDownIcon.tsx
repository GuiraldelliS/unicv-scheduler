import React from 'react';
import {IconProps} from './types';
import {normalizeProps} from './utils/normalizeProps';

export const ChevronDownIcon = (props: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...normalizeProps(props)}
    >
      <path
        d="M4.22 8.47a.75.75 0 0 1 1.06 0L12 15.19l6.72-6.72a.75.75 0 1 1 1.06 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L4.22 9.53a.75.75 0 0 1 0-1.06Z"
        fill="currentColor"
      />
    </svg>
  );
};
