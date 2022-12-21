import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const ResultPage = () => {
    const allResults = useSelector(state => state.game.result);
    const level = useSelector(state => state.game.level);
    const navigate = useNavigate();
    return(
        <div className="result-page">
            <img width="100px" height="100px" alt="check" src="/png.monster-138-370x354.webp" />
            <h3>Game Level: {level}</h3>
            <h4>You won in {allResults.minute} minute(s), {allResults.second} seconds, using {allResults.moves} moves, for {allResults.stars} stars</h4>
            <button className="btn btn-success btn-lg" onClick={() => navigate("/")}>Start Another Game</button>
        </div>
    )
}