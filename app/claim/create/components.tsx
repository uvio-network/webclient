import { Components } from "react-markdown";

export const components: Components = {
  h1(props) {
    return <h1 className="my-4 text-black dark:text-white text-3xl" {...getRst(props)} />
  },
  h3(props) {
    return <h3 className="my-4 text-black dark:text-white text-2xl" {...getRst(props)} />
  },
  h5(props) {
    return <h5 className="my-4 text-black dark:text-white text-xl" {...getRst(props)} />
  },
  a(props) {
    return <a className="my-4 text-blue-400" target="_blank" {...getRst(props)} />
  },
  p(props) {
    return <p className="my-4" {...getRst(props)} />
  },
  ol(props) {
    return <ol className="my-4 list-decimal" {...getRst(props)} />
  },
  ul(props) {
    return <ul className="my-4 list-disc" {...getRst(props)} />
  },
  hr(props) {
    return <hr className="my-4 border-gray-300 dark:border-gray-600" target="_blank" {...getRst(props)} />
  },
  blockquote(props) {
    return <blockquote className="my-4 px-4 border-l-4 border-blue-400 text-gray-500 dark:text-gray-400 font-mono" {...getRst(props)} />
  },
};

const getRst = (props: any) => {
  const { node, ...rest } = props;
  return rest
};
