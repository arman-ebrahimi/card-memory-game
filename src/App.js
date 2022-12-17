import "bootstrap/dist/css/bootstrap.min.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.sass';
import {GamePage, ResultPage, StartPage} from "./pages";

function App() {

  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/homePage" element={<GamePage />} />
              <Route path="/result" element={<ResultPage />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
