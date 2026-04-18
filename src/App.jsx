import { useState } from 'react'
import Main from './components/Main/Main'
import Header from './components/Header/Header'
import ConstBlock from './components/ConstBlock/ConstBlock'
import './App.css'

function App() {
  const [activeContent, setActiveContent] = useState('todo') // 'home', 'todo', 'converter', 'user'
  
  return (
    <div className='container'>
      <Header activeContent={activeContent} setActiveContent={setActiveContent}/>
      <div className="main">
        <ConstBlock/>
        <Main activeContent={activeContent}/>
      </div>
    </div>  
  )
}

export default App
