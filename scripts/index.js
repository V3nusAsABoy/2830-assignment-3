class multipleChoice{
    constructor(question, rightAnswer, wrongAnswers){
        this.question = question;
        this.rightAnswer = rightAnswer;
        this.wrongAnswers = wrongAnswers;
        this.answers = rightAnswer.concat(wrongAnswers);
    }

    generateQuestion(multipleChoice){
        
    }
}

q1 = "What's 1 + 1";
q1Correct = [2];
q1Incorrect = [1, 4, 5];

const question1 = new multipleChoice(q1, q1Correct, q1Incorrect);

