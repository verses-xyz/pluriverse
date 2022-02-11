import "./EssayBody.css";
import Footnote from "./Footnote";
import SectionDivider from "./SectionDivider";

export function EssayBody() {
  return (
    <>
      {/* TODO: refactor the article tag out so it includes the hero. for now let's have this invisible h1 for screen readers */}
      <h1 style={{ display: "none" }}>Towards a Digital Pluriverse</h1>
      <p className="pt-8 subhead">
        We are told that the age of the{" "}
        <Footnote
          topOffset={5}
          data={
            <>
              Coined by the American author Neal Stephenson in his novel,{" "}
              <em>Snow Crash</em>, ‘the Metaverse’ refers to a virtual reality
              integrated networks that can be used for work and play. The term
              became ubiquitous in public discourse in 2021 following the
              announcement from Facebook founder, Mark Zuckerberg, of the
              company’s name change to ‘Meta’ and the company’s investment into
              building a metaverse.
            </>
          }
        >
          Metaverse
        </Footnote>{" "}
        is upon us.{" "}
      </p>
      <p>
        The profiteers of this age promise digital freedom through technology.
        This is not the first such promise.
      </p>
      <p>
        Web 1.0 promised a new horizon of digital space: open, transparent,
        co-created, and interoperable. In many ways, it delivered, laying the
        foundation for the foundational protocols, shared standards, and open
        licenses that make the Internet we know possible. And yet,{" "}
        <Footnote
          left
          topOffset={-180}
          data={
            <>
              Moxie Marlinspike, creator of Signal,{" "}
              <a href="https://moxie.org/2022/01/07/web3-first-impressions.html">
                claims
              </a>{" "}
              that centralization emerged because of two primary reasons. First,
              “people don’t want to run their own servers, and never will”.
              Second, “a protocol moves much more slowly than a platform .. if
              something is truly decentralized it becomes very difficult to
              change.” Marlinspike found that “Metamask needs to interact with
              the blockchain, but the blockchain has been built such that
              clients like MetaMask can’t interact with it. So like my dApp,
              Metamask accomplishes this by making API calls to three companies
              that have consolidated in this space”; he concludes that Ethereum
              has “been built with many of the same implicit trappings as web1”,
              and that “we should expect this kind of platform consolidation to
              happen”. He calls for “systems that can distribute trust [via
              cryptography] without having to distribute infrastructure”, and to
              “reduce the burden of building software”.
            </>
          }
        >
          inaccessible to most
        </Footnote>{" "}
        and publicly underfunded, Web 1.0’s growth brought with it fracturing
        and commercialization.
      </p>
      <p>
        <Footnote
          topOffset={-140}
          data={
            <>
              The growth of the blogosphere, open photo sharing, forums, and
              discussion spaces heralded great hopes about the democratization
              potential of the new web. Returning to documents like Tim
              O’Reilly’s 2005 ‘
              <a href="https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html?page=2">
                What is Web2.0
              </a>
              ’ is eerily reminiscent of recent discourse. For example:
              “BitTorrent thus demonstrates a key Web 2.0 principle:{" "}
              <em>automatically gets better the more people use it</em>. While
              Akamai must add servers to improve service, every BitTorrent
              consumer brings his own resources to the party. There's an
              implicit "architecture of participation", a built-in ethic of
              cooperation, cooperation, in which the service acts primarily as
              an intelligent connecting the edges to each other and harnessing
              the power of the users themselves.”
            </>
          }
        >
          {" "}
          Web 2.0 began with its own aspiration to democratization:
          proliferating personal websites, distributed network effects, and
          utopian dreams of global communication.
        </Footnote>{" "}
        These dreams did come to pass; connectedness flourished. And yet, this
        success was achieved through centralized platform ownership and the
        building of walled gardens that now dictate the terms of online life.
      </p>
      <p>
        And now there are new dreams. The Metaverse, championed by Facebook (now
        Meta Platforms, Inc.) and their peers, allows and celebrates monopoly of
        digital space,{" "}
        <Footnote
          left
          topOffset={-80}
          data={
            <>
              While a collective approach may take on various forms, at its
              center it is an approach driven by community solidarity, group
              ownership, and an open commons. In <em>Caliban and the Witch</em>,
              Silvia Federici links land privatization to a breakdown of social
              relationships. Discussing the transformation of agricultural
              structure and labor in 16th-century England following land
              enclosures and the loss of the commons, Federici writes that
              communities lost sense of their social relations – “families
              disintegrated, the youth left the village to join the increasing
              number of vagabonds or itinerant workers…while the elderly were
              left to fend for themselves” (72). This was in stark (and
              disappointing) contrast to the rich social relations that existed
              in the commons, where peasant solidarity and sociality thrived and
              women, although possessing little social power, could experience
              autonomy.
            </>
          }
        >
          taking what was once collective
        </Footnote>{" "}
        and ensuring it is privatized and parcelled out to the highest bidder.
        Their Metaverse expands as a{" "}
        <Footnote
          topOffset={-20}
          data={
            <>
              In agriculture, monoculture refers to the cultivation of a
              singular crop in an area. Though monocultures may be efficient,
              they are more susceptible to disease and pests. In{" "}
              <em>
                Braiding Sweetgrass: Indigenous Wisdom, Scientific Knowledge,
                and the Teachings of Plants
              </em>
              , Indigenous scholar and botanist, Robin Kimmerer, shares the
              story of the Three Sisters to advocate for polycultures over
              monocultures. Three Sisters, a gardening style of Native peoples,
              refers to the interdependent relationship between species of corn,
              squash, and beans. Although each of the species have different
              needs and growth patterns, they work alongside each other in a
              holistic ecosystem of growth.{" "}
              <strong>
                Kimmerer imagines this harmonious agricultural system as a
                metaphor for intellectual and social relations: she writes that
                “the Three Sisters offer us a new metaphor for an emerging
                relationship between indigenous knowledge and Western science”,
                as well as functions as a model of care in which individuals use
                their unique gifts to “take care of each other [and] work
                together.” (208, ebook).
              </strong>{" "}
            </>
          }
        >
          homogenizing monoculture
        </Footnote>
        ,{" "}
        <Footnote
          left
          topOffset={240}
          data={
            <>
              Since the acquisition of Kevin Systrom’s photo-sharing app
              Instagram, Meta has undertaken a series of acquisitions, totalling
              24 billion dollars, including WhatsApp, Oculus, and Giphy. This
              set of moves has been a concerted ploy to gain monopoly over
              digital/social networks.
            </>
          }
        >
          assimilating ecosystems
        </Footnote>
        ,{" "}
        <Footnote
          left
          topOffset={380}
          data={
            <>We think here of blogs, RSS feeds, community-owned forums, etc.</>
          }
        >
          displacing extant species
        </Footnote>
        , and enclosing digital abundance into enforced, artificial scarcity.
        Allowed to grow, this proposed Metaverse will be a monoverse.
      </p>
      <p>
        And this is not the only danger. There are responses to the Metaverse
        that only seek to direct its profits to chosen beneficiaries. These
        solutions find shelter under the too-broad umbrella of ‘Web3’ or
        ‘decentralization’ but are well-known harms in disguise—claiming
        flexibility while delivering precarity, championing freedom while
        delivering atomization, championing redistribution while delivering
        financialized returns for the few. We reject these solutions.
      </p>
      <p>
        However, this does not mean we should not dream of open digital spaces
        of collective autonomy and shared ownership. In fact,{" "}
        <Footnote
          topOffset={160}
          data={
            <>
              We call to mind Arundhati Roy: ‘Another world is not only
              possible, she is on her way. On a quiet day, I can hear her
              breathing’ (quoted in Macy 2007, 17).
            </>
          }
        >
          we must
        </Footnote>
        . It only means that these promises are fated to remain unrealized if
        the structures and incentives underlying our digital ecosystem do not
        evolve alongside its technological foundations.
      </p>
      <p>
        <strong>
          We gather here to affirm that meaningful alternatives are possible.
        </strong>
      </p>
      <p>
        We gather to build these alternatives, to challenge the monoverse, and
        reach towards brighter technological futures:
      </p>
      <p>
        Futures where we move past tired promises of “freedom from”—from
        established institutions, from regulation, from responsibility—and
        towards the shared capacity for building “freedom to”—to create, to
        learn, to struggle, to strengthen collective institutions, to{" "}
        <Footnote
          data={
            <>
              Freedom from external restraint on action is referred to as{" "}
              <em>negative freedom</em>. Here, we instead call for the{" "}
              <em>positive freedom</em> of having the capacity, resources, and
              pathways to act upon individual and collective free will. As per
              Escobar: the pluriverse is not merely about “'expanding the range
              of choices' (liberal freedom) but is intended to transform the
              kinds of beings we desire to be”.
            </>
          }
        >
          ensure shared security
        </Footnote>
        .
      </p>
      <p>
        Futures of{" "}
        <Footnote
          left
          topOffset={-40}
          data={
            <>
              Here, we draw inspiration from Nobel-prize winner in economics
              Elinor Ostrom’s work in governing the commons through intentional
              shared rule-setting across levels of control (individual,
              community, neighborhood, locality, state, etc.). Ostrom, Elinor.
              "Beyond markets and states: polycentric governance of complex
              economic systems." <em>American Economic Review</em> 100.3 (2010):
              641-72.
            </>
          }
        >
          <strong>polycentrism</strong>
        </Footnote>
        , beyond either atomized decentralization or top-down centralization,
        where collective self-determination is protected through overlapping
        rights and responsibilities, abundant digital public infrastructure, and
        mechanisms for accountable governance.
      </p>
      <p>
        Futures of{" "}
        <Footnote
          left
          topOffset={10}
          data={
            <>
              Plurality refers to a state in which multiple alternatives
              co-exist. Classical pluralism in a political science context takes
              this and applies it to the distribution of power within a
              political system. As laid out by thinkers such as Robert Dahl in
              <em>Who Governs?</em>, political pluralism advocates for the
              peaceful co-existence and self-determination of multiple and
              layered groups within democratic contexts.
            </>
          }
        >
          <strong>plurality</strong>
        </Footnote>
        , where choice is meaningful because{" "}
        <Footnote
          data={
            <>
              Divergence is the process of differentiation. An end-state of
              difference is required for pluriversality, but so is a continuous
              state of divergence; without this, islands of difference can merge
              and become monocultures, as we have already seen with the giant
              platforms of the current web.
            </>
          }
        >
          difference and divergence
        </Footnote>{" "}
        are possible.
      </p>
      <p>
        Futures of <strong>regenerative scale</strong> and{" "}
        <strong>shared growth</strong>, that combat monoculture through a
        stronger, broader, and more{" "}
        <strong>rooted ecology of adaptation and co-evolution.</strong>
      </p>
      <p>
        Together, we can steward these new futures; we invite you to dream,
        collaborate, and strategize towards a different world. We propose to
        gather these worlds around a different banner: the{" "}
        <strong>pluriverse, a world in which many worlds fit.</strong>
      </p>
      <SectionDivider />
      <h2 className="font-title text-3xl font-semibold pb-10">
        Learning from the Pluriverse
      </h2>
      <p>
        We turn to the frame of the Pluriverse because we believe it has much to
        offer in a time when our current digital space is increasingly colonized
        by a single vision of what is possible—a vision spurred on by the
        incentive structures of enclosure and control. Our dreams of changing
        these structures are not new, and nor are the challenges we will face.{" "}
      </p>
      <p>
        A clearer view of history is necessary to ground this dream of{" "}
        <strong>digital pluriversality</strong>. Thus, we hope to learn from
        both the origins of the pluriverse—its emergence from the{" "}
        <Footnote
          topOffset={-40}
          data={
            <>
              The Zapatistas are Indigenous community in Mexico who have built a
              de facto autonomous system of self-governance in noncontiguous
              territories of the state of Chiapas.
            </>
          }
        >
          Zapatista movement
        </Footnote>
        , its use in the
        <Footnote
          left
          topOffset={-100}
          data={
            <>
              While remaining a contested term, neoliberalism broadly refers to
              a set of policies favoring deregulation, privatization,
              globalization, and the primacy of the free market with minimal
              democratic constraints. Significant thinkers include F. A. Hayek,
              Milton Friedman, and James Buchanan.
            </>
          }
        >
          anti-neoliberal
        </Footnote>{" "}
        movements of the 1990s, its expansion into a design practice for{" "}
        <Footnote
          topOffset={40}
          data={
            <>
              Context and content at{" "}
              <a href="http://waltermignolo.com/on-pluriversality/">
                http://waltermignolo.com/on-pluriversality/
              </a>
              . Our work particularly draws from Escobar’s Designing the
              Pluriverse, the anthology Constructing the Pluriverse (ed. Bernd
              Reiter), and the essay collection Pluriverse: A Post-Development
              Dictionary (ed. Arturo Escobar, Ariel Salleh, Ashish Kothari,
              Federico Demaria, Alberto Acosta).
            </>
          }
        >
          collective autonomy
        </Footnote>
        —and from the forces that stood and still stand against its
        realization—the power of both state and capital to push towards
        individualization and atomization, and the grounded, messy reality of
        navigating shared social contexts across deep and meaningful divides.
        These difficulties persist, and we look to the past, the present, and
        the future to{" "}
        <Footnote
          left
          topOffset={-140}
          data={
            <>
              In her 1989 lecture The Real World of Technology, Ursula M.
              Franklin identifies the responsibility and risk that ‘planners’
              have in designing constraints onto ‘plannees’ without their
              knowing, often perpetuating inequities at scale as infrastructure
              develops to accommodate new technology and herds individual choice
              into societal compliance.
            </>
          }
        >
          build the capacity necessary for pluriversality
        </Footnote>
        .
      </p>
      <p>
        We first look to the past. Birthed in response to the homogeneity of
        social relations under global capitalism, pluriversality re-centers
        alternative forms of{" "}
        <Footnote
          left
          topOffset={-40}
          data={
            <>
              Multiple examples of pluriversality appear in{" "}
              <a href="https://www.routledge.com/Sacred-Civics-Building-Seven-Generation-Cities/Engle-Agyeman-Chung-Tiam-Fook/p/book/9781032059112">
                <em>Sacred Civics: Building Seven Generation Cities</em>
              </a>
              , a forthcoming Open Access collection co-edited by Jayne Engle,
              Julian Agyeman and Tanya Chung-Tiam-Fook (2022) Routledge.
            </>
          }
        >
          <strong>being</strong>
        </Footnote>
        ,{" "}
        <Footnote
          left
          topOffset={80}
          data={
            <>
              See for example the literature of the self-governing democratic
              confederalist communities in Rojava, a de facto autonomous region
              in northeastern Syria.
            </>
          }
        >
          <strong>knowing</strong>
        </Footnote>
        , and{" "}
        <Footnote
          left
          topOffset={180}
          data={
            <>
              David Graeber’s <em>Debt</em> provides an overview of the many
              structures of production, distribution, and transaction that have
              existed in human society in the past two thousand years.
            </>
          }
        >
          <strong>producing</strong>
        </Footnote>
        . Those organizing under the banner of the pluriverse advocated for
        financing mechanisms for the Global South separate from the predatory{" "}
        <Footnote
          data={
            <>
              The Bretton Woods Project provides a{" "}
              <a href="https://www.brettonwoodsproject.org/2019/06/what-are-the-main-criticisms-of-the-world-bank-and-the-imf/">
                detailed list
              </a>{" "}
              of criticisms of the International Monetary Fund, including the
              terms of its loans, forced austerity practices, privileging of the
              Global North, economic failures, etc.
            </>
          }
        >
          International Monetary Fund
        </Footnote>
        , pushed for workers’ cooperatives and collectively-owned modes of
        production, and fought for self-government, both through large-scale
        anti-colonial movements and small-scale community struggles for
        sovereignty.{" "}
        <strong>
          These advocates aimed to counter the universal–not with a disregard of
          all things universal, but with an embrace of ‘many universals’.
        </strong>{" "}
        This is{" "}
        <strong>
          not a rejection of the necessity of scale; instead, it embraces
          federation and branching
        </strong>{" "}
        and{" "}
        <Footnote
          data={
            <>
              The idea of many worlds can be found across philosophical priors;
              see Marisol de la Cadena’s ethnography of intersecting ‘Andean
              worlds’; on the other hand, see Anarchy, State, and Utopia, in
              which Robert Nozick defines a utopia as a world that every
              inhabitant believes to be the best possible world (e.g. there is
              no world they would rather be in). Since there is probably no
              single world that meets this criteria, it follows that a true
              utopia is actually a meta-utopia, or one in which many worlds are
              possible. Nozick is often associated with right libertarianism; we
              intentionally bring together two disparate traditions here.
            </>
          }
        >
          requires <em>many</em> worlds to exist ‘at scale’
        </Footnote>
        —<strong>pluricultures over monocultures</strong>. Thus, the pluriverse
        arrays itself <em>against</em> a single universality as much as it is{" "}
        <em>for</em> plurality and epistemic diversity.
      </p>
      <p>
        This brings us to the present, and a shift to our central concern:
        technology.{" "}
        <strong>
          How might we actualize this ethic within the digital realm?
        </strong>{" "}
        We, too, must struggle for community digital sovereignty in the face of
        digital land grabs. This could look like financing mechanisms for
        open-source vs. closed-source infrastructure in order to enable
        community resourcing and abundance, navigating careful partnerships with
        existing institutions to build polycentric governance in the face of
        corporate control, and empowering data and platform cooperatives modeled
        after the worker cooperative movement. While we do not want to
        overextend this metaphor—certainly, the theft of ancestral land cannot
        and should not be compared to the enclosure of the digital commons—we
        can use this foundation to imagine how to extend the frame of
        pluriversality to technology.
      </p>
      <p>
        Which brings us to possible futures, and the paths to getting there.
        Just as Escobar advocates for a displacement of the centrality of
        neoliberal and late capitalist constructs, we imagine the digital
        pluriverse as a space that can make way for{" "}
        <strong>
          a mosaic of communal, alternative, and autonomous cultural and
          economic worlds.
        </strong>
      </p>
      <p>
        And more broadly, to navigate the intersections between scale and
        regeneration, between growth and the commons. A principle of ‘many
        universals’ could provide the framework for balancing the tension
        between, on one hand, enabling community-led and governed projects to
        flourish, and, on the other, the need to then challenge massive and
        well-resourced centers of power. We must learn from the limits of Web
        2.0, where{" "}
        <strong>
          plurality in the face of centralized control tends to ultimately cede
          power to those who already wield it.
        </strong>{" "}
        This will require <strong>both compromise and creation</strong>, and
        robust mechanisms to enable them—across communities, across existing
        institutions, across digital space, across emerging technologies.
        Pluriversality can underpin these choices, lending an ethos to the
        difficult work to come.
      </p>
      <SectionDivider />
      <h2 className="font-title text-3xl font-semibold pb-10">
        A Pattern Language for the Pluriverse
      </h2>
      <p>
        The pluriverse is a project of co-creation; our hope is to provide the
        seeds of an architecture that may facilitate and support this process of
        co-constitution.{" "}
        <Footnote
          data={
            <>
              “Each pattern describes a problem which occurs over and over again
              in our environment, and then describes the core of the solution to
              that problem, in such a way that you can use this solution a
              million times over, without ever doing it the same way twice”
              (Alexander et al. 1977, p x).{" "}
            </>
          }
        >
          For this, we turn to pattern languages,{" "}
          <strong>
            an organized and coherent set of <em>patterns</em>, each describing
            a problem and the core of a solution, illustrated with examples
          </strong>
        </Footnote>
        . The term was coined by Christopher Alexander, Murray Silverstein, and
        Sara Ishikawa in their 1977 book,{" "}
        <em>A Pattern Language: Towns, Buildings, Construction</em>{" "}
        <Footnote
          left
          data={
            <>
              These patterns range from the broad—‘Mosaic of Subcultures’ calls
              for the necessity of overlapping and grounded subcultures within
              cities—to the highly specific: ‘Staircase Volume’ and ‘Corner
              Doors’.
            </>
          }
        >
          which contains hundreds of patterns aimed at encapsulating a
          community-centric, bottom-up philosophy of urban design, architecture,
          and collective livability
        </Footnote>
        .
      </p>
      <p>
        Pattern languages are modular, structured without being prescriptive,
        and for the purpose of practical design—
        <strong>
          the original pattern language had the aim of giving ordinary people,
          not merely professionals, the ability and vocabulary to shape their
          lived environment for increased community viability
        </strong>
        . The flexibility inherent in the concept has allowed for extension to a
        range of different spheres.{" "}
        <Footnote
          data={
            <>
              Avgeriou, P., & Zdun, U. (2005). Architectural patterns
              revisited-a pattern language.
            </>
          }
        >
          Pattern languages have underpinned the structure of wikis, enabled
          software and interaction design frameworks
        </Footnote>
        ,
        <Footnote
          left
          data={
            <>
              In particular, David Bollier and Silke Helfrich’s Patterns of
              Commoning, and Tom Atlee and the Co-Intelligence Team’s Wise
              Democracy Pattern Language.
            </>
          }
        >
          and extended commons-oriented and democratic governance.
        </Footnote>
      </p>
      <p>
        This makes pattern languages the{" "}
        <Footnote
          left
          topOffset={20}
          data={
            <>
              Pattern languages have also been used to create design priors for
              online communities, as well as in constructing programming
              languages and through other technological design practices; an
              outline can be found in{" "}
              <em>
                Dearden, Andy, and Janet Finlay. "Pattern languages in HCI: A
                critical review."
              </em>
            </>
          }
        >
          ideal building block for digital pluriversality.
        </Footnote>{" "}
        <strong>Thus, inspired by pattern languages, as well as </strong>
        <Footnote
          data={
            <>
              Escobar reimagined the work of design as enabling the exercise of
              autonomy, and created a set of principles to allow for this
              pluriversal design. To give an incomplete account of the features
              of autonomy-oriented design as outlined in{" "}
              <em>Designs for the Pluriverse</em>: “[1] has its main goal the
              realization of the communal, understood as the creation of the
              conditions for the community’s ongoing self-creation and{" "}
              <strong>
                successful structural coupling with their globalized
                environments
              </strong>
              , [2] embraces
              <strong>ancestrality</strong> .. and <strong>futurality</strong>,
              [3] creates auspicious spaces for the{" "}
              <strong>
                life projects of communities and the creation of convivial
                societies
              </strong>
              , [4] takes seriously the transition design imperatives of{" "}
              <strong>
                place building, relocalization, renewed attention to materiality
                and nonhumans
              </strong>
              , and the{" "}
              <strong>
                creation of interepistemic collaborative organizations
              </strong>
              , [5] fosters the flourishing of life on the planet, [6] thinks
              deeply about, and creates space for, strengthening the connection
              between the realization of the communal and the Earth (its
              relational weave at every place and everywhere), in ways that{" "}
              <strong>
                enable humans to relearn to dwell on the planet with nonhumans
                in mutually enhancing ways”
              </strong>{" "}
              (189). Escobar writes, “If we start with the presupposition,
              striking perhaps but not totally far-fetched, that the
              contemporary world can be considered a massive design failure,
              certainly the result of particular design decisions, is it a
              matter of designing our way out?”.
            </>
          }
        >
          <strong>Escobar’s autonomous design principles</strong>
        </Footnote>{" "}
        <strong>
          {" "}
          and other pattern languages that have come before, we identify below a
          set of intentions and paradigms modeled as the beginning of a pattern
          language for the pluriverse.
        </strong>
      </p>
      <p>
        Our initial offering lacks the comprehensiveness and cohesiveness of the
        original work’s set. The original pattern language included 253
        patterns, and was a result of decades of close observance of global
        architectural practice that had evolved and been experimented with over
        millennia. The digital realm is so young, and our own perspective is
        necessarily unitary, biased, and incomplete. Thus, rather than
        attempting our own meticulous and thorough provision of careful designs,
        we instead offer the seed of a new set of patterns, and with it the
        beginnings of a shared architecture for collectively-created pattern
        languages.
      </p>
      <p>
        We invite you and others to plant and garden the seeds, so that this
        language may grow—evolving through intention and use, like all living
        languages. We hope this may lay the groundwork for building tangible
        instantiations of a shared pluriversal vision.
      </p>
    </>
  );
}
