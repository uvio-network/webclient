
import { PageHeader } from "@/components/page/PageHeader";
import { ClaimContainer } from "@/components/claim/ClaimContainer";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";

const markdown = `
# This is an H1

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
Ipsum has been the industry's standard dummy text ever since the 1500s, when an
unknown printer took a **galley** of type and scrambled it to make a type
specimen book. It has survived not only five *centuries*, but also the leap into
electronic typesetting, remaining essentially unchanged.

* Optionally follows
* Renders actual React elements instead of using
* Lets you define your own components (to render
`;

export default function Page({ params }: { params: { slug: string } }) {
  const list: ClaimObject[] = [
    new ClaimObject({
      // intern
      created: "",
      id: "",
      owner: "",
      tree: params.slug,

      // public
      expiry: "",
      kind: "claim",
      labels: "econ, finance",
      lifecycle: "propose",
      options: "true",
      stake: "0.5",
      parent: "",
      text: markdown,
      token: "ETH",
    }),
    new ClaimObject({
      // intern
      created: "",
      id: "",
      owner: "",
      tree: params.slug,

      // public
      expiry: "",
      kind: "claim",
      labels: "crypto, foobar",
      lifecycle: "resolve",
      options: "true",
      stake: "0.5",
      parent: "",
      text: markdown,
      token: "ETH",
    }),
  ];

  return (
    <>
      <PageHeader titl="Claim Tree" />

      {list.map((x: ClaimObject) => (
        <ClaimContainer key={x.id()} claim={x} />
      ))}
    </>
  );
};
