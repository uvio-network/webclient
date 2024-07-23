interface Props {
  titl: string;
}

export const PageHeader = (props: Props) => {
  return (
    <h3 className="mb-4 text-right text-3xl">
      {props.titl}
    </h3>
  );
};
