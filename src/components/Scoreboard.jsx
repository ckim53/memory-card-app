export default function Scoreboard ({score, winStatus, restart}) {
    return winStatus ? 
    ( <div id="win">
    You Win!  
    <button id='restart-button' onClick={restart}>Play Again</button>
    </div> ) 
    : ( <div id="score">
    Score: {score}
    </div> );
}