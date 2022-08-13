import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Application from './Components/Application/Application';
import Home from './Components/Home'
import HRDash from './Components/HR/HRDash'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HRDash" element={<HRDash />} />
        <Route path="/Application" element={<Application />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App