export function About() {
  return (
    <div>
      <div className="container w-full md:max-w-2xl mx-auto pb-20">
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
        {/* <p>
        [tk technical choices - we used Arweave, implemented with this
        infrastructure, etc. here are the decisions we made, their limitations,
        what we would hope to be able to say. We are open-sourcing our work,
        here is our Github]
      </p> */}
        {/* <ul>
        <li>
          <p>React three fiber</p>
        </li>
        <li>
          <p>More details in our readme!</p>
        </li>
      </ul> */}
        <p>
          We have{" "}
          <a href="https://github.com/verses-xyz/pluriverse">
            open-sourced our work
          </a>{" "}
          to share infrastructure and enable others to build a pattern language
          around their own principles. We are extremely excited for others to
          fork this codebase and seed their own pattern languages to help their
          community members build a liveable and alive digital world for
          themselves.
        </p>
        <p>
          Right now, the data that is submitted is stored on a centralized
          server, which means every community that wants to create their own
          pattern languages needs to spin up and run their own server. We’d have
          liked to build this in a serverless way and cover hosting fees, as we
          did with the Declaration, but were unable to do so given the resource
          constraints of our team. We hope to make this infrastructure more
          community-friendly in our next iteration.
        </p>
        <p>
          We are working on acknowledgement tokens, reflective of the
          contribution universes, for everyone who engages with this artifact
          for a later release. We are interested in enabling broader communities
          of philosophical, political, and good faith discourse and engagement
          around our artifacts; this is one experiment towards that end.
        </p>
        <h2 className="font-title text-3xl pt-16 font-bold pb-3">
          The Patterns
        </h2>
        <p>
          Please help expand this pattern language. While abstract patterns are
          useful, examples are crucial to understand how to bring them to
          reality: concrete illustrations, historical analogues, and specific
          visions for the future. It is these examples that we ask you to
          <a href="/#contribute">contribute</a>. For reference, see{" "}
          <a href="/contributions">all the contributions</a> by the community.
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
          The Patterns
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
          <a href="https://getdweb.net/principles/">DWeb principles</a>,
          <a href="https://kernel.community/en/">kernel.community</a>, and more.
        </p>
        <p>
          We are deeply grateful to <a href="https://gitcoin.co/">Gitcoin</a>{" "}
          and <a href="https://fil.org/">Filecoin Foundation</a> for their
          support of this work.
        </p>
      </div>
    </div>
  );
}
