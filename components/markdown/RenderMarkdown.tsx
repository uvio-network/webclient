import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Components } from "react-markdown";

interface Props {
  embed?: boolean;
  markdown: string;
}

export const RenderMarkdown = (props: Props) => {
  return (
    <Markdown
      allowedElements={allowedElements}
      className={`
        w-full
        ${props.embed === true ? "text-sm" : "text-base"}
      `}
      components={components(props.embed || false)}
      remarkPlugins={[remarkGfm]}
      skipHtml={true}
    >
      {props.markdown}
    </Markdown>
  );
};

const allowedElements = [
  "h1", "h3", "h5",
  "a", "p",
  "ol", "ul", "li",
  "hr",
  "em", "strong",
  "blockquote",
];

// components returns the transformer functions for every DOM element that we
// are rendering. The boolean argument is optional and controls the font size
// that we are rendering. By default, when emb is false, font sizes are one step
// bigger. This default case is used for markdown of claim objects on the
// timeline. When emb is true, which is the case when we render embedded claims,
// then the font sizes we render are one step smaller. Those embedded claims are
// how we display comments, in retweet style.
const components = (emb: boolean): Components => {
  return {
    h1(props) {
      return <h1
        className={`
          my-4 text-black dark:text-white
          ${emb === true ? "text-2xl" : "text-3xl"}
        `}
        {...getRst(props)}
      />;
    },
    h3(props) {
      return <h3
        className={`
          my-4 text-black dark:text-white
          ${emb === true ? "text-1xl" : "text-2xl"}
        `}
        {...getRst(props)}
      />;
    },
    h5(props) {
      return <h5
        className={`
          my-4 text-black dark:text-white
          ${emb === true ? "text-lg" : "text-xl"}
        `}
        {...getRst(props)}
      />;
    },
    a(props) {
      // We are parsing links provided with the markdown and want to ensure that
      // external links open in a new browser tab. It may happen that links are
      // injected that point to app specific pages. For instance our own internal
      // " ... show more" link points to the specific claim page at which all
      // content can be read without truncation. For our internal links we do not
      // want to open new browser tabs, but instead allow the user to stay where
      // they are. That is why the link target below is conditional on the href
      // atribute of the parsed link.
      //
      // Further note that we are using the next/link component for all parsed
      // links. We are doing that in order to using the NextJs native navigation
      // for internal links. If we were to use plain <a> elements here, then our
      // internat " ... show more" links would reload the entire app only to get
      // to the specified claim page. And we do not want that behaviour.
      return <Link
        className={`
          text-blue-400
        `}
        target={props.href?.startsWith("/claim/") && emb !== true ? "" : "_blank"}
        {...getRst(props)}
      />;
    },
    p(props) {
      return <p
        className={`
          mt-4
        `}
        {...getRst(props)}
      />;
    },
    ol(props) {
      return <ol
        className={`
          mt-4 list-decimal list-inside
        `}
        {...getRst(props)}
      />;
    },
    ul(props) {
      return <ul
        className={`
          mt-4 list-disc list-inside
        `}
        {...getRst(props)}
      />;
    },
    li(props) {
      return <li
        className={`
          ml-2
        `}
        {...getRst(props)}
      />;
    },
    hr(props) {
      return <hr
        className={`
          my-4 border-gray-300 dark:border-gray-600
        `}
        {...getRst(props)}
      />;
    },
    blockquote(props) {
      return <blockquote
        className={`
          my-4 px-4 border-l-4 border-blue-400 text-gray-500 dark:text-gray-400 font-mono
        `}
        {...getRst(props)}
      />;
    },
  };
};

const getRst = (props: any) => {
  const { node, ...rest } = props;
  return rest
};
