import { getFinalScore } from "./index.js";

let final = getFinalScore();
console.log(final);

document.getElementById("finalScore").innerHTML = `Final Score: ${final}`;