import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Application from './Components/Application/Application';
import Home from './Components/Home'
import HRDashboard from './Components/HR/HRDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HRDashboard" element={<HRDashboard />} />
        <Route path="/Application" element={<Application />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App