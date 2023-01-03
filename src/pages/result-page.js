import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const ResultPage = () => {
    const allResults = useSelector(state => state.game.result);
    const level = useSelector(state => state.game.level);
    const navigate = useNavigate();

    useEffect(() => {
        const audio = new Audio("/tada-fanfare-a-6313.mp3");
        audio.volume = 0.4;
        audio.play().then();
    },[])
    return(
        <div className="result-page">
            <img width="100px" height="100px" alt="check" src="/png.monster-138-370x354.webp" />
            <h3>Game Level: {level}</h3>
            <h4>You won in {allResults.second} seconds<br />using {allResults.moves} moves<br />for {allResults.stars} stars</h4>
            <button className="btn btn-success btn-lg" onClick={() => navigate("/")}>Start Another Game</button>
        </div>
    )
}