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

document.getElementById("quiz").style.display = "none";
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

let questions = [];
let current = 0;
let score = 0;
let qNum = 0;
let finalScore;

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
    for(let i = 0; i < questions.length; i++){
        if(questions[i].selectedAnswer == questions[i].rightAnswer){
            let q = document.createElement("h3");
            let c = document.createElement("p");
            q.innerHTML = `Question ${i + 1}: ${questions[i].question}`;
            c.innerHTML = `Selected Answer: ${questions[i].selectedAnswer} (Correct)`;
            document.body.appendChild(q);
            document.body.appendChild(c);
        } else {
            let q = document.createElement("h3");
            let c = document.createElement("p");
            let iC = document.createElement("p");
            q.innerHTML = `Question ${i + 1}: ${questions[i].question}`;
            c.innerHTML = `Answer: ${questions[i].rightAnswer}`;
            iC.innerHTML = `Selected Answer: ${questions[i].selectedAnswer} (Incorrect)`;
            document.body.appendChild(q);
            document.body.appendChild(iC);
            document.body.appendChild(c);
        }
    }
}

document.getElementById("new").addEventListener("click", function (){
    qNum++;
    let d = document.createElement("div");
    let l1 = document.createElement("label");
    let n = document.createElement("input");

    l1.innerHTML = "Question: ";
    
    document.getElementById("quizMaker").appendChild(d);
    d.appendChild(l1);
    d.appendChild(n);

    let mode = document.createElement("div");
    let mulChoice = document.createElement("button");
    let tf = document.createElement("button");
    let fitb = document.createElement("button");

    mulChoice.innerHTML = "Multiple Choice";
    tf.innerHTML = "True or false";
    fitb.innerHTML = "Fill in the blank";

    mode.appendChild(mulChoice);
    mode.appendChild(tf);
    mode.appendChild(fitb);
    d.appendChild(mode);

    mulChoice.addEventListener("click", function () {
        mode.style.display = "none";

        let inputMulChoice = document.createElement("div");

        let rightAnswerLabel = document.createElement("label");
        rightAnswerLabel.innerHTML = "Correct Answer: "
        let rightAnswerType = document.createElement("input");

        let wrongAnswerLabel1 = document.createElement("label");
        wrongAnswerLabel1.innerHTML = "Option 2: "
        let wrongAnswerType1 = document.createElement("input");

        let wrongAnswerLabel2 = document.createElement("label");
        wrongAnswerLabel2.innerHTML = "Option 3: "
        let wrongAnswerType2 = document.createElement("input");

        let wrongAnswerLabel3 = document.createElement("label");
        wrongAnswerLabel3.innerHTML = "Option 4: "
        let wrongAnswerType3 = document.createElement("input");

        let submitMulChoice = document.createElement("button");
        submitMulChoice.innerHTML = "generate question";

        submitMulChoice.addEventListener("click", function () {
            q = new multipleChoice(n.value, [rightAnswerType.value], [wrongAnswerType1.value, wrongAnswerType2.value, wrongAnswerType3.value]);
            questions = questions.concat(q);
            d.style.display = "none";
        });

        inputMulChoice.appendChild(rightAnswerLabel);
        inputMulChoice.appendChild(rightAnswerType);

        inputMulChoice.appendChild(wrongAnswerLabel1);
        inputMulChoice.appendChild(wrongAnswerType1);

        inputMulChoice.appendChild(wrongAnswerLabel2);
        inputMulChoice.appendChild(wrongAnswerType2);

        inputMulChoice.appendChild(wrongAnswerLabel3);
        inputMulChoice.appendChild(wrongAnswerType3);

        inputMulChoice.appendChild(submitMulChoice);

        d.appendChild(inputMulChoice);
    })

    tf.addEventListener("click", function () {
        mode.style.display = "none";

        let inputtf = document.createElement("div");

        let answerLabel = document.createElement("label");
        answerLabel.innerHTML = "Answer: ";

        let trueButton = document.createElement("button");
        trueButton.innerHTML = "True"

        let falseButton = document.createElement("button");
        falseButton.innerHTML = "False"

        let submittf = document.createElement("button");
        submittf.innerHTML = "generate question";

        trueButton.addEventListener("click", function () {
            trueButton.classList.add("selected");
            if(falseButton.classList.contains("selected")){
                falseButton.classList.remove("selected");
            }
        });

        falseButton.addEventListener("click", function () {
            falseButton.classList.add("selected");
            if(trueButton.classList.contains("selected")){
                trueButton.classList.remove("selected");
            }
        });

        submittf.addEventListener("click", function () {
            if(trueButton.classList.contains("selected")){
                q = new trueFalse(n.value, true);
                questions = questions.concat(q);
                d.style.display = "none";

            } else if(falseButton.classList.contains("selected")) {
                q = new trueFalse(n.value, false);
                questions = questions.concat(q);
                d.style.display = "none";
            }
        });

        inputtf.appendChild(answerLabel);
        inputtf.appendChild(trueButton);
        inputtf.appendChild(falseButton);
        inputtf.appendChild(submittf);

        d.appendChild(inputtf);
    })
});