class multipleChoice {
    constructor(question, rightAnswer, wrongAnswers, id) {
        this.question = question;
        this.rightAnswer = rightAnswer;
        this.wrongAnswers = wrongAnswers;
        this.answers = rightAnswer.concat(wrongAnswers);
        this.id = id;
        this.type = "Multiple Choice";
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
        this.type = "True/False";
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
        this.type = "Fill In The Blanks";
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

function undoComma(input){
    if(typeof input == "string"){
        return input.replace(/,/g, '&#44;');
    }
}

function returnComma(input){
    if(typeof input == "string"){
        return input.replace(/&#44;/g, ',');
    }
}

function undoQuote(input){
    if(typeof input === "string"){
        return input.replace(/"/g, '&quot;')
                    .replace(/'/g, "&#039;");
    }
}

function escapeInput(input) {
    return input.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
}

function reverseEscapeInput(input) {
    if(typeof input === "string"){
        return input.replace(/&amp;/g, "&")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, "'");
    }
}


let questions = [];
let current = 0;
let score = 0;
let qNum = 0;
let finalScore;

document.body.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && document.getElementById("next").style.display != "none" && document.getElementById("quizMaker").style.display === "none") {
    event.preventDefault();
    document.getElementById("next").click();
    }
});

document.body.addEventListener("keypress", function(event) {
    if (event.key === "1" && document.getElementById("option1").style.display === "block" && document.getElementById("quizMaker").style.display == "none") {
    event.preventDefault();
    document.getElementById("option1").click();
    }
});

document.body.addEventListener("keypress", function(event) {
    if (event.key === "2" && document.getElementById("option2").style.display === "block" && document.getElementById("quizMaker").style.display == "none") {
    event.preventDefault();
    document.getElementById("option2").click();
    }
});

document.body.addEventListener("keypress", function(event) {
    if (event.key === "3" && document.getElementById("option3").style.display === "block" && document.getElementById("quizMaker").style.display == "none") {
    event.preventDefault();
    document.getElementById("option3").click();
    }
});

document.body.addEventListener("keypress", function(event) {
    if (event.key === "4" && document.getElementById("option4").style.display === "block" && document.getElementById("quizMaker").style.display == "none") {
    event.preventDefault();
    document.getElementById("option4").click();
    }
});

var input = document.getElementById("myInput");

document.getElementById("next").addEventListener("click", function () {
    for (let i = 0; i < options.length; i++) {
        if (options[i].classList.contains("selected")) {
            questions[current].selectedAnswer = undoQuote(options[i].innerHTML);
            if (questions[current].selectedAnswer == questions[current].rightAnswer) {
                score++;
            }
            options[i].classList.remove("selected");
            i = options.length;
        } else if (options[i].id == "textInput"){
            userInput = undoQuote(escapeInput(options[i].value));
            questions[current].selectedAnswer = userInput;
            if (questions[current].selectedAnswer == questions[current].rightAnswer) {
                score++;
            }
            options[i].value = "";
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
    results = document.createElement("div");
    results.setAttribute("id", "results")
    for(let i = 0; i < questions.length; i++){
        if(questions[i].selectedAnswer == questions[i].rightAnswer){
            let q = document.createElement("h2");
            let c = document.createElement("p");
            q.innerHTML = `Question ${i + 1}: ${questions[i].question}`;
            c.innerHTML = `Selected Answer: ${questions[i].selectedAnswer} &#9989;`;
            results.appendChild(q);
            results.appendChild(c);
        } else {
            let q = document.createElement("h2");
            let c = document.createElement("p");
            let iC = document.createElement("p");
            q.innerHTML = `Question ${i + 1}: ${questions[i].question}`;
            c.innerHTML = `Answer: ${questions[i].rightAnswer}`;
            iC.innerHTML = `Selected Answer: ${questions[i].selectedAnswer} &#10060;`;
            results.appendChild(q);
            results.appendChild(iC);
            results.appendChild(c);
        }
    }

    let restart = document.createElement("button");
    restart.innerHTML = "Start over";

    let newQuiz = document.createElement("button");
    newQuiz.innerHTML = "Make new quiz";

    let editQuiz = document.createElement("button");
    editQuiz.innerHTML = "Edit quiz";

    restart.addEventListener("click", function() {
        document.getElementById("main").removeChild(results);
        document.getElementById("quiz").style.display = "block";
        shuffle(questions);
        document.getElementById("quiz").style.display = "block";
        document.getElementById("QuestionNum").innerHTML = `Question 1 out of ${questions.length}`;
        current = 0;
        score = 0;
        document.getElementById("next").innerHTML = "next";
        questions[0].generateQuestion();      
    });

    newQuiz.addEventListener("click", function(){
        document.getElementById("main").removeChild(results);
        document.getElementById("next").innerHTML = "next";
        document.getElementById("quiz").style.display = "none";
        document.getElementById("quizMaker").style.display = "block";
        document.getElementById("Question").innerHTML = "Welcome to Quizzard!";
        current = 0;
        score = 0;
        questions = [];
        questionDivs = document.getElementsByClassName("dParent");
        e = questionDivs.length;
        for(i = 0; i < e; i++){
            document.getElementById("questionMaker").removeChild(questionDivs[0]);
        }
    });

    editQuiz.addEventListener("click", function(){
        document.getElementById("main").removeChild(results);
        document.getElementById("next").innerHTML = "next";
        document.getElementById("quiz").style.display = "none";
        document.getElementById("quizMaker").style.display = "block";
        document.getElementById("Question").innerHTML = "Welcome to Quizzard!";
        current = 0;
        score = 0;
    });

    results.appendChild(restart);
    results.appendChild(editQuiz);
    results.appendChild(newQuiz);

    document.getElementById("main").appendChild(results);
}

document.getElementById("new").addEventListener("click", function (){
    qNum++;
    let dParent = document.createElement("div");
    dParent.classList.add(qNum);
    dParent.classList.add("dParent")
    let d = document.createElement("div");
    d.setAttribute("id", "d");
    let l1 = document.createElement("label");
    let n = document.createElement("input");
    let QandA = document.createElement("div");
    QandA.setAttribute("id", "QandA");
    let nameOfQ = document.createElement("div");
    nameOfQ.setAttribute("class","labelAndQuestion")
    n.setAttribute("id", `n${qNum}`);

    l1.innerHTML = "Question: ";
    
    document.getElementById("questionMaker").appendChild(dParent);
    dParent.appendChild(d);
    nameOfQ.appendChild(l1);
    nameOfQ.appendChild(n);
    QandA.appendChild(nameOfQ);
    d.appendChild(QandA);

    let mode = document.createElement("div");
    mode.setAttribute("id", "mode");
    let mulChoice = document.createElement("button");
    mulChoice.setAttribute("id", `mulChoice${qNum}`);
    let tf = document.createElement("button");
    tf.setAttribute("id", `tf${qNum}`);
    let fitb = document.createElement("button");
    fitb.setAttribute("id", `fitb${qNum}`);
    let deletee = document.createElement("button");
    let undo = document.createElement("button");
    undo.style.fontSize = "1.5em";

    mulChoice.innerHTML = "Multiple Choice";
    tf.innerHTML = "True or false";
    fitb.innerHTML = "Fill in the blank";
    deletee.innerHTML = "delete";
    undo.innerHTML = "undo";

    mode.appendChild(mulChoice);
    mode.appendChild(tf);
    mode.appendChild(fitb);
    d.appendChild(mode);
    dParent.appendChild(undo);
    QandA.scrollIntoView();
    window.scrollBy(0, -100);

    undo.addEventListener("click", function(){
        document.getElementById("questionMaker").removeChild(dParent);
    });

    deletee.addEventListener("click", function(){
        for(let i = 0; i < questions.length; i++){
            if(questions[i].id == dParent.classList[0]){
                questions.splice(i, 1);
            }
        }
        document.getElementById("questionMaker").removeChild(dParent);
    });

    mulChoice.addEventListener("click", function () {
        mode.style.display = "none";

        let inputMulChoice = document.createElement("div");

        let rightAnswerLabel = document.createElement("label");
        rightAnswerLabel.innerHTML = "Correct Answer: "
        let rightAnswerType = document.createElement("input");
        rightAnswerType.setAttribute("id", `right${qNum}`);
        let rightAnswer = document.createElement("div");
        rightAnswer.setAttribute("class","labelAndQuestion")
        rightAnswer.appendChild(rightAnswerLabel);
        rightAnswer.appendChild(rightAnswerType);

        let wrongAnswerLabel1 = document.createElement("label");
        wrongAnswerLabel1.innerHTML = "Option 2: "
        let wrongAnswerType1 = document.createElement("input");
        wrongAnswerType1.setAttribute("id", `wrong1${qNum}`);
        let wrongAnswer1 = document.createElement("div");
        wrongAnswer1.setAttribute("class","labelAndQuestion")
        wrongAnswer1.appendChild(wrongAnswerLabel1);
        wrongAnswer1.appendChild(wrongAnswerType1);

        let wrongAnswerLabel2 = document.createElement("label");
        wrongAnswerLabel2.innerHTML = "Option 3: "
        let wrongAnswerType2 = document.createElement("input");
        wrongAnswerType2.setAttribute("id", `wrong2${qNum}`);
        let wrongAnswer2 = document.createElement("div");
        wrongAnswer2.setAttribute("class","labelAndQuestion")
        wrongAnswer2.appendChild(wrongAnswerLabel2);
        wrongAnswer2.appendChild(wrongAnswerType2);

        let wrongAnswerLabel3 = document.createElement("label");
        wrongAnswerLabel3.innerHTML = "Option 4: "
        let wrongAnswerType3 = document.createElement("input");
        wrongAnswerType3.setAttribute("id",`wrong3${qNum}`);
        let wrongAnswer3 = document.createElement("div")
        wrongAnswer3.setAttribute("class","labelAndQuestion")
        wrongAnswer3.appendChild(wrongAnswerLabel3);
        wrongAnswer3.appendChild(wrongAnswerType3);

        let submitMulChoice = document.createElement("button");
        submitMulChoice.setAttribute("id", `submit${qNum}`);
        submitMulChoice.innerHTML = "generate question";

        let editMulChoice = document.createElement("button");
        editMulChoice.innerHTML = "edit";

        let editAndDelete = document.createElement("div");
        editAndDelete.setAttribute("id", "editAndDelete");

        editAndDelete.appendChild(editMulChoice);
        editAndDelete.appendChild(deletee);

        editMulChoice.addEventListener("click", function() {
            d.style.display = "block";
            undo.style.display = "none";
            submitMulChoice.style.display = "none";
            editAndDelete.style.display = "none";
            let saveChangesMulChoice = document.createElement("button");
            saveChangesMulChoice.innerHTML = "save changes";
            saveChangesMulChoice.addEventListener("click", function(){
                for(let i = 0; i < questions.length; i++){
                    if(dParent.classList.contains(questions[i].id)){
                        nameOfQuestion = escapeInput(n.value);
                        correctAns = [escapeInput(rightAnswerType.value)];
                        wrongAns = [escapeInput(wrongAnswerType1.value), escapeInput(wrongAnswerType2.value), escapeInput(wrongAnswerType3.value)];
                        newId = questions[i].id;
                        questions[i] = new multipleChoice(nameOfQuestion, correctAns, wrongAns, newId);
                        document.getElementById(`questionTitle${dParent.className}`).innerHTML = nameOfQuestion;
                        d.style.display = "none";
                        editAndDelete.style.display = "block";
                        d.removeChild(saveChangesMulChoice);
                    }
                }
            });
            d.appendChild(saveChangesMulChoice);
        });

        submitMulChoice.addEventListener("click", function () {
            if(n.value && rightAnswerType.value && wrongAnswerType1.value && wrongAnswerType2.value && wrongAnswerType3.value && ensureAllAreUnique() == true){
                nameOfQuestion = escapeInput(n.value);
                correctAns = [escapeInput(rightAnswerType.value)];
                wrongAns = [escapeInput(wrongAnswerType1.value), escapeInput(wrongAnswerType2.value), escapeInput(wrongAnswerType3.value)];
                q = new multipleChoice(nameOfQuestion, correctAns, wrongAns, dParent.classList[0]);
                questions = questions.concat(q);
                d.style.display = "none";
                undo.style.display = "none";
                questionTitle = document.createElement("h2");
                questionTitle.setAttribute("id", `questionTitle${dParent.className}`);
                questionTitle.innerHTML = nameOfQuestion;
                dParent.appendChild(questionTitle);
                dParent.appendChild(editAndDelete);
            }
            if(ensureAllAreUnique() == false){
                alert("Please make sure all the options for this question are distinct.")
            }
            if(!(n.value && rightAnswerType.value && wrongAnswerType1.value && wrongAnswerType2.value && wrongAnswerType3.value)){
                alert("Please fill in all input fields before generating a question.");
            }
        });

        function ensureAllAreUnique(){
            allAreUnique = true;
            submittedAnswers = [rightAnswerType.value, wrongAnswerType1.value, wrongAnswerType2.value, wrongAnswerType3.value];
            for(i = 0; i < submittedAnswers.length; i++){
                for(j = i + 1; j < submittedAnswers.length; j++){
                    if(submittedAnswers[i] == submittedAnswers[j]){
                        allAreUnique = false;
                    }
                }
            }
            return allAreUnique;
        }

        inputMulChoice.appendChild(rightAnswer);

        inputMulChoice.appendChild(wrongAnswer1);

        inputMulChoice.appendChild(wrongAnswer2);

        inputMulChoice.appendChild(wrongAnswer3);

        inputMulChoice.appendChild(submitMulChoice);

        QandA.appendChild(inputMulChoice);
    })

    tf.addEventListener("click", function () {
        mode.style.display = "none";

        let inputtf = document.createElement("div");

        let answerLabel = document.createElement("label");
        answerLabel.innerHTML = "Answer: ";

        let trueButton = document.createElement("button");
        trueButton.setAttribute("id", `true${qNum}`);
        trueButton.innerHTML = "True";

        let falseButton = document.createElement("button");
        falseButton.setAttribute("id", `false${qNum}`);
        falseButton.innerHTML = "False";

        let answer = document.createElement("div");
        answer.appendChild(answerLabel);
        answer.appendChild(trueButton);
        answer.appendChild(falseButton);
        answer.setAttribute("id", "tfAnswer")

        let submittf = document.createElement("button");
        submittf.setAttribute("id", `submit${qNum}`);
        submittf.innerHTML = "generate question";
        let edittf = document.createElement("button");
        edittf.innerHTML = "edit";

        let editAndDelete = document.createElement("div");
        editAndDelete.setAttribute("id", "editAndDelete");

        editAndDelete.appendChild(edittf);
        editAndDelete.appendChild(deletee);

        edittf.addEventListener("click", function() {
            d.style.display = "block";
            undo.style.display = "none";
            undo.style.display = "none";
            submittf.style.display = "none";
            editAndDelete.style.display = "none";
            let saveChangestf = document.createElement("button");
            saveChangestf.innerHTML = "save changes";
            saveChangestf.addEventListener("click", function(){
                for(let i = 0; i < questions.length; i++){
                    if(dParent.classList.contains(questions[i].id)){
                        if(trueButton.classList.contains("selected")){
                            nameOfQuestion = escapeInput(n.value);
                            newId = questions[i].id;
                            questions[i] = new trueFalse(nameOfQuestion, true, newId);
                            document.getElementById(`questionTitle${dParent.className}`).innerHTML = nameOfQuestion;
                            d.style.display = "none";
                            editAndDelete.style.display = "block";
                            d.removeChild(saveChangestf);
        
                        } else if(falseButton.classList.contains("selected")) {
                            nameOfQuestion = escapeInput(n.value);
                            newId = questions[i].id;
                            questions[i] = new trueFalse(nameOfQuestion, false, newId);
                            document.getElementById(`questionTitle${dParent.className}`).innerHTML = nameOfQuestion;
                            d.style.display = "none";
                            editAndDelete.style.display = "block";
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
                    nameOfQuestion = escapeInput(n.value);
                    q = new trueFalse(nameOfQuestion, true, dParent.classList[0]);
                    questions = questions.concat(q);
                    d.style.display = "none";
                    undo.style.display = "none";
                    questionTitle = document.createElement("h2");
                    questionTitle.setAttribute("id", `questionTitle${dParent.className}`);
                    questionTitle.innerHTML = nameOfQuestion;
                    dParent.appendChild(questionTitle);
                    dParent.appendChild(editAndDelete);

                } else if(falseButton.classList.contains("selected")) {
                    nameOfQuestion = escapeInput(n.value);
                    q = new trueFalse(nameOfQuestion, false, dParent.classList[0]);
                    questions = questions.concat(q);
                    d.style.display = "none";
                    undo.style.display = "none";
                    questionTitle = document.createElement("h2");
                    questionTitle.setAttribute("id", `questionTitle${dParent.className}`);
                    questionTitle.innerHTML = nameOfQuestion;
                    dParent.appendChild(questionTitle);
                    dParent.appendChild(editAndDelete);
                } else {
                    alert("Please indicate whether the question is true or false.");
                }
            } else {
                alert("Please fill in the input field before generating a question.");
            }
        });

        inputtf.appendChild(answer);
        inputtf.appendChild(submittf);

        d.appendChild(inputtf);
    })

    fitb.addEventListener("click", function () {
        mode.style.display = "none";

        let inputfitb = document.createElement("div");

        let answerLabel = document.createElement("label");
        answerLabel.innerHTML = "Answer: ";

        let answerType = document.createElement("input");
        answerType.setAttribute("id", `right${qNum}`);
        
        let answer = document.createElement("div");
        answer.setAttribute("class", "labelAndQuestion");

        answer.appendChild(answerLabel);
        answer.appendChild(answerType);

        let submitfitb = document.createElement("button");
        submitfitb.setAttribute("id", `submit${qNum}`);
        submitfitb.innerHTML = "generate question";

        let editfitb = document.createElement("button");
        editfitb.innerHTML = "edit";

        let editAndDelete = document.createElement("div");
        editAndDelete.setAttribute("id", "editAndDelete");

        editAndDelete.appendChild(editfitb);
        editAndDelete.appendChild(deletee);

        editfitb.addEventListener("click", function() {
            d.style.display = "block";
            undo.style.display = "none";
            submitfitb.style.display = "none";
            editAndDelete.style.display = "none";
            let saveChangesfitb = document.createElement("button");
            saveChangesfitb.innerHTML = "save changes";
            saveChangesfitb.addEventListener("click", function(){
                if(n.value && answerType.value){
                    if(n.value.includes("_")){
                        for(let i = 0; i < questions.length; i++){
                            if(dParent.classList.contains(questions[i].id)){
                                nameOfQuestion = escapeInput(n.value);
                                answerToQuestion = escapeInput(answerType.value);
                                questions[i] = new fillInTheBlank(nameOfQuestion, answerToQuestion, dParent.className);
                                document.getElementById(`questionTitle${dParent.className}`).innerHTML = nameOfQuestion;
                                d.style.display = "none";
                                editAndDelete.style.display = "block";
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
                    nameOfQuestion = escapeInput(n.value);
                    answerToQuestion = escapeInput(answerType.value);
                    q = new fillInTheBlank(nameOfQuestion, answerToQuestion, dParent.classList[0]);
                    questions = questions.concat(q);
                    undo.style.display = "none";
                    d.style.display = "none";
                    questionTitle = document.createElement("h2");
                    questionTitle.setAttribute("id", `questionTitle${dParent.className}`);
                    questionTitle.innerHTML = nameOfQuestion;
                    dParent.appendChild(questionTitle);
                    dParent.appendChild(editAndDelete);
                } else {
                    alert("The question must include a _ since it's a fill in the blank question.");
                }
            } else {
                alert("Please fill in the input fields before generating a question.");
            }
        });

        QandA.appendChild(answer);
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

document.getElementById("privacy").addEventListener("click", function(){
    window.open("../privacypolicy.html");
})

document.getElementById("guide").addEventListener("click", function(){
    window.open("../guide.html");
})

function parseCSV(csvData) {
    const questionsImported = [];
    const lines = csvData.split("\n");

    for (let line of lines) {
        line = line.trim();
        if (line) {
            const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            const adjustedColumns = columns.map(column => column.replace(/^"|"$/g, ""));
            questionsImported.push(adjustedColumns);
        }
    }
    return questionsImported;
}

document.getElementById("csvFileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const csvData = e.target.result;
            const rows = parseCSV(csvData);
            makeQuizFromCSV(rows);
        };
        reader.readAsText(file);
    }
});

function makeQuizFromCSV(importedQs){
    for(let i = 1; i < importedQs.length; i++){
        document.getElementById("new").click();
        document.getElementById(`n${qNum}`).value = returnComma(importedQs[i][0]);
        if(importedQs[i][1] == "Multiple choice"){
            document.getElementById(`mulChoice${qNum}`).click();
            document.getElementById(`right${qNum}`).value = returnComma(importedQs[i][2]);
            document.getElementById(`wrong1${qNum}`).value = returnComma(importedQs[i][3]);
            document.getElementById(`wrong2${qNum}`).value = returnComma(importedQs[i][4]);
            document.getElementById(`wrong3${qNum}`).value = returnComma(importedQs[i][5]);
        } else if(importedQs[i][1] == "Tf"){
            document.getElementById(`tf${qNum}`).click();
            if(importedQs[i][2] == "True"){
                document.getElementById(`true${qNum}`).click();
            } else {
                document.getElementById(`false${qNum}`).click();
            }
        } else{
            document.getElementById(`fitb${qNum}`).click();
            document.getElementById(`right${qNum}`).value = returnComma(importedQs[i][2]);
        }
        document.getElementById(`submit${qNum}`).click();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

document.getElementById("export").addEventListener("click", function(){
    if(questions.length == 0){
        window.alert("You have not created any questions.")
    } else {
        exportCSV();
    }
});

function exportCSV(){
    toExport = [["Question", "Type", "Right Answer", "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]];
    for(let i = 0; i < questions.length; i++){
        if(questions[i].type === "Multiple Choice"){
            toExport.push([undoComma(reverseEscapeInput(questions[i].question)), "Multiple choice", undoComma(reverseEscapeInput(questions[i].rightAnswer[0])), undoComma(reverseEscapeInput(questions[i].wrongAnswers[0])), undoComma(reverseEscapeInput(questions[i].wrongAnswers[1])), undoComma(reverseEscapeInput(questions[i].wrongAnswers[2]))]);
        } else if(questions[i].type === "True/False"){
            toExport.push([undoComma(reverseEscapeInput(questions[i].question)), "Tf", undoComma(reverseEscapeInput(questions[i].rightAnswer))]);
        } else {
            toExport.push([undoComma(reverseEscapeInput(questions[i].question)), "Fitb", undoComma(reverseEscapeInput(questions[i].rightAnswer))]);
        }
    }
    let csvContent = toExport.map(e => e.join(",")).join("\n");
    let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    let url = URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "questions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById("colorBlind").addEventListener("click", function(){
   const buttons =  document.getElementsByTagName("button");
   for (var i = 0; i < buttons.length; i++){
    if(buttons[i].innerHTML != "adjust font:"){
        buttons[i].classList.toggle("colorBlind");
    }
}
});

document.getElementById("darkMode").addEventListener("click", function(){
    if(document.getElementById("darkMode").innerHTML == "dark mode"){
        document.querySelector("link").href = "./styles/darkmodemain.css";
        document.getElementById("darkMode").innerHTML = "light mode";
    } else{
        document.querySelector("link").href = "./styles/main.css";
        document.getElementById("darkMode").innerHTML = "dark mode";
    }
});

plusminus = 0;

document.getElementById("plusle").addEventListener("click", function(){
    if(plusminus < 0.5){
        plusminus+=0.5;
        ps = document.getElementsByTagName("p");
        h1s = document.getElementsByTagName("h1");
        h2s = document.getElementsByTagName("h2");
        optionsForQuiz = document.getElementsByClassName("option");
        newPSize = `${1.5 + plusminus}`;
        newh1size = `${3.5 + plusminus}`;
        newh2size = `${2 + plusminus}`;
        newOptionSize = `${1.1 + plusminus}`;
        for(i = 0; i < ps.length; i++){
            ps[i].style.fontSize = `${newPSize}em`;
        }
        for(i = 0; i < h1s.length; i++){
            h1s[i].style.fontSize = `${newh1size}em`;
        }
        for(i = 0; i < h2s.length; i++){
            h2s[i].style.fontSize = `${newh2size}em`;
        }
        for(i = 0; i < optionsForQuiz.length; i++){
            optionsForQuiz[i].style.fontSize = `${newOptionSize}em`;
        }
    }
});

document.getElementById("minun").addEventListener("click", function(){
    if(plusminus > -0.5){
        plusminus-=0.5;
        ps = document.getElementsByTagName("p");
        h1s = document.getElementsByTagName("h1");
        h2s = document.getElementsByTagName("h2");
        optionsForQuiz = document.getElementsByClassName("option");
        newPSize = `${1.5 + plusminus}`;
        newh1size = `${3.5 + plusminus}`;
        newh2size = `${2 + plusminus}`;
        newOptionSize = `${1.1 + plusminus}`;
        for(i = 0; i < ps.length; i++){
            ps[i].style.fontSize = `${newPSize}em`;
        }
        for(i = 0; i < h1s.length; i++){
            h1s[i].style.fontSize = `${newh1size}em`;
        }
        for(i = 0; i < h2s.length; i++){
            h2s[i].style.fontSize = `${newh2size}em`;
        }
        for(i = 0; i < optionsForQuiz.length; i++){
            optionsForQuiz[i].style.fontSize = `${newOptionSize}em`;
        }
    }
});