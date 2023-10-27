import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Practice from './Components/Practice';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='practice' element={<Practice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
