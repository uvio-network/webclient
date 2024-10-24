import Link from "next/link";

interface Props {
  children: React.ReactElement;
  href: string;
}

export const ConditionalLink = (props: Props) => {
  return props.href ? <Link href={props.href}>{props.children}</Link> : props.children;
};
