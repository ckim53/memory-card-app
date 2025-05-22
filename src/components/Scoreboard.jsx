export default function Scoreboard ({score, winStatus, restart, best}) {
    return winStatus ? 
    ( <div id="win">
    You Win!<button id='restart-button' onClick={restart}>Play Again</button>
    </div> ) 
    : ( <div id="scoreboard">
        <div className="score">
            Score: {score} <br></br>
            Best Score: {best}
        </div>
    </div> );
}