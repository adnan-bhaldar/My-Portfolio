import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window';
import { PlusIcon, Share, SquarePen } from 'lucide-react';
import React from 'react';

const ImageWindowContent = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;
    const { name, imageUrl } = data || {};

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