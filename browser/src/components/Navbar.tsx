import { NavLink } from "react-router-dom";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { BiQuestionMark, BiPlanet } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { TiPencil } from "react-icons/ti";

export function ContributeButton() {
  return (
    <a href="/#contribute">
      <button className={`glass-button md:px-6 glass-button-cta`}>
        <span className="hidden md:flex pr-2">
          <span className="pr-3 pt-1">
            <TiPencil />
          </span>
          Contribute
        </span>
        <span className="md:hidden">
          <TiPencil />
        </span>
      </button>
    </a>
  );
}

export function Navbar() {
  return (
    <nav className="flex justify-between justify-end pt-8 md:mx-8 mx-2">
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
                  <BiPlanet />
                </span>
              </button>
            )}
          </NavLink>
        </div>
        <div>
          <ContributeButton />
        </div>
      </div>
    </nav>
  );
}
