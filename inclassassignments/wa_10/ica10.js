let triviaBtn = document.querySelector("#js-new-quote").addEventListener("click", newTrivia);
let answerBtn = document.querySelector("#js-tweet").addEventListener("click", newAnswer);

let current = {
    question: "",
    answer: "",
}

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

async function newTrivia() {
    // console.log("Success");

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const json = await response.json();
        displayTrivia(json["question"]);
        current.question = json["question"];
        current.answer = json["answer"];

    } catch (error) {
        console.log(error);
        alert("Failed to get new trivia.");
    }
}

function displayTrivia(question) {
    const questionText = document.querySelector("#js-quote-text");
    const answerText = document.querySelector("#js-answer-text");

    questionText.textContent = question;
    answerText.textContent = "";
}

function newAnswer() {
    // console.log("Success == answer!");
    const answerText = document.querySelector("#js-answer-text");
    answerText.textContent = current.answer;
}

newTrivia();