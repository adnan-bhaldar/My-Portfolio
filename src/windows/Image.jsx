import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window';
import { PlusIcon, Download, SquarePen } from 'lucide-react';
import React from 'react';

const ImageWindowContent = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;
    const { name, imageUrl } = data || {};

    const handleDownload = () => {
        if (!imageUrl) return
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = name || 'image'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <h2>{name}</h2>
                <div className="flex items-center gap-3">
                    <SquarePen className='icon' />
                    <PlusIcon className='icon' />
                    <Download className='icon' onClick={handleDownload} />
                </div>
            </div>

            <div className="preview">
                {imageUrl ? (
                    <div className="w-full">
                        <img
                            src={imageUrl}
                            alt={name}
                            className='w-full h-auto max-h-[70vh] object-contain rounded'
                        />
                    </div>
                ) : null}
            </div>
        </>
    );
};

const ImageWindow = WindowWrapper(ImageWindowContent, 'imgfile');

export default ImageWindow