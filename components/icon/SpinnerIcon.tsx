interface Props {
  className?: string;
  textColour: string;
}

export const SpinnerIcon = (props: Props) => {
  return (
    <svg
      className={`w-6 h-6 text-transparent animate-spin transition duration-[2000ms] ${props.className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`spinner-effect ${props.textColour}`}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 12, 12 m 0, 6 a 6,6 0 0,1 0,-12 a 6,6 0 0,1 6,6" />
    </svg >
  );
};
