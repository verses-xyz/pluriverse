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
  if (prompt === Prompt.FreeForm) {
    return "";
  }

  let placeholder = PatternToDisplay[pattern];
  switch (pattern) {
    case Pattern.Pluriverse:
    case Pattern.Commons:
      placeholder = `the ${pattern}`;
  }
  return [Prompt.LooksLike].includes(prompt)
    ? placeholder[0].toUpperCase() + placeholder.slice(1)
    : placeholder;
}

export const Principles: Record<
  Exclude<Pattern, Pattern.Pluriverse>,
  Principle
> = {
  [Pattern.Interoperability]: {
    title: PatternToDisplay[Pattern.Interoperability],
    problem: `Siloed platforms sever and stymie the highways and networks between worlds. They prevent individual agency and, more importantly, community agency in choosing spaces to gather and tools to build. However, careless interoperability brings privacy risk and its own flattening, as all data becomes open; the problem at hand is to strike a balance between the individual and the collective, and between access and control.`,
    solution: `Meaningful interoperability will be both technical and institutional; the data moats of today will give way to the portable social graphs and cooperative data structures of tomorrow. Democratic control will augment technical portability, as we reconstitute interoperability as building pathways and connections between rich universes, cross-pollinating relationships and knowledge across modalities of communication.`,
  },
  [Pattern.Agency]: {
    title: PatternToDisplay[Pattern.Agency],
    problem: `Most people have little or no control over the technical or policy decisions that shape their digital lives. Technology often feels like magic that they must obey or fight with to get the behavior they want. Choice may nominally be everywhere, but the centrality of control means the alternatives are barely distinguishable, and options are predetermined under a single set of values.`,
    solution: `To break free of this illusion, we must replace notions of individual choice with demands for agency, both individual and collective. Our new world will empower all to contribute, tinker, and fork creations and entire worlds, providing pathways and tools for the exercise of agency. We will give members and communities the power to create the technology they use, shape the content they see, and form the values they prioritize by opening up black-box algorithms, providing open tools for creation of software, and granting the ultimate customization of engagement and experience to end-users.`,
  },
  [Pattern.Voice]: {
    title: PatternToDisplay[Pattern.Voice],
    problem: `In the dichotomy between exit–exerting will via departure– and voice–expressing will through meaningful participation—autonomy in the current digital ecosystems is  predicated only on the meaningless promise of exit. Feedback is defined by leaving a platform, by logging off, by deleting accounts. But exit cannot truly serve as a mechanism of accountability when many platforms are necessary for basic communication; “complete” exit is also not possible if the platform retains your data and network. Avenues for effective voice over digital space are extremely limited for those without pre-existing power within the ecosystem.`,
    solution: `Through enabling deliberation, representative delegation, and stewardship, we will recenter voice in digital organizations and platform governance. This will require concrete mechanisms of governance—modular protocols, consensus mechanisms, federated leadership, deliberative forums, and bridges to offline spaces—and will also require inclusive and accessible design to ensure that the exercise of voice is possible for those at different levels of technical proficiency.`,
  },
  [Pattern.EngagementAndAttention]: {
    title: PatternToDisplay[Pattern.EngagementAndAttention],
    problem: `Attention can create its own whirlwind, bringing things into being wherever it is concentrated. We deserve better than for this creative force to be sold for pennies on the dollar; attention is currently directed illegitimately. We must stand against the breaking down of attention into fungible units of transaction, to be bought and sold without our knowledge or consent.`,
    solution: `Active attention is a precious human resource, and we must value it as such. It is a necessary ingredient for the active exercise of a will toward transformation. At the same time, we must also build for valuing intentionality and improving, not reducing, our collective capacity for thought and judgment. Such mnemonic media will be the transformative tools for thought that we need in the pluriverse.`,
  },
  [Pattern.Privacy]: {
    title: PatternToDisplay[Pattern.Privacy],
    problem: `The Metaverse vision is a vision of surveillance and control. The more data is tracked, the more monetization potential for large platforms, the more fodder for centrally-held AI models, and the more algorithmically-driven engagement potential. Privacy is necessary for free expression, for diversity of interactions and identities, and often for safety, and yet it has become a luxury good, with privacy-preserving technologies remaining the preserve of those with knowledge or capital, not the default.`,
    solution: `We must reimagine privacy as a public good, necessary to protect the green shoots of these transformational tendencies in a monopolized and surveilled world. Building from a foundation of distributed identity mechanisms and verification based on personhood, not either state or stake, we will reclaim the digital sphere as one in which individuals and communities can act, grow, learn, deliberate, and agitate free of surveillance.`,
  },
  [Pattern.Regeneration]: {
    title: PatternToDisplay[Pattern.Regeneration],
    problem: `The offer of the Metaverse is transcendence of physical space; the reality is a commitment to physical extraction. Extractive models use up and degrade resources, so that they cannot be re-used or replenished. They often see resources being accrued by those who had resources to start with, because it is those people who have the ability to continuously extract, centralizing power in an economy of scale.`,
    solution: `We must learn from the ecological necessity of diversity and balance, and uproot these monocultures as we cultivate a sustainable digital ecosystem. Regeneration leaves resources intact, or replenishes them with use such that they do not deplete over time. Rather than externalizing its true costs, regeneration incorporates and overcomes the cost of resource use through resource generation.`,
  },
  [Pattern.Commons]: {
    title: PatternToDisplay[Pattern.Commons],
    problem: `Digital space is becoming privatized. The processes of commons enclosure that produced private property for the few and destitution for the many is repeating. We must build forms of social organization that transcend the binary between the market and the state. The current system gives us few options, caught as we are between the  surveillance state and surveillance capitalism. `,
    solution: `We must reclaim the commons, and steward shared digital space with shared responsibility. Governing a resource like a commons means ensuring sustainable use; allowing for the maximum amount of shared benefit while preserving the resource for the future. Through commoning, the walled digital gardens of the metaverse will give way to the open community gardens of the pluriverse.`,
  },
  [Pattern.MaintenanceAndCare]: {
    title: PatternToDisplay[Pattern.MaintenanceAndCare],
    problem: `Building the pathways for connected worlds and enabling the proliferation of difference is not enough. These pathways and alternative worlds will fall into disrepair or co-optation without the necessary work of deep maintenance and care, and the responsibility that goes along with this ethos.`,
    solution: `We must not only build the new, but sustain it; we must not only push for progress, but protect it. The work of maintenance and care is practical work: the work of keeping codebases updated, feedback incorporated, and communities informed. This ethic  also, importantly, must extend to the non-technical realm—with the institutions, resourcing support, and space necessary to enable maintenance and repair.`,
  },
};

export interface Principle {
  title: string;
  problem: string;
  solution: string;
}
