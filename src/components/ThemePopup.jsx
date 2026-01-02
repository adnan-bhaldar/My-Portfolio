import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '#hooks/useTheme.js';

const ThemePopup = ({ isOpen, onClose, theme, setTheme }) => {
    const { isDark } = useTheme();
    
    if (!isOpen) return null;

    const handleThemeSelect = (selectedTheme) => {
        setTheme(selectedTheme);
        setTimeout(() => onClose(), 150);
    };

    const themeOptions = [
        { id: 'light', name: 'Light', icon: Sun },
        { id: 'dark', name: 'Dark', icon: Moon },
        { id: 'system', name: 'System', icon: Laptop },
    ];

    return (
        <div
            className={`fixed top-10 right-25 z-50 w-34 rounded-lg shadow-2xl overflow-hidden backdrop-blur-xl border  ${
                isDark 
                    ? 'bg-[#171717]/95 border-gray-700/50' 
                    : 'bg-white border-none'
            }`}
            style={{
                animation: 'slideDown 0.2s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="py-2 px-2 flex flex-col gap-1">
                {themeOptions.map(({ id, name, icon: Icon }) => {
                    const isActive = theme === id;
                    
                    return (
                        <button
                            key={id}
                            onClick={() => handleThemeSelect(id)}
                            className={` pl-4 w-30 flex items-center gap-3.5 py-1.5 rounded-lg transition-all ${
                                isActive
                                ? isDark
                                    ? 'bg-[#262626] text-white'
                                    : 'text-gray-700' 
                                    : isDark 
                                        ? 'text-gray-300 hover:bg-[#262626]' // Hover allowed only in Dark Mode
                                        : 'text-gray-700 hover:bg-transparent' // NO black hover in Light Mode
                            }`}
                        >
                            <Icon size={17} strokeWidth={2.5} className="shrink-0" />
                            <span className="text-sm font-semibold">{name}</span>
                        </button>
                    );
                })}
            </div>

            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ThemePopup;