import { LoadingStore } from "@/components/loading/LoadingStore";

interface Props {
  titl: string;
}

export const PageHeader = (props: Props) => {
  const { loading } = LoadingStore();

  if (loading) return <></>;

  return (
    <h3 className="mb-4 text-right text-3xl">
      {props.titl}
    </h3>
  );
};
