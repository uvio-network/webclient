import { ClaimContent } from "@/components/claim/ClaimContent";
import { PostSearch } from "@/modules/api/post/search/Search";
import { PostSearchRequest } from "@/modules/api/post/search/Request";
import { useQuery } from "@tanstack/react-query";
import { ClaimObject } from "@/modules/claim/object/ClaimObject";
import { EmptyUserSearchResponse } from "@/modules/api/user/search/Response";

interface Props {
  query: string[];
  request: PostSearchRequest[];
}

export const ClaimPreview = (props: Props) => {
  const claim = useQuery({
    queryKey: [...props.query, "ClaimPreview", "PostSearch"],
    queryFn: async () => {
      const [pos] = await PostSearch("", props.request);
      return new ClaimObject(pos, EmptyUserSearchResponse(), undefined, []);
    },
  })

  return (
    <div>
      {!claim.data && (
        <>
          claim not found
        </>
      )}

      {claim.data && (
        <div className="m-2 px-2 pb-2 background-overlay rounded border border-color">
          <ClaimContent
            claim={claim.data}
            editor={true}
            embed={true}
          />
        </div>
      )}
    </div>
  );
};
