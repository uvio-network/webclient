import { Address } from "viem";
import { encodeFunctionData } from "viem";
import { EncodeFunctionDataParameters } from "viem";
import { encodePacked } from "viem";
import { keccak256 } from "viem";
import { numberToHex } from "viem";
import { pad } from "viem";
import { padHex } from "viem";
import { PublicClient } from "viem";
import { StateMapping } from "viem";
import { TokenConfig } from "@/modules/token/TokenConfig";
import { Transaction } from "@biconomy/account";

export const Encode = (amo: bigint, spd: Address, tok: TokenConfig): Transaction => {
  return {
    to: tok.address,
    data: encodeFunctionData(newPar(amo, spd, tok)),
  };
};

export const Simulate = async (pub: PublicClient, frm: Address, amo: bigint, spd: Address, tok: TokenConfig) => {
  await pub.simulateContract({
    ...newPar(amo, spd, tok),
    address: tok.address,
    account: frm,
  })
};

export const State = (acc: Address, spd: Address, amo: bigint): StateMapping => {
  return [
    {
      slot: keccak256(encodePacked(
        [
          "bytes32",
          "bytes32",
        ],
        [
          // The address here is left padded as a single 32 byte word,
          // representing the spender address being approved to spend UVX tokens
          // for the approving account. It is important to encode this address
          // of 20 bytes into a left padded 32 byte word, which is why the type
          // definition for this parameter is bytes32 and not address.
          padHex(spd, { dir: "left", size: 32 }),
          keccak256(encodePacked(
            [
              "bytes32",
              "uint256",
            ],
            [
              // The address here is left padded as a single 32 byte word,
              // representing the account address having approved the UVX token
              // spender. It is important to encode this address of 20 bytes
              // into a left padded 32 byte word, which is why the type
              // definition for this parameter is bytes32 and not address.
              padHex(acc, { dir: "left", size: 32 }),

              // The bigint here is a single 32 byte word, representing the
              // storage slot index for the ERC20 _allowances mapping as defined
              // by the UVX contract. The standard standalone storage slot index
              // for _allowances of ERC20 contracts is 1. The UVX contract
              // inherits other contracts before the ERC20 standard, and so the
              // storage slot index differs. The real value can be read with
              // e.g. the hardhat-storage-layout plugin.
              BigInt(3),
            ],
          )),
        ],
      )),
      // The value here is left padded as a single 32 byte word, representing
      // the balance amount approved to be spent by the approved spender. This
      // value is overwriting the contract state at the generated storage slot
      // in order for the simulation to verify that the required approval took
      // in fact place.
      value: pad(numberToHex(amo), { size: 32 }),
    }
  ];
};

const newPar = (amo: bigint, spd: Address, tok: TokenConfig): Required<EncodeFunctionDataParameters> => {
  return {
    abi: tok.abi,
    functionName: "approve",
    args: [
      spd, // spender address
      amo, // token amount
    ],
  };
};
