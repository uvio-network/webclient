import * as Form from "@radix-ui/react-form";

export const StakeField = () => {
  return (
    <Form.Field className="basis-1/4" name="stake">
      <Form.Control asChild>
        <input
          defaultValue="0.003 ETH"
          className="block mr-2 w-full bg-white dark:bg-black outline-none"
          placeholder="0.003 ETH"
          required={true}
          type="text"
        />
      </Form.Control>
      <div className="">
        <Form.Message className="" match="valueMissing">
          You must stake a minimum amount of reputation with your claim.
        </Form.Message>
        <Form.Message className="" match={(inp: string) => valNum(inp)}>
          The amount of staked reputation must be numerical.
        </Form.Message>
        <Form.Message className="" match={(inp: string) => valTok(inp)}>
          The amount of staked reputation must be denominated in ETH.
        </Form.Message>
      </div>
    </Form.Field>
  );
};

const regex = /^\d+(\.\d+)? \S+$/;

// valNum returns true if the given input string has a numerical prefix. The
// implication here is that the input string must have only one whitespace
// separating prefix and suffix.
//
//     "0.003 ETH"
//
const valNum = (inp: string): boolean => {
  if (!inp || inp === "") return false;
  return regex.test(inp);
};

// valTok returns true if the given input string has the " ETH" suffix.
//
//     "0.003 ETH"
//
const valTok = (inp: string): boolean => {
  if (!inp || inp === "") return false;
  return inp.endsWith(" ETH");
};
