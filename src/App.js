import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Practice from './Components/Practice';
import Review from './Components/Review';
import {BrowserRouter as Router, Route, Routes, useSearchParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAnswer, getLegend } from './utils/utils';

function App() {

  const [legend, setLegend] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='practice' element={<Practice />} />
          <Route path='review' element={<Review />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
