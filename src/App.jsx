import React from 'react'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Contact, Finder, Image, Photos, Resume, Safari, Terminal, Text } from '#windows';
import { Dock, Home, Navbar, Welcome } from '#components'
import { useTheme } from '#hooks/useTheme.js';

gsap.registerPlugin(Draggable);

const App = () => {
  useTheme();
  return (
    <main>
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