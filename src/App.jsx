import React from 'react'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Terminal } from '#windows';
import { Dock, Navbar, Welcome } from '#components'

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />


      <Terminal />
    </main>
  )
}

export default App