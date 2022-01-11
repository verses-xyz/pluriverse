import { Link } from "react-router-dom";

// TODO:
export function About() {
  return (
    <div
      style={{
        background: "black",
        height: "100vh",
        padding: "24px",
      }}
    >
      {/* TODO: INSERT NAV */}
      <div className="flex justify-end pt-8 pr-8">
        <div className="pr-4">
          <Link to="/">
            <button className="glass-button">Pluriverse</button>
          </Link>
        </div>
        <div>
          <button className="glass-button">Contribute</button>
        </div>
      </div>
      <h2 className="text-2xl font-bold">The Story</h2>
      <p>
        This is an artifact created by <a href="https://verses.xyz/">Verses</a>.
        Our first drop was the{" "}
        <a href="https://www.interdependence.online/">Declaration</a>, where we
        introduced the term &quot;pluriverse&quot;. With this artifact, we
        explore the origin of the term pluriverse in decolonial theory, and
        propose &#39;the Pluriverse&#39; as an alternative to the moncultural
        Metaverse.
      </p>
      <br />
      <h2 className="text-2xl font-bold">The Pattern</h2>
      <p>
        We hope this artifact equips readers with the knowledge necessary to
        understand the concept of pluriversality, and invites them into a
        participatory ecosystem to contribute meaning to the pluriverse.
      </p>
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
        We aim with the participatory part of this artifact to seed a pattern
        language for the pluriverse.
      </p>
      <p>
        Adapted from Wikipedia: A pattern language is an organized and coherent
        set of patterns, each of which describes a problem and the core of a
        solution, The term was coined by architect Christopher Alexander in his
        1977 book, A Pattern Language: Trees, Buildings, which remains one of
        the best-selling books on architecture. The authors thought that each
        pattern was analogous to a single word or thought of a true language, to
        be used as a building block, rather than a prescriptive way to solve a
        problem.
      </p>
      <p>
        The Pluriverse Pattern Cards are modelled on Alexander&#39;s concept.
        They are intended to be a foundational set of patterns that may act as a
        starting point for future concepts and concretizations; as such, our
        &#39;seed set&#39; presented here is brief in comparison to the
        comprehensiveness achieved by other pattern languages. The cards use the
        below template:
      </p>
    </div>
  );
}
