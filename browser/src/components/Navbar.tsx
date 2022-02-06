import { NavLink } from "react-router-dom";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { BiQuestionMark, BiWorld } from "react-icons/bi";
import { FiBook } from "react-icons/fi";

export function Navbar() {
  return (
    <nav className="flex justify-between justify-end pt-8 px-8">
      {/* <nav className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"> */}
      {/* <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"> */}
      <div>
        <NavLink to="/">
          {({ isActive }) => (
            <button
              className={`glass-button md:px-6 ${
                isActive ? "selectedBorder" : ""
              }`}
            >
              <span className="hidden md:inline">Pluriverse</span>
              <span className="md:hidden">
                <FiBook />
              </span>
            </button>
          )}
        </NavLink>
      </div>
      {/* <button
        className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
        type="button"
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        <FaBars />
      </button> */}
      <div className={"flex flex-row"}>
        <div className="pr-4">
          <NavLink to="/about">
            {({ isActive }) => (
              <button
                className={`glass-button md:px-6 ${
                  isActive ? "selectedBorder" : ""
                }`}
              >
                <span className="hidden md:inline">About</span>
                <span className="md:hidden">
                  <BiQuestionMark />
                </span>
              </button>
            )}
          </NavLink>
        </div>
        <div className="pr-4">
          <NavLink to="/contributions">
            {({ isActive }) => (
              <button
                className={`glass-button md:px-6 ${
                  isActive ? "selectedBorder" : ""
                }`}
              >
                <span className="hidden md:inline">All Contributions</span>
                <span className="md:hidden">
                  <BiWorld />
                </span>
              </button>
            )}
          </NavLink>
        </div>
        <div>
          {/* Can make this scroll instead. */}
          <a href="/#contribute">
            <button className={`glass-button md:px-6 glass-button-cta`}>
              <span className="hidden md:inline">Contribute</span>
              <span className="md:hidden">
                <MdAdd />
              </span>
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
