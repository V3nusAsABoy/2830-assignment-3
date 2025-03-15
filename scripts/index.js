class multipleChoice{
    constructor(question, rightAnswer, wrongAnswers){
        this.question = question;
        this.rightAnswer = rightAnswer;
        this.wrongAnswers = wrongAnswers;
        this.answers = rightAnswer.concat(wrongAnswers);
        this.selectedAnswer;
    }

    generateQuestion(){
        document.getElementById("Question").innerHTML = this.question;
        shuffle(this.answers);
        document.getElementById("option1").innerHTML = this.answers[0];
        document.getElementById("option2").innerHTML = this.answers[1];
        document.getElementById("option3").innerHTML = this.answers[2];
        document.getElementById("option4").innerHTML = this.answers[3];
    }
}

let options = document.getElementsByClassName("option");

for(let i = 0; i < options.length; i++){

    options[i].addEventListener("click", function(){

        options[i].classList.toggle("selected");

        for(let j = 0; j < options.length; j++){
            if(i != j){
                if(options[j].classList.contains("selected")){
                    options[j].classList.remove("selected");
                }
            }
        }
    });
}

function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

q1 = "What's 1 + 1";
q1Correct = [2];
q1Incorrect = [1, 4, 5];

q2 = "What's 1 - 1";
q2Correct = [0];
q2Incorrect = [1, 4, 5];

const question1 = new multipleChoice(q1, q1Correct, q1Incorrect);
const question2 = new multipleChoice(q2, q2Correct, q2Incorrect);
const questions = [question1, question2]
currentQuestion = questions[0];
current = 0;
currentQuestion.generateQuestion();

document.getElementById("next").addEventListener("click", function(){
    for(let i = 0; i < options.length; i++){
        if(options[i].classList.contains("selected")){
            currentQuestion.selectedAnswer = options[i].innerHTML;
            options[i].classList.remove("selected");
        }
        current++;
        currentQuestion = questions[current];
        currentQuestion.generateQuestion();
    }
});