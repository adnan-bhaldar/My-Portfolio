import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window';
import { PlusIcon, Share, SquarePen } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ImageWindowContent = () => {
    const {windows} = useWindowStore();
    const data = windows.imgfile?.data;
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark-theme'));
        };

        // Check initial theme
        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
    <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
        <div className="flex items-center gap-3">
                    <SquarePen className='icon' />
                    <PlusIcon className='icon' />
                    <Share className='icon' />
                </div>
    </div>

    <div className="preview" style={{ color: isDark ? '#ffffff' : '#1f2937' }}>
        {imageUrl ? (
            <div className="w-full">
                <img 
                    src={imageUrl} 
                    alt={name} 
                    className='w-full h-auto max-h-[70vh] object-contain rounded'
                    style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                />
            </div>
        ) : null}
    </div>
        </>
    );
};

const ImageWindow = WindowWrapper(ImageWindowContent, 'imgfile');

export default ImageWindow