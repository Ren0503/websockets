import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChatScreen, LoginScreen } from './screens'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/chat/:username' element={<ChatScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
