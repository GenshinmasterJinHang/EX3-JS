let characters = [
    {
        word: "Tatsumaki",
        image: "images/tatsumaki.jpg"
    },
    {
        word: "Saitama",
        image: "images/Saitama.png"
    },
    {
        word: "Genos",
        image: "images/genos.png"
    },
    {
        word: "Fubuki",
        image: "images/fubuki.png"
    },
    {
        word: "Sonic",
        image: "images/sonic.jpg"
    }
];

let currentWord = "";
let currentImage = "";
let previousIndex = -1;
let wrongCount = 0;
let maxWrong = 10;
let gameFinished = false;

function scrambleWord(word) {
    let scrambledWord = word;

    while (scrambledWord.toLowerCase() === word.toLowerCase()) {
        let scrambled = word.split("");

        for (let i = scrambled.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));

            let temp = scrambled[i];
            scrambled[i] = scrambled[randomIndex];
            scrambled[randomIndex] = temp;
        }

        scrambledWord = scrambled.join("");
    }

    return scrambledWord;
}

function updateCounter() {
    document.getElementById("counter").innerText = "Wrong guesses: " + wrongCount + " / " + maxWrong;
}

function newword() {
    let randomIndex = Math.floor(Math.random() * characters.length);

    while (randomIndex === previousIndex && characters.length > 1) {
        randomIndex = Math.floor(Math.random() * characters.length);
    }

    previousIndex = randomIndex;
    currentWord = characters[randomIndex].word;
    currentImage = characters[randomIndex].image;

    wrongCount = 0;
    gameFinished = false;

    document.getElementById("scrambled-word").innerText = scrambleWord(currentWord);
    document.getElementById("guess").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("result").style.color = "#222222";
    document.getElementById("word-image").style.display = "none";
    document.getElementById("word-image").src = "";

    updateCounter();
}

function checkAnswer() {
    if (gameFinished === true) {
        return;
    }

    let userGuess = document.getElementById("guess").value;
    let resultText = document.getElementById("result");
    let image = document.getElementById("word-image");

    if (userGuess.toLowerCase() === currentWord.toLowerCase()) {
        resultText.innerText = "Correct! Well done!";
        resultText.style.color = "#2e8b57";
        image.src = currentImage;
        image.style.display = "block";
        gameFinished = true;
    } else {
        wrongCount = wrongCount + 1;
        updateCounter();

        if (wrongCount >= maxWrong) {
            resultText.innerText = "You have reached 10 wrong guesses. The answer is " + currentWord + ".";
            resultText.style.color = "#cc3333";
            image.src = currentImage;
            image.style.display = "block";
            gameFinished = true;
        } else {
            resultText.innerText = "Wrong answer. Try again!";
            resultText.style.color = "#cc3333";
            image.style.display = "none";
            image.src = "";
        }
    }
}

document.getElementById("check-button").addEventListener("click", checkAnswer);
document.getElementById("new-button").addEventListener("click", newword);

newword();
