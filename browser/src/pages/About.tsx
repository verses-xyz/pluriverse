import { useContext } from "react";
import ContributionsCarousel from "src/components/ContributionsCarousel";
import { ContributionsContext } from "src/helpers/contexts/ContributionsContext";
import { Contribution } from "src/types/common/server-api";

const CoreStewardContributionIds = [43, 18, 42];

export function About() {
  const { contributions } = useContext(ContributionsContext);
  const stewardContributions: Contribution[] = CoreStewardContributionIds.map(
    (cId) => contributions.find((c) => c.id === cId)
  ).filter((c): c is Contribution => c !== undefined);

  return (
    <div className="container w-full pb-20 mx-auto px-2">
      <div className="container w-full md:max-w-2xl mx-auto">
        <h2 className="font-title text-3xl pt-16 font-bold pb-3">The Story</h2>
        <p>
          This artifact is a follow-up to{" "}
          <a href="https://www.interdependence.online/">
            A Declaration of the Interdependence of Cyberspace
          </a>
          , where we introduce the term “pluriverse” and apply it to cyberspace.
          After the creation of the Declaration, its core stewards were joined
          by others who were moved by the vision of that artifact, and together,
          formed <a href="https://verses.xyz/">Verses</a>. We are a
          multidisciplinary arts and research collective co-imagining,
          practicing, and building a commonly-held digital future.
        </p>
        <p>
          We believe that precise language is powerful and crucial: it helps
          orient us towards new possibilities; it gives us handles for what we
          are experiencing; it allows us to dream. Understanding the terms we
          use matters.
        </p>
        <p>
          In this artifact, we trace the origin of the term “pluriverse”, and
          propose it as a values-laden alternative to “metaverse” to guide us in
          building a digital world that enables conviviality and a deep
          ‘aliveness’.
        </p>
        <p>
          By signing the ‘terms of use’, you offer your support for the spirit
          of this work and acknowledge your understanding of the term
          ‘pluriverse’. We hope that this invites you to join the broader effort
          to co-create a digital pluriverse: a world where many worlds may fit.
        </p>
        <p>
          Our intent with the second part of this artifact is to seed a pattern
          language for the pluriverse. The influential 1977 urban design text{" "}
          <em>A Pattern Language</em> was authored to give ordinary people, not
          merely professionals, the ability to shape their lived environment for
          increased community viability. It has been highly influential in
          software, and helped inspire the world’s first wiki.
        </p>
        <h2 className="font-title text-3xl pt-16 font-bold pb-3">The Space</h2>
        <p>
          We have{" "}
          <a href="https://github.com/verses-xyz/pluriverse">
            open-sourced our work
          </a>{" "}
          to share infrastructure in enabling others to build a pattern language
          around their own principles and inspiring other artifacts in this
          space. We are extremely excited for others to fork this codebase and
          seed their own pattern languages to help their community members build
          a liveable and alive digital world for themselves.
        </p>
        <p>
          Right now, signatures and contributions submitted go through a central
          server and are primarily stored and served from our database. The
          essay content and the signatures are both stored on the permaweb on
          Arweave for the public commons. Signatures are associated with the
          essay, which is automatically versioned on any changes to the essay
          file in the Github.
        </p>
        {/* TODO: fill in ideal <p></p> */}
        <p>
          We are working on acknowledgement tokens, reflective of the
          contribution universes and personalized to contributions, for everyone
          who engages with this artifact for a later release. We are interested
          in enabling broader communities of philosophical, political, and good
          faith discourse and engagement around our artifacts; this is one
          experiment towards that end. We hope these tokens can be a playful yet
          serious representation of the commitment to building the pluriverse
          together, distribute ownership of our personal contributions, and
          encourage reciprocity in the sharing of different worlds with each
          other.
        </p>
        <h2 className="font-title text-3xl pt-16 font-bold pb-3">
          The Patterns
        </h2>
        <p>
          Please help expand this pattern language. While abstract patterns are
          useful, examples are crucial to understand how to bring them to
          reality: concrete illustrations, historical analogues, and specific
          visions for the future. We ask you to{" "}
          <a href="/#contribute">contribute to these examples</a>. For
          reference, see <a href="/contributions">all the contributions</a> by
          the community. If you have ideas for other patterns that we should
          consider adding, please join our{" "}
          <a href="https://t.me/+3nysH7Ja6pszZWI5">Telegram</a> and give us
          feedback!
        </p>
        <p>
          If you would like to contribute in modes not afforded to you by the
          technological pathways in the present artifact (for ex. by
          contributing additional patterns) please reach out to us with a note,
          or send us a shout on{" "}
          <a href="https://twitter.com/verses_xyz">Twitter</a>. We hope to build
          in broader direct contribution mechanisms in the future, but are still
          thinking through architecture, moderation, and curation.
        </p>
        {/* TODO: INSERT SAMPLE PATTERN CARD */}
        <h2 className="font-title text-3xl pt-16 font-bold pb-3">
          The Process
        </h2>
        <p>
          To echo the sentiment we expressed in{" "}
          <a href="https://www.interdependence.online/about">
            the Process of the Declaration
          </a>
          : we owe debts to communities that we are part of, teachers who have
          guided us, and ancestors in various lineages that we now steward. This
          work is thus a gift from many to many.
        </p>
        <p>
          The most important debt to acknowledge is those historical and present
          communities who have helped theorize, concretize, and enact the
          pluriverse. We also wish to acknowledge recent and contemporary work
          that we drew inspiration from in our work, including the{" "}
          <a href="https://getdweb.net/principles/">DWeb principles</a>,{" "}
          <a href="https://kernel.community/en/">kernel.community</a>, and more.
        </p>
        <p>
          We are deeply grateful to <a href="https://gitcoin.co/">Gitcoin</a>{" "}
          and <a href="https://fil.org/">Filecoin Foundation</a> for their
          support of this work.
        </p>
        <div className="text-center">
          <h3 className="font-title text-3xl pt-16 pb-0 text-center pb-2">
            stewards 🌱
          </h3>
          <p className="pt-0 italic text-lg">
            <a href="https://www.spencerchang.me/">Spencer Chang</a> ·{" "}
            <a href="https://alejandro.pe/">Alejandro García Salas</a> ·{" "}
            <a href="https://twitter.com/divyasiddarth?lang=en">
              Divya Siddarth
            </a>{" "}
            · <a href="https://jasminew.me/">Jasmine Wang</a> ·{" "}
            <a href="https://jzhao.xyz/">Jacky Zhao</a>
          </p>
        </div>
      </div>
      {/* <div className="container lg:pl-40 xl:pl-60">
        <ContributionsCarousel contributions={stewardContributions} />
      </div> */}
    </div>
  );
}
