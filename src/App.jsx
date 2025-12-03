import React from 'react'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Contact, Finder, Image, Photos, Resume, Safari, Terminal, Text } from '#windows';
import { Dock, Home, Navbar, Welcome } from '#components'

gsap.registerPlugin(Draggable);

const App = () => {
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