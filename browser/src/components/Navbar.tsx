import { Link, NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex justify-end pt-8 pr-8">
      <div className="pr-4">
        <NavLink to="/about">
          {({ isActive }) => (
            <button
              className={`glass-button ${isActive ? "selectedBorder" : ""}`}
            >
              About
            </button>
          )}
        </NavLink>
      </div>
      <div className="pr-4">
        <NavLink to="/">
          {({ isActive }) => (
            <button
              className={`glass-button ${isActive ? "selectedBorder" : ""}`}
            >
              Pluriverse
            </button>
          )}
        </NavLink>
      </div>
      <div className="pr-4">
        {/* Can make this scroll instead. */}
        <a href="/#contribute">
          <button className={`glass-button`}>Contribute</button>
        </a>
      </div>
      <div className="pr-4">
        <NavLink to="/contributions">
          {({ isActive }) => (
            <button
              className={`glass-button ${isActive ? "selectedBorder" : ""}`}
            >
              All Contributions
            </button>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
