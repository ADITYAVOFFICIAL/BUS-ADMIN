'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <nav className="bg-blue-700 px-4 py-3 flex items-center justify-between font-semibold">
      {/* Left Side: Logo and Title */}
      <div className="flex items-center space-x-2">
      <Image
  src="/srm-logo-white.svg" 
  alt="SRM Logo" 
  className="w-20 h-30"
  width={80} // Add the width property
  height={120} // Add the height property
/>
        <Link href="/profile"><span className="text-white text-lg font-bold">BUS ADMIN DASHBOARD</span></Link>
      </div>

      {/* Right Side: Desktop Links */}
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/login" className="text-white hover:bg-blue-600 px-4 py-2 rounded">
          Login
        </Link>
        <Link href="/useranal" className="text-white hover:bg-blue-600 px-4 py-2 rounded">
        User Analytics
        </Link>
        <Link href="/busanalytics" className="text-white hover:bg-blue-600 px-4 py-2 rounded">
          Bus Analytics
        </Link>
        <Link href="/routeanalytics" className="text-white hover:bg-blue-600 px-4 py-2 rounded">
        Route Analytics
        </Link>
        <Link href="/dailyrep" className="text-white hover:bg-blue-600 px-4 py-2 rounded">
          Daily Report
        </Link>
        <Link href="/notice" className="text-white hover:bg-blue-600 px-4 py-2 rounded">
          Notice Board
        </Link>
        <Link href="/profile" className="text-white hover:bg-blue-600 px-4 py-2 rounded">
          Profile
        </Link>
        <Link href="/logout" className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
          Logout
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 w-full bg-blue-700 flex flex-col space-y-2 py-4 z-50 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <Link href="/login" className="text-white hover:bg-blue-600 px-4 py-2 rounded" onClick={toggleMenu}>
              Login
            </Link>
            <Link href="/useranal" className="text-white hover:bg-blue-600 px-4 py-2 rounded" onClick={toggleMenu}>
              User Analytics
            </Link>
            <Link href="/busanalytics" className="text-white hover:bg-blue-600 px-4 py-2 rounded" onClick={toggleMenu}>
            Bus Analytics
            </Link>
            <Link href="/routeanalytics" className="text-white hover:bg-blue-600 px-4 py-2 rounded" onClick={toggleMenu}>
            Route Analytics
            </Link>
            <Link href="/dailyrep" className="text-white hover:bg-blue-600 px-4 py-2 rounded" onClick={toggleMenu}>
            Daily Report
            </Link>
            <Link href="/notice" className="text-white hover:bg-blue-600 px-4 py-2 rounded" onClick={toggleMenu}>
            Notice Board
            </Link>
            <Link href="/profile" className="text-white hover:bg-blue-600 px-4 py-2 rounded" onClick={toggleMenu}>
              Profile
            </Link>
            <Link href="/profile" className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded" onClick={toggleMenu}>
              Logout
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;