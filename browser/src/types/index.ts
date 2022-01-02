import { Pattern } from "../types/common/server-api";

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

export const Principles: Record<
  Exclude<Pattern, Pattern.Pluriverse>,
  Principle
> = {
  [Pattern.Interoperability]: {
    title: Pattern.Interoperability,
    body: `The many worlds of the pluriverse must be connected. We cannot allow walled garden platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets, this is merely an attempt to enforce digital scarcity where there was once digital abundance.

Meaningful interoperability will be both technical and institutional; the data moats of today will give way to the portable social graphs and cooperative data structures of tomorrow. We will reconstitute interoperability as building pathways and connections between rich universes, cross-pollinating relationships and knowledge across modalities of communication
`,
  },
  [Pattern.Agency]: {
    title: Pattern.Agency,
    body: `The many worlds of the pluriverse must be connected. We cannot allow walled garden platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets, this is merely an attempt to enforce digital scarcity where there was once digital abundance.

Meaningful interoperability will be both technical and institutional; the data moats of today will give way to the portable social graphs and cooperative data structures of tomorrow. We will reconstitute interoperability as building pathways and connections between rich universes, cross-pollinating relationships and knowledge across modalities of communication
`,
  },
  [Pattern.Regeneration]: {
    title: Pattern.Regeneration,
    body: `The many worlds of the pluriverse must be connected. We cannot allow walled garden platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets, this is merely an attempt to enforce digital scarcity where there was once digital abundance.

Meaningful interoperability will be both technical and institutional; the data moats of today will give way to the portable social graphs and cooperative data structures of tomorrow. We will reconstitute interoperability as building pathways and connections between rich universes, cross-pollinating relationships and knowledge across modalities of communication
`,
  },
  [Pattern.Privacy]: {
    title: Pattern.Privacy,
    body: `The many worlds of the pluriverse must be connected. We cannot allow walled garden platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets, this is merely an attempt to enforce digital scarcity where there was once digital abundance.

Meaningful interoperability will be both technical and institutional; the data moats of today will give way to the portable social graphs and cooperative data structures of tomorrow. We will reconstitute interoperability as building pathways and connections between rich universes, cross-pollinating relationships and knowledge across modalities of communication
`,
  },
  [Pattern.Voice]: {
    title: Pattern.Voice,
    body: `The many worlds of the pluriverse must be connected. We cannot allow walled garden platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets, this is merely an attempt to enforce digital scarcity where there was once digital abundance.

Meaningful interoperability will be both technical and institutional; the data moats of today will give way to the portable social graphs and cooperative data structures of tomorrow. We will reconstitute interoperability as building pathways and connections between rich universes, cross-pollinating relationships and knowledge across modalities of communication
`,
  },
  [Pattern.EngagementAndAttention]: {
    title: Pattern.EngagementAndAttention,
    body: `The many worlds of the pluriverse must be connected. We cannot allow walled garden platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets, this is merely an attempt to enforce digital scarcity where there was once digital abundance.

Meaningful interoperability will be both technical and institutional; the data moats of today will give way to the portable social graphs and cooperative data structures of tomorrow. We will reconstitute interoperability as building pathways and connections between rich universes, cross-pollinating relationships and knowledge across modalities of communication
`,
  },
  [Pattern.Commons]: {
    title: Pattern.Commons,
    body: `The many worlds of the pluriverse must be connected. We cannot allow walled garden platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets, this is merely an attempt to enforce digital scarcity where there was once digital abundance.

Meaningful interoperability will be both technical and institutional; the data moats of today will give way to the portable social graphs and cooperative data structures of tomorrow. We will reconstitute interoperability as building pathways and connections between rich universes, cross-pollinating relationships and knowledge across modalities of communication
`,
  },
};

export interface Principle {
  title: string;
  body: string;
}
