import React from 'react';
import {IconProps} from './types';
import {normalizeProps} from './utils/normalizeProps';

export const CircleCheckIcon = (props: IconProps) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...normalizeProps(props)}
    >
      <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" fill="currentColor" />
      <path
        d="M45.1956 19.2315C45.894 19.9725 45.8594 21.1394 45.1184 21.8378L25.6242 40.2112C24.7976 40.9903 23.4999 40.9663 22.7026 40.1571L16.1134 33.4696C15.3987 32.7443 15.4074 31.5769 16.1327 30.8622C16.8581 30.1476 18.0254 30.1562 18.7401 30.8815L24.2324 36.4558L42.5893 19.1544C43.3303 18.456 44.4972 18.4905 45.1956 19.2315Z"
        fill="white"
      />
    </svg>
  );
};
