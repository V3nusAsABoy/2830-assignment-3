class multipleChoice {
    constructor(question, rightAnswer, wrongAnswers) {
        this.question = question;
        this.rightAnswer = rightAnswer;
        this.wrongAnswers = wrongAnswers;
        this.answers = rightAnswer.concat(wrongAnswers);
        this.selectedAnswer;
    }

    generateQuestion() {
        document.getElementById("Question").innerHTML = this.question;
        shuffle(this.answers);
        document.getElementById("option1").innerHTML = this.answers[0];
        document.getElementById("option2").innerHTML = this.answers[1];
        document.getElementById("option3").innerHTML = this.answers[2];
        document.getElementById("option4").innerHTML = this.answers[3];
        document.getElementById("option3").style.display = "block";
        document.getElementById("option4").style.display = "block";
        document.getElementById("textInput").style.display = "none";
    }
}

class trueFalse{
    constructor(question, tf){
        this.question = question;
        if(tf == true){
            this.rightAnswer = "True";
        } else {
            this.rightAnswer = "False";
        }
        this.selectedAnswer;
    }

    generateQuestion(){
        document.getElementById("Question").innerHTML = this.question;
        document.getElementById("option1").innerHTML = "True";
        document.getElementById("option2").innerHTML = "False";
        document.getElementById("option3").style.display = "none";
        document.getElementById("option4").style.display = "none";
        document.getElementById("textInput").style.display = "none";
    }
}

class fillInTheBlank{
    constructor(question, rightAnswer){
        this.question = question;
        this.rightAnswer = rightAnswer;
        this.selectedAnswer;
    }

    generateQuestion(){
        document.getElementById("Question").innerHTML = this.question;
        document.getElementById("option1").style.display = "none";
        document.getElementById("option2").style.display = "none";
        document.getElementById("option3").style.display = "none";
        document.getElementById("option4").style.display = "none";
        document.getElementById("textInput").style.display = "block";
    }
}

let options = document.getElementsByClassName("option");
let buttons = document.getElementsByClassName("button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        buttons[i].classList.toggle("selected");

        for (let j = 0; j < buttons.length; j++) {
            if (i != j) {
                if (buttons[j].classList.contains("selected")) {
                    buttons[j].classList.remove("selected");
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

const q1 = "What's 1 + 1";
const q1Correct = [2];
const q1Incorrect = [1, 4, 5];

const q2 = "What's 1 - 1";
const q2Correct = [0];
const q2Incorrect = [1, 4, 5];

const q3 = "5 x 5 = 25";

const q4 = "What's 4 / 2";
const q4Correct = [2];
const q4Incorrect = [1, 4, 5];

const q5 = "3 + ___ = 8";
const q5Correct = "5";

const question1 = new multipleChoice(q1, q1Correct, q1Incorrect);
const question2 = new multipleChoice(q2, q2Correct, q2Incorrect);
const question3 = new trueFalse(q3, true);
const question4 = new multipleChoice(q4, q4Correct, q4Incorrect);
const question5 = new fillInTheBlank(q5, q5Correct);
const questions = [question1, question2, question3, question4, question5];
let current = 0;
let score = 0;
let finalScore;

document.getElementById("QuestionNum").innerHTML = `Question ${current + 1} out of ${questions.length}`;
question1.generateQuestion();

document.getElementById("next").addEventListener("click", function () {
    for (let i = 0; i < options.length; i++) {
        if (options[i].classList.contains("selected")) {
            questions[current].selectedAnswer = options[i].innerHTML;
            if (questions[current].selectedAnswer == questions[current].rightAnswer) {
                score++;
            }
            options[i].classList.remove("selected");
            i = options.length;
        } else if (options[i].id == "textInput"){
            questions[current].selectedAnswer = options[i].value;
            if (questions[current].selectedAnswer == questions[current].rightAnswer) {
                score++;
            }
        }
    }
    current++;
    if (current != questions.length) {
        questions[current].generateQuestion();
        document.getElementById("QuestionNum").innerHTML = `Question ${current + 1} out of ${questions.length}`;
        if (current == questions.length - 1) {
            document.getElementById("next").innerHTML = "submit";
        }
    } else{
        displayResults();
    }
});

function displayResults(){
    document.getElementById("quiz").style.display = "none";
    document.getElementById("Question").innerHTML = `Final Score: ${score}/${questions.length}`;
}
