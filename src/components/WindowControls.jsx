import useWindowStore from '#store/window.js';
import React from 'react'

const WindowControls = ({ target }) => {
    const { closeWindow } = useWindowStore();
    return (
        <div id='window-controls'>
            <div className='close' onClick={() => closeWindow(target)}>
                <img src="/icons/window-close.svg" alt="Close" />
            </div>
            <div className='minimize'>
                <img src="/icons/window-minimize.svg" alt="Minimize" />
            </div>
            <div className='maximize'>
                <img src="/icons/window-maximize.svg" alt="Maximize" />
            </div>
        </div>
    )
}

export default WindowControls;