import "bootstrap/dist/css/bootstrap.min.css";

import './App.sass';
import {GamePage} from "./components/gamePage";
import {useEffect, useState} from "react";

function App() {
  const [time, setTime] = useState({minute: 0, second: 0})
  useEffect(() => {
      setInterval(function (){
          if(time.second === 59){
              setTime({minute: 1, second: 0})
          }
          else{
              setTime({...time, second: time.second + 1})
          }
      }, 1000)
  })
  return (
    <div className="App">
      <p>{time.minute} : {time.second}</p>
      <h1>Matching Game</h1>
      <GamePage />
    </div>
  );
}

export default App;
