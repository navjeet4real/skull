import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import "./App.css";
import AboutUs from "./component/AboutUs";
import Login from "./component/Login";
import MemeDashboard from "./component/MemeDashboard";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/aboutUs" element={<AboutUs />}></Route>
            <Route exact path="/dashboard" element={<MemeDashboard />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
