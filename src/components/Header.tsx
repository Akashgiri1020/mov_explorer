"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Heart, Film } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-secondary bg-opacity-50 text-tertiary backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={'/'} className="flex items-center space-x-2 text-xl font-bold text-primary">
            <Film className="w-6 h-6" />
            <span>Movie Explorer</span>
          </Link>

          {/* Navigation  Menu */}
          <nav className="flex space-x-6">
            
            <Link 
              href="/favourites" 
              className="flex items-center space-x-2 text-tertiary hover:text-accent transition-colors duration-200"
            >
              <Heart className="w-4 h-4" />
              <span>Favourites</span>
            </Link>
          </nav>
        </div>

      </div>
    </header>
  );
};

export default Header;