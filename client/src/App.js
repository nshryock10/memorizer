import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Practice from './Components/Practice';
import Nav from './Components/Nav';
import LegendInput from './Components/LegendInput';
import {BrowserRouter as Router, Route, Routes, useSearchParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories } from './utils/api';

function App() {

  const [legend, setLegend] = useState(null);
  const [categories, setCategories] = useState()

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    //console.log(categories)
  }, [categories])

  const getData = async () => {

    const setCats = (data) => {
      setCategories(data)
    }

    const data = await getCategories();
    setCats(data)
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/practice' element={<Practice />} />
          <Route exact path='/add' element={<LegendInput />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
