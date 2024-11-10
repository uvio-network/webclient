import moment from "moment";

import { NoteSearchResponse } from "@/modules/api/note/search/Response";

export class NotificationObject {
  private note: NoteSearchResponse;

  constructor(note: NoteSearchResponse) {
    this.note = note;
  }

  //
  // getter
  //

  getNote(): NoteSearchResponse {
    return this.note;
  }

  //
  // intern
  //

  created(): moment.Moment {
    return moment.unix(Number(this.note.created)).utc();
  }

  id(): string {
    return this.note.id;
  }

  owner(): string {
    return this.note.owner;
  }

  //
  // public
  //

  // kind returns the note kind, which may be one of the following.
  //
  //     UserRight
  //     UserWrong
  //     UserHonest
  //     UserDishonest
  //     UserAbstained
  //     UvxMint
  //     VoterSelected
  //
  kind(): string {
    return this.note.kind;
  }

  message(): string {
    return this.note.message;
  }

  pointer(): moment.Moment {
    return moment.unix(Number(this.note.pointer)).utc();
  }

  resource(): string {
    return this.note.resource;
  }
}
