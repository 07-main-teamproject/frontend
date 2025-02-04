import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CustomArrows from "./components/Main"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DailyDiet from "./components/DailyDiet";


const App: React.FC = () => {
  return (
    <Router>
      <div className="pt-16"> 
        <Header />
        <Routes>
          
        </Routes>
      </div>
      <CustomArrows/>
      <DailyDiet/>
    </Router>
  );
};


export default App;
