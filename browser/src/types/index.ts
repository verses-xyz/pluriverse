import { Pattern, PatternToDisplay, Prompt } from "../types/common/server-api";

export enum TraitType {
  Prompt,
  Pattern,
}

interface TraitTypeValue {
  [TraitType.Prompt]: string;
  [TraitType.Pattern]: string;
}

export interface ContributionAttribute<T extends TraitType> {
  trait_type: T;
  value: TraitTypeValue[T];
}

export interface ContributionMetadata {
  name: string;
  description: string;
  animation_url: string;
  external_url: string;
  background_color: string;
  attributes: ContributionAttribute<TraitType>[];
}

export function getPatternPlaceholder(
  pattern: Pattern,
  prompt: Prompt
): string {
  let placeholder = PatternToDisplay[pattern];
  switch (pattern) {
    case Pattern.Pluriverse:
    case Pattern.Commons:
      placeholder = `the ${pattern}`;
  }
  return prompt === Prompt.LooksLike
    ? placeholder[0].toUpperCase() + placeholder.slice(1)
    : placeholder;
}

export const Principles: Record<
  Exclude<Pattern, Pattern.Pluriverse>,
  Principle
> = {
  [Pattern.Interoperability]: {
    title: PatternToDisplay[Pattern.Interoperability],
    problem: `We cannot allow siloed platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets. We must resist these attempts to enforce digital scarcity where there could be digital abundance.`,
    solution: `The many worlds of the pluriverse must be connected. Meaningful interoperability will be both technical and institutional; the data moats of today will give way to the portable social graphs and cooperative data structures of tomorrow. We will reconstitute interoperability as building pathways and connections between rich universes, cross-pollinating relationships and knowledge across modalities of communication`,
  },
  [Pattern.Agency]: {
    title: PatternToDisplay[Pattern.Agency],
    problem: `Our digital ecosystem provides nothing better than the illusion of choice. And yet, the alternatives we are offered do little other than form a dizzying range of backdrops against which to enact our own self-exploitation. Choice means nothing when the options are predetermined under a single set of values and primitives.`,
    solution: `To break free of this illusion, we must replace notions of individual choice with demands for agency, both individual and collective. Our new world will invite all to contribute, tinker, and fork creations and entire worlds, providing pathways and tools for the exercise of agency. We will give members and communities the power to mold the technology they use, shape the content they see, and form the values they prioritize.`,
  },
  [Pattern.Voice]: {
    title: PatternToDisplay[Pattern.Voice],
    problem: `The current system is predicated only on the meaningless promise of exit - feedback defined only by leaving a platform, by logging off, by deleting accounts. But exit cannot serve as a mechanism of accountability when many platforms are necessary for basic communication, even for work or school. Nor can it be an impetus for change when there is nowhere to go - mobility means nothing in a vacuum. “Complete” exit is also not meaningful if the platform retains your data and network.`,
    solution: `Departure can be powerful, particularly once alternatives exist but only when coupled with decision-making can influence be widely shared. Through deliberation, delegation, and stewardship, we will recenter voice in digital organizations and platform governance. `,
  },
  [Pattern.EngagementAndAttention]: {
    title: PatternToDisplay[Pattern.EngagementAndAttention],
    problem: `Attention can create its own whirlwind, bringing things into being wherever it is concentrated. We deserve better than to sell this creative force for pennies on the dollar. We must stand against the breaking down of attention into fungible units of transaction, to be bought and sold without our knowledge or consent.`,
    solution: `Active attention is a scarce human resource, and we must value it as such. It is a necessary ingredient for the active exercise of a will toward transformation. At the same time, we must also build for valuing intention and retention. Such mnemonic media will be the transformative tools for thought that we need in the pluriverse.`,
  },
  [Pattern.Privacy]: {
    title: PatternToDisplay[Pattern.Privacy],
    problem: `The Metaverse vision is a vision of surveillance and control. The more data is tracked, the more monetization potential for large platforms, the more fodder for centrally-held AI models, and the more algorithmically-driven engagement potential. Privacy is a luxury good, and it is increasing in price by the day; this is an unsustainable future. `,
    solution: `We must reimagine privacy as a communal good, necessary to protect the green shoots of these transformational tendencies in a monopolized and surveilled world. Building from a foundation of distributed identity mechanisms and verification based on personhood, not either state or stake, we will reclaim the digital sphere as one in which individuals and communities can act, grow, learn, deliberate, and agitate free of surveillance. `,
  },
  [Pattern.Regeneration]: {
    title: PatternToDisplay[Pattern.Privacy],
    problem: `The offer of the Metaverse is transcendence of physical space, the reality is a commitment to extraction. Extractive processes leave devastation in their wake, and accrue resources to those who already have enough to lead the extraction; concentration and centralization are unavoidable. Predatory platforms and protocols can act as invasive species, succeeding only in coercion and enclosure of necessary infrastructure.`,
    solution: `We must learn from the ecological necessity of diversity and balance, and uproot these monocultures as we cultivate a sustainable digital ecosystem. Regeneration leaves resources intact, or replenishes them with use such that they do not deplete over time. Rather than externalizing its true costs, regeneration incorporates and overcomes the cost of resource use through resource generation.`,
  },
  [Pattern.Commons]: {
    title: PatternToDisplay[Pattern.Commons],
    problem: `Digital space is becoming privatized; the processes of commons enclosure that produced private property for the few and destitution for the many is repeating. We must build forms of social organization that break the binary between Adam Smith’s Market and Thomas Hobbes’ Leviathan. The current system gives us few options, caught as we are between the  surveillance state and surveillance capitalism.`,
    solution: `Our digital commons is not for sale. We must reclaim the commons, and steward shared digital space with shared responsibility. Governing a resource like a commons means ensuring sustainable use; allowing for the maximum amount of shared benefit while preserving the resource for the future. Through commoning, the walled digital gardens of the metaverse will give way to the open community gardens of the pluriverse.`,
  },
};

export interface Principle {
  title: string;
  problem: string;
  solution: string;
}
