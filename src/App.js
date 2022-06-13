import './App.css';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from './Home';
import AboutUs from './AboutUs';


function App() {
  return (

    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path="/aboutUs" element={<AboutUs />}></Route>
        </Routes>
      </div>
    </BrowserRouter>

    );
}

export default App;
