export interface NoteSearchRequest {
  // filter
  paging: "page" | string;

  // public
  kind: "*" | string;
}
