import React from "react";

const LogoComponent = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 82.59 82.59"
      fill="currentColor"
    >
      <g>
        <polygon points="41.3 0 59.03 17.73 23.57 17.73 41.3 0" />
        <polygon points="0 41.29 17.73 23.56 17.73 59.02 0 41.29" />
        <polygon points="23.57 64.86 59.03 64.86 41.3 82.59 23.57 64.86" />
        <polygon points="82.59 41.29 64.86 59.02 64.86 23.56 82.59 41.29" />
        <circle cx="41.3" cy="41.29" r="13.32" />
      </g>
    </svg>
  );
};

export default LogoComponent;
