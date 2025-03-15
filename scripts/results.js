import { finalScoreIndicator } from "./getFinalScore.js";

let finalScore = finalScoreIndicator();

document.getElementById("finalScore").innerHTML = `Final Score: ${finalScore}`;