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
    body: `We cannot allow siloed platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets. We must recognize these attempts as enforcing digital scarcity where there could be digital abundance.`,
  },
  [Pattern.Agency]: {
    title: Pattern.Agency,
    body: `We cannot allow siloed platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets. We must recognize these attempts as enforcing digital scarcity where there could be digital abundance.`,
  },
  [Pattern.Regeneration]: {
    title: Pattern.Regeneration,
    body: `We cannot allow siloed platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets. We must recognize these attempts as enforcing digital scarcity where there could be digital abundance.`,
  },
  [Pattern.Privacy]: {
    title: Pattern.Privacy,
    body: `We cannot allow siloed platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets. We must recognize these attempts as enforcing digital scarcity where there could be digital abundance.`,
  },
  [Pattern.Voice]: {
    title: Pattern.Voice,
    body: `We cannot allow siloed platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets. We must recognize these attempts as enforcing digital scarcity where there could be digital abundance.`,
  },
  [Pattern.EngagementAndAttention]: {
    title: Pattern.EngagementAndAttention,
    body: `We cannot allow siloed platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets. We must recognize these attempts as enforcing digital scarcity where there could be digital abundance.`,
  },
  [Pattern.Commons]: {
    title: Pattern.Commons,
    body: `We cannot allow siloed platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets. We must recognize these attempts as enforcing digital scarcity where there could be digital abundance.`,
  },
};

export interface Principle {
  title: string;
  body: string;
}
