import React from 'react'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Contact, Finder, Image, Photos, Resume, Safari, Terminal, Text } from '#windows';
import { Dock, Home, Navbar, Welcome } from '#components'
import { useTheme } from '#hooks/useTheme.js';
import { useAutoFullscreen } from '#hooks/useAutoFullscreen.js';

gsap.registerPlugin(Draggable);

const App = () => {
  useTheme();
  useAutoFullscreen();
  return (
    <main onContextMenu={(e) => e.preventDefault()}>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
      <Home />
    </main>
  )
}

export default App