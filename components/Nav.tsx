"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import Button from "./Button";

const Nav: FC = () => {
  return (
    <motion.nav
      className="absolute top-0 left-0 right-0 w-full z-10 md:grid md:grid-cols-3 flex flex-row justify-between px-6 py-4"
      style={{ transformOrigin: "top center" }}
      initial={{ rotateX: -90, opacity: 0, y: -100 }}
      animate={{ rotateX: 0, opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.2,
      }}
    >
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Logo className="w-[20vw] md:w-[10vw] h-auto" />
      </motion.div>

      <motion.ul
        className="hidden md:flex items-center justify-center space-x-8 text-sm font-medium text-[--color-gray-6]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
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
      </motion.ul>

      <motion.div
        className="flex items-center justify-end space-x-4 text-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <a className="text-[--color-gray-6] hover:text-black">Log In</a>
        <Button size="sm">Sign Up</Button>
      </motion.div>
    </motion.nav>
  );
};

export default Nav;
