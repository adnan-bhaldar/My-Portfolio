import { locations } from '#constants'
import useLocationStore from '#store/location';
import useWindowStore from '#store/window';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { Draggable } from 'gsap/Draggable';
import React from 'react'

const projects = locations.work?.children ?? [];

const GRID_COLS = 1
const COL_SPACING_VW = 12
const ROW_SPACING_VH = 12
const START_TOP_VH = 5
const START_LEFT_VW = 3

const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow('finder');
    }

    useGSAP(() => {
        Draggable.create('.folder')
    }, []);

    return (
        <section id="home">
            <ul>
                {projects.map((project, index) => {
                    const row = Math.floor(index / GRID_COLS)
                    const col = index % GRID_COLS

                    return (
                        <li
                            key={project.id}
                            className={clsx("group folder")}
                            style={{
                                top: `${START_TOP_VH + row * ROW_SPACING_VH}vh`,
                                left: `${START_LEFT_VW + col * COL_SPACING_VW}vw`,
                            }}
                            onClick={() => handleOpenProjectFinder(project)}
                        >
                            <img src="/images/folder.png" alt={project.name} />
                            <p>{project.name}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Home