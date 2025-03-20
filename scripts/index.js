class multipleChoice {
    constructor(question, rightAnswer, wrongAnswers, id) {
        this.question = question;
        this.rightAnswer = rightAnswer;
        this.wrongAnswers = wrongAnswers;
        this.answers = rightAnswer.concat(wrongAnswers);
        this.id = id;
        this.selectedAnswer;
    }

    generateQuestion() {
        document.getElementById("Question").innerHTML = this.question;
        shuffle(this.answers);
        document.getElementById("option1").innerHTML = this.answers[0];
        document.getElementById("option2").innerHTML = this.answers[1];
        document.getElementById("option3").innerHTML = this.answers[2];
        document.getElementById("option4").innerHTML = this.answers[3];
        document.getElementById("option1").style.display = "block";
        document.getElementById("option2").style.display = "block";
        document.getElementById("option3").style.display = "block";
        document.getElementById("option4").style.display = "block";
        document.getElementById("textInput").style.display = "none";
    }
}

class trueFalse{
    constructor(question, tf, id){
        this.question = question;
        if(tf == true){
            this.rightAnswer = "True";
        } else {
            this.rightAnswer = "False";
        }
        this.selectedAnswer;
        this.id = id;
    }

    generateQuestion(){
        document.getElementById("Question").innerHTML = this.question;
        document.getElementById("option1").innerHTML = "True";
        document.getElementById("option2").innerHTML = "False";
        document.getElementById("option1").style.display = "block";
        document.getElementById("option2").style.display = "block";
        document.getElementById("option3").style.display = "none";
        document.getElementById("option4").style.display = "none";
        document.getElementById("textInput").style.display = "none";
    }
}

class fillInTheBlank{
    constructor(question, rightAnswer, id){
        this.question = question;
        this.rightAnswer = rightAnswer;
        this.selectedAnswer;
        this.id = id;
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

var input = document.getElementById("myInput");

document.body.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("next").click();
    }
});

document.body.addEventListener("keypress", function(event) {
    if (event.key === "1") {
      event.preventDefault();
      document.getElementById("option1").click();
    }
});

document.body.addEventListener("keypress", function(event) {
    if (event.key === "2") {
      event.preventDefault();
      document.getElementById("option2").click();
    }
});

document.body.addEventListener("keypress", function(event) {
    if (event.key === "3") {
      event.preventDefault();
      document.getElementById("option3").click();
    }
});

