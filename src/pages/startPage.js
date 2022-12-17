import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export const StartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = (e) => {
        dispatch({type: "game/gameLevel", payload: e.target.innerText})
    }
    return(
        <div className="start-page">
            <h1>Test your memory in 1 minute</h1>
            <button className="btn btn-success" onClick={handleClick}>Easy</button>
            <button className="btn btn-warning" onClick={handleClick}>Medium</button>
            <button className="btn btn-danger" onClick={handleClick}>Hard</button>
            <button onClick={() => navigate("/homePage")}>Start</button>
        </div>
    )
}