import "bootstrap/dist/css/bootstrap.min.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.sass';
import {GamePage, ResultPage} from "./pages";

function App() {

  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/" element={<GamePage />} />
              <Route path="/result-page" element={<ResultPage />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
