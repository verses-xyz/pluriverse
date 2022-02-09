import { useContext } from "react";
import { ContributionCard } from "src/components/ContributionCard";
import { ContributionsContext } from "src/helpers/contexts/ContributionsContext";
import { Contribution } from "src/types/common/server-api";
import Footnote from "../components/Footnote";

// TODO: fill this in.
const CoreStewardContributionIds = [
  213, 19, 206, 209, 24, 216, 36, 28, 174, 88, 220, 34, 35, 47, 49, 125, 73, 87,
  80,
];

export function About() {
  const { contributions } = useContext(ContributionsContext);
  const stewardContributions: Contribution[] = CoreStewardContributionIds.map(
    (cId) => contributions.find((c) => c.id === cId)
  ).filter((c): c is Contribution => c !== undefined);

  return (
    <div>
      <div className="container w-full md:px-0 md:max-w-2xl mx-auto pb-6 md:pb-12 px-4 md:px-8">
        <h2 className="font-title text-3xl pt-12 md:pt-16 font-bold pb-3">
          About This Artifact
        </h2>
        <p>
          We created this artifact with the hope that collaborative dialogue and
          action centered on pluriversality can offer an alternative to the
          digital monocultures of the present, and help catalyze an ecosystem
          strategy towards meaningful digital interdependence. We share this
          call as a beginning, not as an end; we recognize that change does not
          and cannot come from language alone. We hope to contribute, in
          community and in the ecosystem, to a clearer set of technologies,
          infrastructures, institutions, and processes that realize the ethic of
          the pluriverse in the concrete and material.
        </p>
        <p>
          Signing the ‘terms of support’ is an offer of support for the spirit
          of this work— by signing, you join the broader ‘we’ that the essay
          defines and gathers around. Your signature is associated only with the
          essay and your contributions to the patterns. We humbly hope that this
          document, accompanied by your signature, acts as a gathering place,{" "}
          <Footnote
            left
            data={
              <>
                Originated by Star and Griesemer,{" "}
                <a href="https://en.wikipedia.org/wiki/Boundary_object#cite_note-1">
                  a boundary object “is information used in different ways by
                  different communities”
                </a>
                . Boundary objects are “plastic, interpreted differently across
                communities but with enough immutable content (i.e., common
                identity across social words and contexts) to maintain
                integrity.
              </>
            }
          >
            boundary object
          </Footnote>
          , and seed of a broader network of online and offline endeavors of
          cooperation, deliberation, and material redistribution.
        </p>
        <h2 className="font-title text-3xl pt-8 md:pt-16 font-bold pb-3">
          Context and Debts
        </h2>
        <p>
          This artifact builds on and extends{" "}
          <a href="https://www.interdependence.online/about">
            A Declaration of the Interdependence of Cyberspace
          </a>
          , and is offered by <a href="https://verses.xyz/">Verses</a>, which
          formed after the creation of the Declaration by core stewards and
          supporters of the artifact.
        </p>
        <p>
          We are a multidisciplinary art, technology, and research collective
          co-imagining, practicing, and building a commonly-held digital future.
          We have established some baseline operating principles alongside the
          creation of this second artifact:
        </p>
        <ul>
          <li>All our technical work will be open-source;</li>
          <li>
            We are governed democratically—every member of Verses holds one
            non-transferable, non-financialized governance token that allows for
            voting on core questions, including the resourcing of work;
          </li>
          <li>
            Governance rights are granted based on participation across various
            value streams in Verses,{" "}
            <Footnote
              topOffset={-150}
              data={
                <>
                  See <a href="https://elements.disco.coop/">DisCO Elements</a>;{" "}
                  <a href="https://hypha.coop/dripline/emergent-practices/">
                    Hypa Co-operative
                  </a>{" "}
                  summarizes takeaways that inspire us: “The project released a
                  report in late 2020 called DisCO Elements, which maps out
                  three types of “value streams” — livelihood work, love work,
                  and care work. Livelihood work is the labor that creates the
                  income for a project, for example, contract work commissioned
                  by a client. Love work is the pro bono work that is done to
                  benefit the community at large by contributing to the commons.
                  For example, publishing an organizational handbook publicly so
                  others can learn how to manage a cooperative. And finally care
                  work is all the labor that goes into supporting members of a
                  project, such as the administrative work of organizing
                  documents, schedules, and processes. By explicitly naming
                  these three value streams, the DisCO Project seeks to make
                  visible all the types of labor that go into sustaining
                  values-driven projects. Whereas livelihood work is usually the
                  only labor that is most highly compensated, they stress that
                  these other types of work are equally vital.”
                </>
              }
            >
              including livelihood, love, and care work
            </Footnote>
            ;
          </li>
          <li>
            <a href="https://bank.hackclub.com/verses">
              The entirety of our funds are held and spent by a 501(c)3 context
            </a>
            . Our work is made possible via grants; we exercise philosophical
            and creative independence.
          </li>
        </ul>
        <p>
          To echo the sentiment we expressed in{" "}
          <a href="https://www.interdependence.online/about">
            the Process of the Declaration
          </a>
          : we owe debts to communities that we are part of, teachers who have
          guided us, and ancestors in various lineages that we now hope to
          co-steward, as well as future collaborators who will continue to shape
          us. This work is thus a living gift from many to many.{" "}
        </p>
        <p>
          The most immediate debt to acknowledge is to those who have helped
          theorize, concretize, and enact the pluriverse: a few among the many
          to whom we owe deep intellectual and material debts are the
          Zapatistas, indigenous movements across Latin America and activists
          from the anti-globalization struggles, and theorists advocating for
          <Footnote
            left
            data={
              <>
                We particularly pull from the work of Arturo Escobar and Walter
                Mignolo; we have also pulled from Aníbal Quijano’s work on
                Eurocentrism.
              </>
            }
          >
            epistemic pluralism
          </Footnote>
          . We recognize that the{" "}
          <Footnote
            data={
              <>
                Eve Tuck’s <em>Decolonization is not a Metaphor</em> criticizes
                the use of “decolonization” in a metaphorical sense (e.g.
                “decolonizing the museum” through diversity initiatives),
                arguing that such an appropriation of the term dilutes its
                original intention as a call by Indigenous peoples to physically
                decolonize real land. We understand that
                polycentric-world-building is an endeavor that has been
                undertaken historically in highly physical ways.
              </>
            }
          >
            pluriverse is not a metaphor
          </Footnote>
          ; any extension of the ethic of the pluriverse to the digital realm
          must be historically contextualized, although we have work to do
          before we can do justice to this language of material impact.
        </p>
        <p>
          We also wish to acknowledge recent and contemporary work that we drew
          inspiration from, including the{" "}
          <a href="https://getdweb.net/principles/">DWeb principles</a>,{" "}
          <a href="https://kernel.community/en/learn/">kernel.community text</a>
          , the{" "}
          <a href="https://uwcc.wisc.edu/about-co-ops/cooperative-principles/">
            cooperative principles
          </a>
          , the{" "}
          <a href="https://www.eff.org/fight">
            Electronic Frontier Alliance principles
          </a>
          , and many others. This list is in no way exhaustive; there are many
          others whose thoughts, work, and experiences have significantly
          figured this work.
        </p>
        <p>
          We are also deeply grateful to Gitcoin and Protocol Labs for
          supporting the labour that went into this artifact. We operate
          transparently via our fiscal host, Hack Club Bank. You can view our
          Hack Club Bank page{" "}
          <a href="https://bank.hackclub.com/verses">here.</a>
        </p>
        <h2 className="font-title text-3xl pt-8 md:pt-16 font-bold pb-3">
          Contributions
        </h2>
        <p>
          Our intent with the second part of this artifact is to seed a{" "}
          <Footnote
            data={
              <>
                The term was coined by architect{" "}
                <a href="https://en.wikipedia.org/wiki/Christopher_Alexander">
                  Christopher Alexander
                </a>{" "}
                and popularized by his 1977 book{" "}
                <a href="https://en.wikipedia.org/wiki/A_Pattern_Language">
                  <em>A Pattern Language</em>
                </a>{" "}
                (from Wikipedia).
              </>
            }
          >
            pattern language
          </Footnote>{" "}
          for the pluriverse.
        </p>
        <p>
          We aim to support meaningful change by consolidating community
          insight, and hope that individuals and communities gathering around
          these patterns are inspired not only by the text, but also by the
          enactments, commitments, and observations as captured via community
          contribution cards. Free text contributions of any kind are welcome;
          we are especially excited by the following kinds of contributions:
        </p>
        <ul>
          <li>
            <strong>
              Instances of technological or institutional design that illustrate
              an implementation of the pattern.
            </strong>{" "}
            For example, DAO governance tools that combine on-chain voting with
            off-chain discussion, deliberation, and consensus-building
            illustrates a concrete set of technical infrastructure for the
            pattern of ‘Voice.’
          </li>
          <li>
            <strong>
              Specific examples of ecosystem players embodying the pattern in
              question.
            </strong>{" "}
            For example, contributing an example of ‘Regeneration’ through
            public goods funding by Gitcoin.
          </li>
          <li>
            <strong>
              Commitments by individuals and organizations to ongoing and future
              operationalizations of pluriversal patterns.
            </strong>{" "}
            For example, under ‘Maintenance and Care’, we (as Verses) contribute
            our plan for maintenance and care of this artifact.
          </li>
          <li>
            <strong>
              Contributions of historical analogues to pluriversal pattern
              languages, either within or outside of the realm of cyberspace.
            </strong>{" "}
            For example, a contribution that points to how railroad
            interoperability gave rise to modern cross-country transportation as
            an empirical example of ‘Interoperability’ as a historically
            deployed pattern.
          </li>
          <li>
            <strong>Specific visions for the future.</strong> For example, under
            ‘Commons’, a contribution that imagines community networks where
            local networks (Internet Service Providers) are operated by the
            communities that use them.
          </li>
        </ul>
        <p>
          We have <a href="https://github.com/verses-xyz">open-sourced</a> all
          our work to share our infrastructure and process. We are excited about
          the potential of pattern languages for enabling communities to define
          their own values in ways that are participatory, repairable,
          maintainable, and evolving, and apply principles to concrete
          organizational and technological decisions. We hope that this
          infrastructure can contribute to that process across communities and
          ecosystems, and that its inherent adaptiveness is particularly
          well-suited to emergent new forms of organization aided in part by new
          technical primitives.
        </p>
        <p>
          If you think a pattern is missing, please suggest one via{" "}
          <a href="https://coda.io/form/Pluriverse-Pattern-Suggestions_d8bd1tZbO5Q">
            this form
          </a>
          !
        </p>
        <h2 className="font-title text-3xl pt-8 md:pt-16 font-bold pb-3">
          Technology
        </h2>
        <p>
          We acknowledge tensions between how this artifact is implemented and
          the pluriversal ethic we put forward. We believe that{" "}
          <Footnote
            data={
              <>
                Langdon Winner argues in <em>Do Artifacts Have Politics</em>?
                that “certain technologies <em>in themselves</em> have political
                properties”, and that the viewer of any technical artifact
                should “notice the social circumstances of the development,
                deployment, and use” (122). Technical arrangements order
                relationships, and create social effects; usually these effects
                favor certain social interests even if not intentionally. A
                stronger claim is that “the adoption of a given technical system
                unavoidably brings with it conditions for human relationships
                that have a distinctive political cast– for example, centralized
                or decentralized, egalitarian or inegalitarian, repressive or
                liberating” (128).
              </>
            }
          >
            artifacts have politics
          </Footnote>
          : that to use a piece of technology, defined as a means to some ends,
          is to implicitly endorse it as a path. We thus aim to make explicit
          our technical choices, their implications and limitations, and point
          to alternatives that are being developed and explored. One lineage we
          view ourselves to be part of is that of{" "}
          <Footnote
            left
            data={
              <>
                See the work of <em>New Inquiry’s</em> definition of{" "}
                <a href="https://thenewinquiry.com/dark-inquiry/">
                  rhetorical software
                </a>
                .
              </>
            }
          >
            ‘Rhetorical Software’
          </Footnote>
          —interventions that enact their values, instead of merely stating
          them. We aim to be intentional and aware of the technical ecosystem we
          rely on as we both engage with and hope to change it.
        </p>
        <p>
          We prioritized open source software and tooling that the core team was
          familiar with, in the spirit of quickly bringing the artifact to life.
          We store signatures and contributions on a central server, and upload
          the essay text and signatures to{" "}
          <Footnote
            data={
              <>
                Unlike other blockchains, Arweave does not require a significant
                expenditure of electricity to maintain its integrity, and uses
                proof of access as a consensus mechanism. Instead of burning
                compute and electricity on unrelated cryptographic problems,
                Arweave incentivizes positive externalities like maximizing the
                number of replications of the data held in the system. As
                Arweave grows in size, the amount of electricity expended while
                mining <em>decreases</em>.{" "}
                <a href="https://www.arweave.org/yellow-paper.pdf">
                  https://www.arweave.org/yellow-paper.pdf
                </a>
              </>
            }
          >
            Arweave
          </Footnote>
          , to ensure they are recorded in a space that is public, immutable,
          and can be independently verified by readers. Since there may be
          edits, signatures are associated with exact versions of the essay,
          which are automatically re-uploaded and versioned on Arweave whenever
          updated on{" "}
          <Footnote
            left
            data={
              <>
                Our repo has a{" "}
                <a href="https://github.com/verses-xyz/arweave-publish-action">
                  Github action
                </a>{" "}
                that watches for changes to the file containing our essay and if
                there are changes, uploads a new version of that file to
                Arweave. Signatures are automatically associated with the latest
                version of the essay found on Arweave.
              </>
            }
          >
            Github
          </Footnote>
          .{" "}
        </p>
        <p>
          We would like to address the intentions behind several specific
          choices:
        </p>
        <ul>
          <li>
            <strong>Web3/blockchain technology:</strong> We employ these
            technologies to imagine their uses and possibilities in a
            pluriversal direction. We use wallet signing to recognize its place
            as a rising form of decentralized identity, but also to establish it
            as a way of offering non-commodifiable and non-financialized gifts
            and contributions. This stands in contrast to existing applications
            of blockchain technology, which often emphasize speculation, and
            create artificial scarcities of capital and attention. Our use of
            Web3 technology is not strictly necessary (given the existence of
            other verification methods like PGP and local keyrings), but we find
            that it can be a compelling foundation for pluriversal projects,
            given its broad adoption and open accessibility.{" "}
          </li>
          <li>
            <strong>Usage of web2/platform technology:</strong> We use a
            centralized server to mirror content to Arweave and maintain an
            accessible index of signatures, given that the ecosystem for
            decentralized hosting and application services is nascent, and to
            allow us to release an artifact in a timely manner. Some
            decentralized alternatives that we would like to highlight include{" "}
            <a href="https://ipfs.io/">IPFS</a> and{" "}
            <a href="https://docs.ipfs.io/concepts/ipns/">IPNS</a> for frontend
            hosting, and <a href="https://hypercore-protocol.org/">Hypercore</a>{" "}
            for maintaining a decentralized backend.
          </li>
          <li>
            <strong>Usage of platform services for distribution:</strong> We
            have used Twitter for distribution and Google Docs for coordination
            in the process of seeding this artifact. While these are, at
            present, the most familiar and accessible technologies available for
            the task at hand, we hope this will not always be the case and
            intend to support initiatives to build user-controlled and
            democratically-governed alternatives.
          </li>
        </ul>
        <p>
          In order to recognize the labor and thinking that is required to
          contribute a card and in the spirit of interoperability and ownership,
          we are working on{" "}
          <Footnote
            left
            topOffset={-140}
            data={
              <>
                We are interested in moving beyond financialized usages of
                crypto; some relevant thought here by Vitalik:{" "}
                <a href="https://vitalik.ca/general/2022/01/26/soulbound.html">
                  https://vitalik.ca/general/2022/01/26/soulbound.html
                </a>
                . We also recognize that engagement via tokens is, almost
                exactly that: a “token” engagement. We are thus interested in
                what these tokens might <em>enable</em>, other than
                participation in financial upside. In
                <em>Cryptoeconomics as a Limitation on Governance</em>, Nathan
                Schneider cites a concern shared by the Zapatistas that the
                “‘neoliberal’ aspiration for economics to guide all aspects of
                society represents a threat to democratic governance and human
                personhood itself” (3). We are interested in enabling broader
                communities of discourse and engagement around philosophy,
                politics, power, capital, and technology; these tokens are
                potentially one experiment towards that end.
              </>
            }
          >
            non-financializable
          </Footnote>
          , free-to-claim acknowledgement tokens for everyone who contributes to
          this pattern language for a pluriverse. These tokens will be a{" "}
          <Footnote
            data={
              <a href="https://kernel.community/en/learn/module-7/the-gift/ ">
                https://kernel.community/en/learn/module-7/the-gift/{" "}
              </a>
            }
          >
            gift
          </Footnote>
          .
        </p>
        <div className="text-center">
          <h3 className="font-title text-3xl pt-8 md:pt-16 pb-0 text-center pb-2">
            stewards 🌱
          </h3>
          <p className="pt-0 text-xl">
            <a href="https://www.spencerchang.me/">Spencer Chang</a> ·{" "}
            <a href="https://alejandro.pe/">Alejandro García Salas</a> ·{" "}
            <a href="https://twitter.com/divyasiddarth?lang=en">
              Divya Siddarth
            </a>{" "}
            · <a href="https://jasminew.me/">Jasmine Wang</a> ·{" "}
            <a href="https://jzhao.xyz/">Jacky Zhao</a>
          </p>
          <p className="!text-left">
            The above people stewarded this artifact to completion, but so many
            have given attention and care to making this piece a reality. A
            gallery of those contributors' cards lie below.
          </p>
        </div>
      </div>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center mx-auto max-w-max gap-6 mt-2 mb-8">
        {stewardContributions.map((contribution) => (
          <ContributionCard contribution={contribution} key={contribution.id} />
        ))}
      </div>
    </div>
  );
}
