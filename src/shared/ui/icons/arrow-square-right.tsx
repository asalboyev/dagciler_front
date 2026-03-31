export function ArrowSquareRightIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M7.5 14.167L11.667 10 7.5 5.833"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 10c0-3.929 0-5.893 1.22-7.071C4.94 1.75 6.786 1.75 10 1.75s5.06 0 6.28 1.179C17.5 4.107 17.5 6.071 17.5 10s0 5.893-1.22 7.071C15.06 18.25 13.214 18.25 10 18.25s-5.06 0-6.28-1.179C2.5 15.893 2.5 13.929 2.5 10z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
