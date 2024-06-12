import {redirect } from 'react-router-dom'
import { useStartNewChat } from '../hooks/useStartNewChat'


export default function Dashboard() { 
  const mutatation = useStartNewChat()
  const handleChatClick = () => { 
    console.log('Start New Chat')
    mutatation.mutate()
  }


  return (
      <div>
        <h1>Dashboard</h1>
        <h2>Zee Dashboard</h2>
        <div>
          <button onClick={handleChatClick}>
            Start New Chat
          </button>
        </div>
      </div>
  )
}