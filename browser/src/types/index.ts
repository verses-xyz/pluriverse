// TODO: fill in
export enum Pattern {
  Interoperability = "Interoperability",
}

export const Principles: Record<Pattern, Principle> = {
  [Pattern.Interoperability]: {
    title: "Interoperability",
    body: `The many worlds of the pluriverse must be connected. We cannot allow walled garden platforms to sever or stymie the highways and networks between worlds. Nor can we accept their definition of interoperability as the movement of private property and monetized assets, this is merely an attempt to enforce digital scarcity where there was once digital abundance.

Meaningful interoperability will be both technical and institutional; the data moats of today will give way to the portable social graphs and cooperative data structures of tomorrow. We will reconstitute interoperability as building pathways and connections between rich universes, cross-pollinating relationships and knowledge across modalities of communication
`,
  },
};

export interface Principle {
  title: string;
  body: string;
}
