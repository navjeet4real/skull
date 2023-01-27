import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import "./App.css";
import AboutUs from "./component/AboutUs";
import Login from "./component/Login";
import MemeDashboard from "./component/MemeDashboard";
import Router from "./Routes";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Router />
        </div>
      </BrowserRouter>
  );
}

export default App;
