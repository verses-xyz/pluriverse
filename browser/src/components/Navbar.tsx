import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex justify-between justify-end pt-8 px-8">
      <div>
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
      <div className="flex ">
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
        <div>
          {/* Can make this scroll instead. */}
          <a href="/#contribute">
            <button className={`glass-button glass-button-cta`}>
              Contribute
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
