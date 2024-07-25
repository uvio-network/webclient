import Link from "next/link";

export const AppLogo = () => {
  const strokeWidth = "48";

  return (
    <Link href="/">
      <svg
        className="bg-white text-black dark:bg-black dark:text-white"
        viewBox="0 810 3840 540"
        height="36px"
        width="224px"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <clipPath id="a">
          <path d="M0 0h3840v2160H0z" />
        </clipPath>
        <g clipPath="url(#a)">
          <path className="dark:text-black text-white" d="m0 0l3840.0 0l0 2160.0l-3840.0 0z" fillRule="evenodd" />
          <path d="M2382.176 1291.85V974.104" />
          <path stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" d="M2382.176 1291.85V974.104" />
          <path d="M2074.07 1291.844h616.252" />
          <path stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" d="M2074.07 1291.844h616.252" />
          <path d="M2074.083 868.182h616.252" />
          <path stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" d="M2074.083 868.182h616.252" />
          <path d="M3497.625 868.15H3114l-115.562 79.45v264.773l115.562 79.45h385.186l115.502-79.407V948.674" />
          <path stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" d="M3497.625 868.15H3114l-115.562 79.45v264.773l115.562 79.45h385.186l115.502-79.407V948.674" />
          <path d="M841.575 868.182v344.226" />
          <path stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" d="M841.575 868.182v344.226" />
          <path d="M225.312 868.176v344.222l115.502 79.45H726" />
          <path stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" d="M225.312 868.176v344.222l115.502 79.45H726" />
          <path d="m1765.948 868.182-.032 105.907" />
          <path stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" d="m1765.948 868.182-.032 105.907" />
          <path d="m1149.75 868.176-.125 105.961 231.126 317.712h154.123l154-211.837" />
          <path stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" d="m1149.75 868.176-.125 105.961 231.126 317.712h154.123l154-211.837" />
        </g>
      </svg>
    </Link>
  );
};
