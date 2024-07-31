import * as Separator from "@/components/layout/separator";

import { ClaimContainer } from "@/components/claim/ClaimContainer";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { PageHeader } from "@/components/page/PageHeader";

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

const list: ClaimObject[] = [
  new ClaimObject(
    {
      // intern
      created: "1722254829",
      id: "1",
      owner: "",
      tree: "123",

      // public
      expiry: "1763766000",
      kind: "claim",
      labels: "econ, finance",
      lifecycle: "propose",
      option: "",
      stake: "15.273,2.773,0.5,0.5,1.5",
      parent: "",
      text: markdown,
      token: "ETH",
    },
    {
      created: "",
      id: "8236427635",
      image: "",
      name: "RevengeArch47",
    },
  ),
  new ClaimObject(
    {
      // intern
      created: "1722254829",
      id: "2",
      owner: "",
      tree: "123",

      // public
      expiry: "1763766000",
      kind: "claim",
      labels: "crypto, foobar",
      lifecycle: "resolve",
      option: "true",
      stake: "2.773,15.273,0.5,0.5,1.5",
      parent: "1",
      text: markdown,
      token: "ETH",
    },
    {
      created: "",
      id: "8236427635",
      image: "",
      name: "RevengeArch47",
    },
  ),
];

export default function Page({ params }: { params: { slug: string } }) {
  // TODO fetch claim tree
  // TODO fetch all relevant users
  return (
    <>
      <PageHeader titl="Claim Tree" />

      {list.map((x: ClaimObject, i: number) => (
        <div key={x.id()}>
          <ClaimContainer claim={x} />

          {/*
          Show a vertical separator between claims and make sure that the last
          claim does not display a separator anymore.
          */}
          {i < list.length - 1 && (
            <div className="w-full h-12 mb-8">
              <Separator.Vertical />
            </div>
          )}
        </div>
      ))}
    </>
  );
};