document.body.addEventListener("keypress", function(event) {
    if (event.key === "4") {
      event.preventDefault();
      document.getElementById("option4").click();
    }
});

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
    let dParent = document.createElement("div");
    dParent.classList.add(qNum);
    let d = document.createElement("div");
    let l1 = document.createElement("label");
    let n = document.createElement("input");

    l1.innerHTML = "Question: ";
    
    document.getElementById("quizMaker").appendChild(dParent);
    dParent.appendChild(d);
    d.appendChild(l1);
    d.appendChild(n);

    let mode = document.createElement("div");
    let mulChoice = document.createElement("button");
    let tf = document.createElement("button");
    let fitb = document.createElement("button");
    let deletee = document.createElement("button");

    mulChoice.innerHTML = "Multiple Choice";
    tf.innerHTML = "True or false";
    fitb.innerHTML = "Fill in the blank";
    deletee.innerHTML = "delete";

    mode.appendChild(mulChoice);
    mode.appendChild(tf);
    mode.appendChild(fitb);
    d.appendChild(mode);

    deletee.addEventListener("click", function(){
        for(let i = 0; i < questions.length; i++){
            questions.splice(i, 1);
        }
        document.getElementById("quizMaker").removeChild(dParent);
    });

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

        let editMulChoice = document.createElement("button");
        editMulChoice.innerHTML = "edit";

        editMulChoice.addEventListener("click", function() {
            d.style.display = "block";
            submitMulChoice.style.display = "none";
            editMulChoice.style.display = "none";
            deletee.style.display = "none";
            let saveChangesMulChoice = document.createElement("button");
            saveChangesMulChoice.innerHTML = "save changes";
            saveChangesMulChoice.addEventListener("click", function(){
                for(let i = 0; i < questions.length; i++){
                    if(questions[i].id == dParent.className){
                        questions[i] = new multipleChoice(n.value, [rightAnswerType.value], [wrongAnswerType1.value, wrongAnswerType2.value, wrongAnswerType3.value], dParent.className);
                        d.style.display = "none";
                        editMulChoice.style.display = "block";
                        deletee.style.display = "block";
                        d.removeChild(saveChangesMulChoice);
                    }
                }
            });
            d.appendChild(saveChangesMulChoice);
        });

        submitMulChoice.addEventListener("click", function () {
            if(n.value && rightAnswerType.value && wrongAnswerType1.value && wrongAnswerType2.value && wrongAnswerType3.value){
                q = new multipleChoice(n.value, [rightAnswerType.value], [wrongAnswerType1.value, wrongAnswerType2.value, wrongAnswerType3.value], dParent.className);
                questions = questions.concat(q);
                d.style.display = "none";
                questionTitle = document.createElement("h2");
                questionTitle.innerHTML = n.value;
                dParent.appendChild(questionTitle);
                dParent.appendChild(editMulChoice);
                dParent.appendChild(deletee);
            }
            else{
                alert("Please fill in all input fields before generating a question.");
            }
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
        let edittf = document.createElement("button");
        edittf.innerHTML = "edit";

        edittf.addEventListener("click", function() {
            d.style.display = "block";
            submittf.style.display = "none";
            edittf.style.display = "none";
            deletee.style.display = "none";
            let saveChangestf = document.createElement("button");
            saveChangestf.innerHTML = "save changes";
            saveChangestf.addEventListener("click", function(){
                for(let i = 0; i < questions.length; i++){
                    if(questions[i].id == dParent.className){
                        if(trueButton.classList.contains("selected")){
                            questions[i] = new trueFalse(n.value, true, qNum);;
                            d.style.display = "none";
                            edittf.style.display = "block";
                            deletee.style.display = "block";
                            d.removeChild(saveChangestf);
        
                        } else if(falseButton.classList.contains("selected")) {
                            questions[i] = new trueFalse(n.value, false, qNum);
                            d.style.display = "none";
                            edittf.style.display = "block";
                            deletee.style.display = "block";
                            d.removeChild(saveChangestf);
                        } else {
                            alert("Please indicate whether the question is true or false.");
                        }
                    }
                }
            });
            d.appendChild(saveChangestf);
        });

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
            if(n.value){
                if(trueButton.classList.contains("selected")){
                    q = new trueFalse(n.value, true, qNum);
                    questions = questions.concat(q);
                    d.style.display = "none";
                    questionTitle = document.createElement("h2");
                    questionTitle.innerHTML = n.value;
                    dParent.appendChild(questionTitle);
                    dParent.appendChild(edittf);

                } else if(falseButton.classList.contains("selected")) {
                    q = new trueFalse(n.value, false, qNum);
                    questions = questions.concat(q);
                    d.style.display = "none";
                    questionTitle = document.createElement("h2");
                    questionTitle.innerHTML = n.value;
                    dParent.appendChild(questionTitle);
                    dParent.appendChild(edittf);
                    dParent.appendChild(deletee);
                } else {
                    alert("Please indicate whether the question is true or false.");
                }
            } else {
                alert("Please fill in the input field before generating a question.");
            }
        });

        inputtf.appendChild(answerLabel);
        inputtf.appendChild(trueButton);
        inputtf.appendChild(falseButton);
        inputtf.appendChild(submittf);

        d.appendChild(inputtf);
    })

    fitb.addEventListener("click", function () {
        mode.style.display = "none";

        let inputfitb = document.createElement("div");

        let answerLabel = document.createElement("label");
        answerLabel.innerHTML = "Answer: ";

        let answerType = document.createElement("input");

        let submitfitb = document.createElement("button");
        submitfitb.innerHTML = "generate question";

        let editfitb = document.createElement("button");
        editfitb.innerHTML = "edit";

        editfitb.addEventListener("click", function() {
            d.style.display = "block";
            submitfitb.style.display = "none";
            editfitb.style.display = "none";
            deletee.style.display = "none";
            let saveChangesfitb = document.createElement("button");
            saveChangesfitb.innerHTML = "save changes";
            saveChangesfitb.addEventListener("click", function(){
                if(n.value && answerType.value){
                    if(n.value.includes("_")){
                        for(let i = 0; i < questions.length; i++){
                            if(questions[i].id == dParent.className){
                                questions[i] = new fillInTheBlank(n.value, answerType.value, dParent.className);
                                d.style.display = "none";
                                editfitb.style.display = "block";
                                deletee.style.display = "block";
                                d.removeChild(saveChangesfitb);
                            }
                        }
                    } else {
                        alert("The question must include a _ since it's a fill in the blank question.");
                    }
                } else {
                    alert("Please fill in the input fields before generating a question.");
                }
            });
            d.appendChild(saveChangesfitb);
        });

        submitfitb.addEventListener("click", function () {
            if(n.value && answerType.value){
                if(n.value.includes("_")){
                    q = new fillInTheBlank(n.value, answerType.value, dParent.className);
                    questions = questions.concat(q);
                    d.style.display = "none";
                    questionTitle = document.createElement("h2");
                    questionTitle.innerHTML = n.value;
                    dParent.appendChild(questionTitle);
                    dParent.appendChild(editfitb);
                    dParent.appendChild(deletee);
                } else {
                    alert("The question must include a _ since it's a fill in the blank question.");
                }
            } else {
                alert("Please fill in the input fields before generating a question.");
            }
        });

        inputfitb.appendChild(answerLabel);
        inputfitb.appendChild(answerType);
        inputfitb.appendChild(submitfitb);

        d.appendChild(inputfitb);
    })
});

document.getElementById("start").addEventListener("click", function() {
    if(questions.length > 0){
        document.getElementById("quizMaker").style.display = "none";
        shuffle(questions);
        document.getElementById("quiz").style.display = "block";
        document.getElementById("QuestionNum").innerHTML = `Question 1 out of ${questions.length}`;
        questions[0].generateQuestion();
    } else {
        alert("You have not created any questions.");
    }
});