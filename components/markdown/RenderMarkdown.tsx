import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Components } from "react-markdown";
import { TrimWhitespace } from "@/modules/string/TrimWhitespace";

interface Props {
  editor?: boolean;
  embed?: boolean;
  markdown: string;
}

export const RenderMarkdown = (props: Props) => {
  return (
    <Markdown
      allowedElements={allowedElements}
      className={TrimWhitespace(`
        w-full dark:font-light
        ${props.embed === true ? "text-sm" : "text-base"}
      `)}
      components={components(props.editor || false, props.embed || false)}
      remarkPlugins={[remarkGfm]}
      skipHtml={true}
    >
      {props.markdown}
    </Markdown>
  );
};

const allowedElements = [
  "h1", "h3",
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
const components = (edi: boolean, emb: boolean): Components => {
  return {
    h1(props) {
      return <h1
        className={TrimWhitespace(`
          text-black dark:text-white font-normal
          ${emb === true ? "mt-2 text-xl" : "mt-4 text-2xl"}
        `)}
        {...getRst(props)}
      />;
    },
    h3(props) {
      return <h3
        className={TrimWhitespace(`
          text-black dark:text-white font-normal
          ${emb === true ? "mt-2 text-lg" : "mt-4 text-xl"}
        `)}
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
        className={TrimWhitespace(`
          text-blue-400
        `)}
        target={props.href?.startsWith("/claim/") && edi === false ? "" : "_blank"}
        {...getRst(props)}
      />;
    },
    p(props) {
      return <p
        className={TrimWhitespace(`
          ${emb === true ? "mt-2" : "mt-4"}
        `)}
        {...getRst(props)}
      />;
    },
    ol(props) {
      return <ol
        className={TrimWhitespace(`
          list-decimal list-inside
          ${emb === true ? "mt-2" : "mt-4"}
        `)}
        {...getRst(props)}
      />;
    },
    ul(props) {
      return <ul
        className={TrimWhitespace(`
          list-disc list-inside
          ${emb === true ? "mt-2" : "mt-4"}
        `)}
        {...getRst(props)}
      />;
    },
    hr(props) {
      return <hr
        className={TrimWhitespace(`
          border-color
          ${emb === true ? "mt-2" : "mt-4"}
        `)}
        {...getRst(props)}
      />;
    },
    strong(props) {
      return <strong
        className="font-bold"
        {...getRst(props)}
      />;
    },
    blockquote(props) {
      return <blockquote
        className={TrimWhitespace(`
          px-4 border-l-4 border-blue-400 text-sm text-gray-500 dark:text-gray-400 font-mono
          ${emb === true ? "mt-2" : "mt-4"}
        `)}
        {...getRst(props)}
      />;
    },
  };
};

const getRst = (props: any) => {
  const { node, ...rest } = props;
  return rest
};
