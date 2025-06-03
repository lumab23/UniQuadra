import Home from './pages/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Carteirinha from './pages/Carteirinha'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/carteirinha' element={<Carteirinha/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;