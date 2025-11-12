// import { useState } from 'react'
import './App.css'

function App() {

  return (
    <main>
      <div id='court'>
        <section id='top'>
          <div className='services'>
            <div className='service1'/>
            <div className='service2'/>
          </div>
          <div id='kitchen1'/>
        </section>
        <section id='bottom'>
          <div id='kitchen2'/>
          <div className='services'>
            <div className='service1'/>
            <div className='service2'/>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App