// sec is the amount of seconds that the internal state of a locker instance is
// locked.
const sec = 5;

// Locker is for us to manage state in situations where react components are
// seemingly arbitrarily re-rendered, while we actually only want to fetch data
// inside of them once. In some components we create a global variable that we
// use to lock access to certain code paths, in order to guarantee single calls
// to external APIs.
export class Locker {
  private unix: number | null = null;

  // locked returns true as long as the internal state is locked.
  public locked(): boolean {
    return this.unix !== null && this.unix > Date.now() / 1000;
  }

  // lock sets the internal state to be locked.
  public lock(): boolean {
    if (this.locked()) {
      return false;
    }

    {
      this.unix = Date.now() / 1000 + sec;
    }

    return true;
  }
}
