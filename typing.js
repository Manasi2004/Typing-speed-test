const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A journey of a thousand miles begins with a single step.",
    "Actions speak louder than words.",
    "Beauty is in the eye of the beholder.",
    "Where there's a will, there's a way.",
    "Don't count your chickens before they hatch.",
    "When in Rome, do as the Romans do."
];


const slogans = [
    "Type with a smile!",
    "Words flow like a breeze.",
    "Let your fingers dance!",
    "Every keystroke tells a story.",
    "Friendly typing, every day.",
    "Your thoughts, one key at a time.",
    "Keys to happiness: type away!",
    "Type, enjoy, repeat!",
    "Elevate your typing experience.",
    "Keyboard harmony for everyone."
];


const quoteElement = document.getElementById('quote');
const inputTextElement = document.getElementById('input-text');
const resultElement = document.getElementById('result');
const changeBtn = document.getElementById('change-btn');
const submitBtn = document.getElementById('submit-btn');

let timerStart;
let timerEnd;

function startTypingTest() {
    const newText = getRandomSentence();
    quoteElement.innerHTML = newText;
    inputTextElement.value = '';
    resultElement.innerHTML = '';
    startTimer();
}

function startTimer() {
    timerStart = Date.now();
}

function stopTimer() {
    timerEnd = Date.now();
}

function calculateTypingSpeed() {
    const elapsedMilliseconds = timerEnd - timerStart;
    const elapsedMinutes = elapsedMilliseconds / (1000 * 60);
    const originalText = quoteElement.textContent.trim();
    const enteredText = inputTextElement.value.trim();
    const wordCount = enteredText.split(' ').length;

    const wordsPerMinute = Math.round(wordCount / elapsedMinutes);
    resultElement.innerHTML = `Typing speed: ${wordsPerMinute} words per minute`;

    if (wordsPerMinute >= 40) {
    
        resultElement.innerHTML += '<br>Congratulations! Your typing speed is impressive!';
    }
}



function getRandomSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
}

function changeSlogan() {
    const randomIndex = Math.floor(Math.random() * slogans.length);
    
}

function highlightMistakes() {
    const originalText = quoteElement.textContent.trim();
    const enteredText = inputTextElement.value.trim();

    const originalWords = originalText.split(' ');
    const enteredWords = enteredText.split(' ');

    let highlightedText = '';

    originalWords.forEach((word, index) => {
        if (enteredWords[index] !== word) {
            highlightedText += `<span class="mistake">${word}</span> `;
        } else {
            highlightedText += `<span>${word}</span> `;
        }
    });

    quoteElement.innerHTML = highlightedText.trim();
}

changeBtn.addEventListener('click', function() {
    startTypingTest();
    changeSlogan();
});

submitBtn.addEventListener('click', function() {
    stopTimer();
    if (checkCorrectSentence()) {
        calculateTypingSpeed();
        changeSlogan();
    } else {
        resultElement.innerHTML = "Incorrect sentence. Please try again.";
    }
});

inputTextElement.addEventListener('input', function() {
    if (!timerStart) {
        startTimer();
    }

    highlightMistakes();
});

const sloganContainer = document.getElementById('slogan-container');
let sloganIndex;

function changeSlogan() {
   
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * slogans.length);
    } while (randomIndex === sloganIndex);

    sloganContainer.innerHTML = slogans[randomIndex];
    sloganIndex = randomIndex;
}

function checkCorrectSentence() {
    const originalText = quoteElement.textContent.trim();
    const enteredText = inputTextElement.value.trim();
    return originalText === enteredText;
}

startTypingTest();
changeSlogan();
checkCorrectSentence();

