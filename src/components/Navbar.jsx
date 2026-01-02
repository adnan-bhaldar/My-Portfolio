import dayjs from 'dayjs';
import { navIcons, navLinks } from '#constants';
import React, { useState, useRef, useEffect } from 'react';
import useWindowStore from '#store/window.js';
import { useTheme } from '#hooks/useTheme.js';
import ThemePopup from './ThemePopup';

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { theme, setTheme, isDark } = useTheme();
  const [isThemePopupOpen, setIsThemePopupOpen] = useState(false);
  const popupContainerRef = useRef(null);

  const handleIconClick = (id) => {
    // ID 4 is the theme toggle icon
    if (id === 4) {
      setIsThemePopupOpen(!isThemePopupOpen);
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupContainerRef.current && !popupContainerRef.current.contains(event.target)) {
        setIsThemePopupOpen(false);
      }
    };

    if (isThemePopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemePopupOpen]);

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Adnan's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div ref={popupContainerRef}>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li
              key={id}
              onClick={() => handleIconClick(id)}
              className={id === 4 ? 'cursor-pointer' : ''}
            >
              <img src={img} alt={`icon-${id}`} className='icon' />
            </li>
          ))}
        </ul>
        <time>{dayjs().format('ddd MMM D h:mm A')}</time>

        {/* Theme Popup */}
        <ThemePopup
          isOpen={isThemePopupOpen}
          onClose={() => setIsThemePopupOpen(false)}
          theme={theme}
          setTheme={setTheme}
          isDark={isDark}
        />
      </div>
    </nav>
  );
};

export default Navbar;