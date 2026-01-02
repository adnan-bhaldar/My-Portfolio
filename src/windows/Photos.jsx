import { WindowControls } from '#components';
import { gallery, photosLinks } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window'
import { FileType, Mail, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Photos = () => {
    const { openWindow } = useWindowStore();
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
    
    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />

                <div className="w-full flex justify-end items-center gap-3 text-gray-500">
                    <Mail className='icon' />
                    <Search className='icon' />
                </div>
            </div>

            <div className="flex w-full">
                <div className="sidebar">
                    <h2 className='pb-2'>Photos</h2>

                    <ul>
                        {photosLinks.map(({ id, icon, title}) => (
                            <li key={id}>
                                <img 
                                    src={icon} 
                                    alt={title}
                                    style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                                />
                                <p>{title}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="gallery">
                    <ul>
                        {gallery.map(({id, img}) => (
                            <li key={id}
                            onClick={() => openWindow("imgfile", {
                                id, 
                                name: "Gallery image",
                                icon: "/images/image.png",
                                kind: "file",
                                fileType: "img",
                                imageUrl: img,
                            })
                        }
                        >
                            <img 
                                src={img} 
                                alt={`Gallery image ${id}`}
                                style={{ color: isDark ? '#ffffff' : '#1f2937' }}
                            />
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

const PhotosWindow = WindowWrapper(Photos, 'photos')

export default PhotosWindow