
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Form1 from './components/Form1'
import Data from './components/Data';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form1 />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
