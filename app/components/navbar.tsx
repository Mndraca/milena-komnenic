"use client";

import { FC, useState } from "react";
import Navlink from "./navlink";
import MenuOverlay from "./menuOverlay";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { ModeToggle } from "./modeToggle";

interface navLinkProps {
  title: string;
  path: string;
}

const Navbar: FC = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [navLinks, setNavLinks] = useState<navLinkProps[]>([
    { title: "About", path: "#about" },
    { title: "Projects", path: "#projects" },
    { title: "Contact", path: "#contact" },
    {
      title: "Blog",
      path: "#blog",
    },
  ]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-[#ffffff] bg-opacity-100 shadow-md">
      <div className="flex items-center justify-evenly p-4">
        <div className="relative h-32 w-40">
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-full"
            src="/MilenaLogo copy.mp4"
            autoPlay
            loop
            muted
          />
        </div>
        <div className="mobile-menu block sm:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 text-pink-600 hover:text-pink-300"
            >
              <IoMdMenu className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 text-pink-600 hover:text-pink-300"
            >
              <IoMdClose className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden sm:flex sm:w-auto" id="navbar">
          <ul className="flex space-x-8">
            {navLinks.map((link, index: number) => (
              <li key={index}>
                <Navlink href={link.path} title={link.title} />
              </li>
            ))}
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>
      {navbarOpen && <MenuOverlay links={navLinks} />}
    </nav>
  );
};

export default Navbar;
