import { ContributionMetadata, TraitType } from "../types";
import { Pattern, Prompt } from "../types/common/server-api";
import { ipfs } from "../types/ipfs";

var Buffer = require("buffer/").Buffer; // note: the trailing slash is important!
export function createBlobAnimation(
  prompt: Prompt,
  pattern: Pattern,
  response: string
): Buffer {
  // TODO: implement
  return Buffer.from("blah");
}

export async function createBlobNft(
  prompt: Prompt,
  pattern: Pattern,
  response: string
): Promise<void> {
  // use prompt, pattern, contribution to save to ipfs
  const animation = createBlobAnimation(prompt, pattern, response);
  const { cid: animationCid, path: animationPath } = await ipfs.add(animation);
  console.log(animationCid);
  const animationUrl = `ipfs://${animationPath}`;
  // TODO: move to helper.
  const contributionMetadata: ContributionMetadata = {
    name: "Pluriverse",
    description: `_${response}_\n\nPluriverses are tokens representing contributions to the [Towards a Pluriverse essay](https://pluriverse.world).`,
    animation_url: animationUrl,
    external_url: "https://pluriverse.world",
    background_color: "#000000",
    attributes: [
      { trait_type: TraitType.Prompt, value: prompt },
      { trait_type: TraitType.Pattern, value: pattern },
    ],
  };
  console.log(contributionMetadata);
  // await ipfs.add(contributionMetadata)
  // TODO: mint nft
}
