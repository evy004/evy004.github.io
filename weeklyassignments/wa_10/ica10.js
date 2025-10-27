let triviaBtn = document.querySelector("#js-new-quote");
let answerBtn = document.querySelector("#js-tweet");

let current = {
    question: "",
    answer: "",
    anime: "",
}

const endpoint = "https://api.animechan.io/v1/quotes/random";

const guessInput = document.querySelector("#js-guess-input");
const guessBtn = document.querySelector("#js-guess-btn");
const guessFeedback = document.querySelector("#js-guess-feedback");

let attemptsLeft = 3;
const MAX_ATTEMPTS = 3;

function normalize(str = "") {
    return str.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

async function newTrivia() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw Error(response.statusText);
        const json = await response.json();

        const payload = json.data ? json.data : (Array.isArray(json) ? json[0] : json);

        current.question = payload.content || payload.quote || payload.dialog || "";
        if (payload.character) current.answer = payload.character.name || payload.character;
        else current.answer = payload.character || payload.answer || "";

        if (payload.anime) current.anime = payload.anime.name || payload.anime;
        else current.anime = payload.anime || "";

        displayTrivia(current.question);

        attemptsLeft = MAX_ATTEMPTS;
        if (guessInput) {
            guessInput.value = "";
            guessInput.disabled = false;
        }
        if (guessFeedback) {
            guessFeedback.textContent = `You have ${attemptsLeft} attempts.`;
            guessFeedback.className = "info";
        }
    } catch (error) {
        console.error(error);
        const questionText = document.querySelector("#js-quote-text");
        if (questionText) questionText.textContent = "Failed to load quote. Try again.";
    }
}

function displayTrivia(question) {
    const questionText = document.querySelector("#js-quote-text");
    const answerText = document.querySelector("#js-answer-text");

    if (questionText) questionText.textContent = question || "";
    if (answerText) answerText.textContent = ""; 
}

function newAnswer() {
    const answerText = document.querySelector("#js-answer-text");
    if (answerText) {
        const animePart = current.anime ? ` — ${current.anime}` : "";
        answerText.textContent = (current.answer ? current.answer : "Answer not available.") + animePart;
    }
}

function handleGuess() {
    if (!current.answer) {
        if (guessFeedback) { guessFeedback.textContent = "No quote loaded."; guessFeedback.className = "warn"; }
        return;
    }
    if (!guessInput) return;

    const guess = normalize(guessInput.value);
    if (!guess) {
        if (guessFeedback) { guessFeedback.textContent = "Please enter a guess."; guessFeedback.className = "warn"; }
        return;
    }

    const target = normalize(current.answer);
    const correct = (target === guess) || (target.includes(guess)) || (guess.includes(target));

    if (correct) {
        if (guessFeedback) { guessFeedback.textContent = `Correct! It was ${current.answer}.`; guessFeedback.className = "success"; }
        if (guessInput) guessInput.disabled = true;
    } else {
        attemptsLeft -= 1;
        if (attemptsLeft > 0) {
            if (guessFeedback) { guessFeedback.textContent = `Incorrect. ${attemptsLeft} attempt(s) left.`; guessFeedback.className = "warn"; }
        } else {
            if (guessFeedback) { guessFeedback.textContent = `Out of attempts. The answer was ${current.answer}.`; guessFeedback.className = "error"; }
            if (guessInput) guessInput.disabled = true;
            // optionally reveal in answer area as well
            const answerText = document.querySelector("#js-answer-text");
            if (answerText) answerText.textContent = `${current.answer} — ${current.anime || ""}`;
        }
    }
}

if (triviaBtn) triviaBtn.addEventListener("click", newTrivia);
if (answerBtn) answerBtn.addEventListener("click", newAnswer);

if (triviaBtn) {
    triviaBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            newTrivia();
        }
    });
}

if (guessBtn) guessBtn.addEventListener("click", handleGuess);
if (guessInput) {
    guessInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleGuess();
        }
    });
}

newTrivia();