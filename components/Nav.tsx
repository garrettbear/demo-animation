import { FC } from "react";
import Logo from "./Logo";
import Button from "./Button";

const Nav: FC = () => {
  return (
    <nav className="grid grid-cols-3 items-center justify-between px-6 py-4 bg-white rounded-t-2xl">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Logo className="w-[20vw] md:w-[10vw] h-auto" />
      </div>

      {/* Center: Nav Links */}
      <ul className="hidden md:flex items-center justify-center space-x-8 text-sm font-medium text-[--color-gray-6]">
        <li>
          <a href="#invest" className="hover:text-black">
            Invest
          </a>
        </li>
        <li>
          <a href="#insight" className="hover:text-black">
            Insight
          </a>
        </li>
        <li>
          <a href="#ecosystem" className="hover:text-black">
            Ecosystem
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-black">
            About
          </a>
        </li>
      </ul>

      {/* Right: Auth buttons */}
      <div className="flex items-center justify-end space-x-4 text-sm">
        <a className="text-[--color-gray-6] hover:text-black">Log In</a>
        <Button size="sm">Sign Up</Button>
      </div>
    </nav>
  );
};

export default Nav;
