import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function CompassIcon(props: IconProps): React.JSX.Element {
  const { size = 26, className } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
    >
      <circle cx="14" cy="14" r="11.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M14 3V7M14 21V25M3 14H7M21 14H25"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M14 8.5L16.2 14L14 19.5L11.8 14Z" fill="currentColor" />
    </svg>
  );
}

export function AnchorIcon(props: IconProps): React.JSX.Element {
  const { size = 22, className } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
    >
      <circle cx="14" cy="7" r="2.5" stroke="currentColor" strokeWidth="1" />
      <path d="M14 9.5V23" stroke="currentColor" strokeWidth="1" />
      <path d="M8 13H20" stroke="currentColor" strokeWidth="1" />
      <path
        d="M5 15.5C5 19.5 9 23 14 23C19 23 23 19.5 23 15.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShipWheelIcon(props: IconProps): React.JSX.Element {
  const { size = 22, className } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
    >
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1" />
      <circle cx="14" cy="14" r="2.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M14 2V6M14 22V26M2 14H6M22 14H26M6.2 6.2L9 9M19 19L21.8 21.8M21.8 6.2L19 9M9 19L6.2 21.8"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function SailboatIcon(props: IconProps): React.JSX.Element {
  const { size = 18, className } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
    >
      <path d="M14 4V19" stroke="currentColor" strokeWidth="1" />
      <path
        d="M14 5L21 17.5H14V5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M14 8.5L9 17.5H14V8.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M4 20.5C6.5 23 10 24.3 14 24.3C18 24.3 21.5 23 24 20.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface WaveDividerProps {
  className?: string;
}

export function WaveDivider(props: WaveDividerProps): React.JSX.Element {
  const { className } = props;
  return (
    <svg
      viewBox="0 0 120 16"
      preserveAspectRatio="none"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 8Q5 2 10 8T20 8T30 8T40 8T50 8T60 8T70 8T80 8T90 8T100 8T110 8T120 8"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
