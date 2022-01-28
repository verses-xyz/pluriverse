import "./EssayBody.css";
import Footnote from "./Footnote";

export function EssayBody() {
  return (
    <>
      {/* TODO: refactor the article tag out so it includes the hero, for now let's have this invisible h1 for screen readers  */}
      <h1 style={{ display: "none" }}>Towards a Digital Pluriverse</h1>
      <p className="pt-8">
        W
        <span className="subhead">
          e are told that the age of the{" "}
          <Footnote data="Coined by the American author Neal Stephenson in his novel, Snow Crash, ‘the Metaverse’ refers to a virtual reality space of integrated networks that can be used for work and play. The term became ubiquitous in public discourse in 2021 following the announcement from Facebook founder, Mark Zuckerberg of the company’s name change to ‘Meta’ and the company’s investment into building a metaverse. ">
            Metaverse
          </Footnote>{" "}
          is upon us.{" "}
        </span>
      </p>
      <p>
        The heralds of this age promise digital freedom, immersion, and
        prosperity. But we have seen such promises before; we now know to be
        careful. Web1 gave us a new horizon of digital space, open, transparent,
        and interoperable—and yet, it was inaccessible to most, and growth
        brought with it fracturing and commercialization. Despite the looming
        walled gardens of today, Web2 began with its own dreams of
        democratization, heralded by proliferating personal websites,
        distributed network effects, and{" "}
        <Footnote
          data={` Returning to documents like Tim O’Reilly’s 2005 ‘What is Web.20’ is eerily reminiscent of recent discourse. For example: “BitTorrent thus demonstrates a key Web 2.0 principle: the service automatically gets better the more people use it. While Akamai must add servers to improve service, every BitTorrent consumer brings his own resources to the party. There's an implicit "architecture of participation", a built-in ethic of cooperation, in which the service acts primarily as an intelligent broker, connecting the edges to each other and harnessing the power of the users themselves.”`}
        >
          universal communication
        </Footnote>
        . The shifts that we are promised are fated to repeat this cycle if the
        structures and incentives of our digital ecosystem do not evolve
        alongside its technological foundations; one cannot create anew with the
        same tired tools.
      </p>
      <p>
        Thus, we can recognize that the Metaverse is not evolution, it is
        regression. As championed by Meta and its ilk, the Metaverse allows and
        celebrates <b>monopoly</b>, taking what was once{" "}
        <Footnote
          topOffset={-10}
          data={`While a collective approach may take on various forms, at its center it is an approach driven by community solidarity, group ownership, and an open commons. In Caliban and the Witch,  Silvia Federici links land privatization to a breakdown of social relationships. Discussing the transformation of agricultural structure and labor in 16th-century England following land enclosures and the loss of the commons, Federici writes that communities lost sense of their social relations – “families disintegrated, the youth left the village to join the increasing number of vagabonds or itinerant workers…while the elderly were left to fend for themselves” (72). This was in stark (and disappointing) contrast to the rich social relations that existed in the commons, where peasant solidarity and sociality thrived and women, although possessing little social power, could experience autonomy.`}
        >
          collective
        </Footnote>{" "}
        and ensure it is bought, sold, measured, and speculated upon. The
        Metaverse expands as a homogenizing{" "}
        <Footnote
          left
          data={`In agriculture, a monoculture refers to the cultivation of a singular crop in an area. Though monocultures may be efficient, they present greater susceptibility to disease and pests. In Braiding Sweetgrass: Indigenous Wisdom, Scientific Knowledge, and the Teachings of Plants, Indigenous scholar and botanist, Robin Kimmerer shares the story of the Three Sisters to advocate for polycultures over monocultures. Referring to a gardening style of Native peoples, the Three Sisters refers to the interdependent relationship between species of corn, squash, and beans. Although each of the species have different needs and growth patterns, they work alongside each other in a holistic ecosystem of growth. Kimmerer imagines this harmonious agricultural system as a metaphor for intellectual and social relations: she writes that “the Three Sisters offer us a new metaphor for an emerging relationship between indigenous knowledge and Western science”, as well as functions as a model of care in which individuals use their unique gifts to “take care of each other [and] work together” (find pg no.). In our vision of the pluriverse, we seek to adopt this idea of individuality and shared/complementary knowledge. `}
        >
          <b>monoculture</b>
        </Footnote>
        ,{" "}
        <Footnote
          left
          topOffset={430}
          data={` Since the acquisition of Kevin Systrom’s photo-sharing app Instagram, Meta has undertaken a series of acquisitions, totalling 24 billion dollars and including WhatsApp, Oculus, and Giphy. This set of moves has been a concerted ploy to gain monopoly over digital/social networks.`}
        >
          assimilating ecosystems
        </Footnote>
        ,{" "}
        <Footnote
          left
          topOffset={530}
          data={`We think here of blogs, RSS feeds, community-owned forums, etc.`}
        >
          displacing extant species
        </Footnote>
        , and enclosing digital abundance into enforced scarcity. A new-age
        Columbus of digits and pixels, the Metaverse purports to chart new
        territory while simply recycling the harms and stagnation of the old.
        The Metaverse we are promised is not a gift we should accept but
        shackles in disguise. This proposed Metaverse is truly a{" "}
        <b>monoverse</b>.
      </p>
      <p>
        But we have brighter dreams, of brighter technological futures. Futures
        that are rooted in history, that prefigure infinite gardens of
        collective wisdom, intelligence, and collaboration. Futures where we
        move past promises of mere “freedom from” towards the shared capacity
        for building{" "}
        <Footnote
          data={`Freedom from external restraint on action is referred to as negative freedom, here we instead call for the positive freedom of having the capacity, resources, and pathways to act upon individual and collective free will. As per Escobar: the pluriverse is merely not about 'expanding the range of choices' (liberal freedom) but is intended to transform the kinds of beings we desire to be’.`}
        >
          “freedom to”
        </Footnote>
        . Futures of{" "}
        <Footnote
          topOffset={140}
          data={`Here, we draw inspiration from Elinor Ostrom’s work in governing the commons. Ostrom, Elinor. "Beyond markets and states: polycentric governance of complex economic systems." American economic review 100.3 (2010): 641-72.`}
        >
          <b>polycentrism</b>
        </Footnote>
        , where falsely-imposed scarcity and data moats give way to the creation
        of common and convivial spaces, collectively-owned resources and
        infrastructure, and shared, self-sovereign worlds. Futures of{" "}
        <Footnote
          topOffset={140}
          data={`Plurality refers to a state in which multiple alternatives co-exist. Classical pluralism in a political science context takes this and applies it to the distribution of power within a political system. As laid out by thinkers such as Robert Dahl in Who Governs?, political pluralism advocates for the peaceful co-existence and self-determination of multiple and layered groups within democratic contexts.`}
        >
          <b>plurality</b>
        </Footnote>
        , where choice is meaningful because difference and{" "}
        <Footnote
          topOffset={280}
          data={`Divergence is the process of differentiation. An end-state of difference is required for pluriversality, but so is a continuous state of divergence; without this, islands of difference can merge and become monocultures, as we have already seen with the giant platforms of the current web. `}
        >
          divergence
        </Footnote>
        are possible. Futures that trade in the flattening of a monoculture for
        a resilient ecology of diverse co-existence.
      </p>
      <p>
        These dreams are not new. In looking to the future, we look sideways to
        alternate timelines, and to the past. With each cycle of technological
        development, the stakes become higher. [tk technical, social, and
        methodological comments are required to bring this future about]
      </p>
      <p>
        Together, we can steward these new futures; we invite you to dream,
        collaborate, and strategize towards a different world. We propose to
        gather these worlds around a different banner: the
        <b className="shimmer"> Pluriverse</b>.
      </p>
      <h2 className="font-title text-3xl pt-16 font-bold pb-3">
        Origins of the Pluriverse
      </h2>
      <p>
        A ‘pluriverse’ is <b>a world in which many worlds may fit</b>. The
        origins of the term are themselves plural. The word has its roots in
        decolonial theory, emerging from the Zapatista movement and taken
        forward by activists and academics alike, championed especially by the
        cultural anthropologist{" "}
        <Footnote
          left
          data={`Our work particularly draws from Escobar’s Designing the Pluriverse, the anthology Constructing the Pluriverse (ed. Bernd Reiter), and the essay collection Pluriverse: A Post-Development Dictionary (ed. Arturo Escobar, Ariel Salleh, Ashish Kothari, Federico Demaria, Alberto Acosta). `}
        >
          Arturo Escobar
        </Footnote>{" "}
        and the literary critic and theorist{" "}
        <Footnote
          data={`Context and content at  http://waltermignolo.com/on-pluriversality/.`}
        >
          Walter Mignolo
        </Footnote>
        .
      </p>
      <p>
        Pluriversality is a process of <em>decentering</em>. Birthed in response
        to the the{" "}
        <Footnote
          data={`While a still-contested term, neoliberalism broadly refers to a set of policies favoring deregulation, privatization, globalization, and the primacy of the free market with minimal democratic constraints. Significant thinkers include  F. A. Hayek, Milton Friedman, and James Buchanan.`}
        >
          neoliberal
        </Footnote>
        expansion of the 1990s, which had at its core a homogenous form of
        social organization as the driver of global capitalism, pluriversality
        instead re-centers other forms of being, knowing, and{" "}
        <Footnote
          left
          data={`David Graeber’s Debt provides an overview of the many structures of production, distribution, and transaction that have existed in human society in the past two thousand years, many co-existing and interacting.`}
        >
          producing
        </Footnote>
        . The history of the term pluriverse is thus an oppositional one — those
        organizing under the banner of the pluriverse arrayed themselves against
        single, globalized Western system of being, a never-ending juggernaut of
        assimilation and monopoly over society itself. They advocated for
        financing mechanisms for the Global South separate from the predatory
        International Monetary Fund, pushed for workers’ cooperatives and
        collectively-owned modes of production, and fought for self-government,
        both through large-scale anti-colonial movements and small-scale
        community struggles for sovereignty.
      </p>
      <p>
        These advocates aimed to counter the universal - not with a disregard of
        all things universal, but with an embrace of ‘many universals’. We can
        see this not as a movement entirely away from the necessity of scale,
        but one that embraces federation and subsidiarity as well as one that
        requires many worlds to exist ‘at scale’ — pluricultures, not
        monocultures. Thus, the pluriverse arrays itself <em>against</em>{" "}
        universality as much as it is <em>for</em> plurality and epistemic
        diversity. It is for this reason that we believe it can act as an
        appropriate foundation for a socio-digital ecosystem — one that is built
        on collective negotiations of the future, and which makes space for
        generative encounters between plurals, both oppositional and
        collaborative.
      </p>
      <p>
        The pursuit of pluriversality is thus a process-oriented pursuit of a
        <Footnote
          left
          data={`In Anarchy, State, and Utopia, Robert Nozick defines a utopia as a world that every inhabitant believes to be the best possible world (e.g. there is no world they would rather be in). Since there is probably no single world that meets this criteria, it follows that a true utopia is actually a meta-utopia, or one in which many worlds are possible. If we accept this definition of utopia, the question becomes how we end up in a world where the largest possible set of worlds are available. `}
        >
          flowering of worlds
        </Footnote>
        . Grounded in the liberatory actions of{" "}
        <Footnote
          data={`In particular, drawing from the work of the Zapatistas, an Indigenous community in Mexico who have built a de facto autonomous system of self-governance in noncontiguous territories of the state of Chiapas, and the self-governing democratic confederalist communities in Rojava,  a de facto autonomous region in northeastern Syria.`}
        >
          autonomous communities
        </Footnote>
        , the pluriverse is a renegotiation of accepted binaries. The current
        digital space is being colonized by a single vision of what is possible.
        This vision constrains us, forcing upon us an extremely limiting and
        subjective view of how humans should be able to interact with each other
        through and on digital networks. Spurred on by the incentive structures
        of profit, growth, and control, the privatized web necessitates a
        flattening of our personhood, turning us into{" "}
        <Footnote
          left
          data={`Multiple studies have shown the passivity of most participants in existing social media, for ex. Romero, Daniel M., et al. "Influence and passivity in social media." Joint European Conference on Machine Learning and Knowledge Discovery in Databases. Springer, Berlin, Heidelberg, 2011.`}
        >
          passive consumers
        </Footnote>
        —our power shifted to purchasing power, our selves shifted to durational
        performances meant to be{" "}
        <Footnote
          data={`In opposing this, we bring in precepts of Kantian moral philosophy, particularly the convincing that a rational human being should not be treated as a means, only as an end. `}
        >
          consumed by others
        </Footnote>
        . Just as Escobar advocates for a displacement of the centrality of
        neoliberal and late capitalist constructs, the pluriverse is a vision
        for the digital future that makes way for a mosaic of communal,
        alternative, and autonomous cultural and economic worlds. This can
        expand the partial common ground and surface area of contact between
        these multiplicities, leading to a world of difference, but not
        disconnection.
      </p>
      <p>
        The digital pluriverse will cultivate the flourishing of many different,
        and potentially contrasting worlds.
      </p>
      <h2 className="font-title text-3xl pt-16 font-bold pb-3">
        A Pattern Language For the Pluriverse
      </h2>
      <p>
        A pattern language is an organized and coherent set of <em>patterns</em>
        , each of which describes a problem and the core of a solution,
        illustrated with{" "}
        <Footnote
          data={`“Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice” (Alexander et al. 1977, p x). `}
        >
          examples
        </Footnote>
        . The term was coined by Christopher Alexander, Murray Silverstein, and
        Sara Ishikawa in their 1977 book,{" "}
        <em>A Pattern Language: Trees, Buildings</em>, which contains hundreds
        of patterns aimed at encapsulating a philosophy of urban design,
        architecture, and community livability. These patterns range from the
        broad— ‘Mosaic of Subcultures’ calls for the necessity of overlapping
        and grounded subcultures within cities—to the highly specific:
        ‘Staircase Volume’ and ‘Corner Doors’.
      </p>
      <p>
        The authors of <em>A Pattern Language</em> analogized each pattern to a
        single word or thought of a true language, for use as building blocks in
        service of this cohesive whole. In this way, offering a pattern language
        is to{" "}
        <em>
          offer people agency in expressing and constructing their own solutions
        </em>
        , rather than a stand-alone or prescriptive way to solve a problem. This
        allows people to “solve the problem, in [their] own way, by adapting it
        to [their] preferences, and the local conditions at the place [they] are
        making it” (p xiii). Solutions are always contextual.
      </p>
      <p>
        Inspired by this idea, as well as{" "}
        <Footnote
          data={`Escobar reimagined the work of design as enabling the exercise of autonomy, and created a set of principles to allow for this pluriversal design. He writes, “If we start with the presupposition, striking perhaps but not totally far-fetched, that the contemporary world can be considered a massive design failure, certainly the result of particular design decisions, is it a matter of designing our way out?”. `}
        >
          Escobar’s autonomous design principles
        </Footnote>
        , we lay out below a set of intentions and epistemes for pluriversality,
        modeled as the beginning of a pattern language for the pluriverse. Each
        pattern maps to and connects with the others, in what we hope will be a
        network that is both ever-expanding and ever-concretizing.
      </p>
      <p>
        This initial seed does not have the comprehensiveness and cohesiveness
        of the original work’s set. Alexander et al.’s architectural pattern
        language included 253 patterns, and was a result of decades of close
        observance of global architectural practice that had evolved and been
        experimented with over millennia. The digital realm for which we hope to
        design is nascent; while long-held lessons still hold sway, change is
        both seismic and regular. Collective input is both prefigurative and
        necessary to adapt to the speed and breadth of paradigm shifts inherent
        to the digital. Thus, rather than a meticulous and thorough provision of
        careful designs, we instead offer the kernel of a new set of patterns,
        and the beginnings of an architecture for collectively-created pattern
        languages.
      </p>
      <p>
        Our seed set is brief, but we invite you and others to plant and garden
        the seeds, so that this language may grow–evolving through intention and
        use, like all alive languages.
      </p>
    </>
  );
}
