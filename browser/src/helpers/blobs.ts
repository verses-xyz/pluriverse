import { Pattern, Prompt } from "../types";
var Buffer = require("buffer/").Buffer; // note: the trailing slash is important!

export function createBlobAnimation(
  prompt: Prompt,
  pattern: Pattern,
  response: string
): Buffer {
  // TODO: implement
  return Buffer.from("blah");
}
