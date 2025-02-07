import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const App: React.FC = () => {
  return (
    <Router>
      <div className="pt-16"> 
        <Header />
      </div>
    </Router>
  );
};


export default App;
