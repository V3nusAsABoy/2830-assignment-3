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
    }
}

let options = document.getElementsByClassName("option");

for (let i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function () {
        options[i].classList.toggle("selected");

        for (let j = 0; j < options.length; j++) {
            if (i != j) {
                if (options[j].classList.contains("selected")) {
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

const q1 = "What's 1 + 1";
const q1Correct = [2];
const q1Incorrect = [1, 4, 5];

const q2 = "What's 1 - 1";
const q2Correct = [0];
const q2Incorrect = [1, 4, 5];

const question1 = new multipleChoice(q1, q1Correct, q1Incorrect);
const question2 = new multipleChoice(q2, q2Correct, q2Incorrect);
const questions = [question1, question2];
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
