// Unordered list where guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");
// "Guess" button
const guessButton = document.querySelector(".guess");
// Input box where player enters a letter to guess
const letterInput = document.querySelector(".letter");
// Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph where remaining guesses appear
const remainingGuessesText = document.querySelector(".remaining");
// Span element inside remaining guesses
const numGuesses = document.querySelector(".remaining span");
// Empty paragraph where messages appear when players guess a letter
const message = document.querySelector(".message");
// Hidden "play again" button
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia"; // test word
const guessedLetters = []; 
let remainingGuesses = 8;

const getWord = async function () {
   const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
   const words = await response.text();
   const wordArray = words.split("\n");
   console.log(wordArray);
   const randomIndex = Math.floor(Math.random() * wordArray.length);
   word = wordArray[randomIndex].trim();
   placeholder(word); 
};
getWord();

// Function to update innerText of "word-in-progress" paragraph 
 const placeholder = function (word) {
   const placeholderLetters = [];
   for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("●")
   } 
   wordInProgress.innerText = placeholderLetters.join("");
 };

 // Click event for guessButton
 guessButton.addEventListener("click", function (e) {
   e.preventDefault();
   message.innerText = "";
   const guess = letterInput.value;
   const goodGuess = validateInput(guess);

   if (goodGuess) {
      makeGuess(guess);
   }
   letterInput.value = "";
 });

 // Function to check player input
 const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/; // regular expression 
    if (input.length === 0) {
       message.innerText = "Please guess a letter";
    } else if (input.length > 1) {
      message.innerText = "Only guess 1 letter at a time";
    } else if (!input.match(acceptedLetter)) {
      message.innerText = "That's not a letter, silly.";
    } else {
       return input;
    }
 };

 // Function to capture input
 const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
       message.innerText = "You already guessed that letter. Try again.";
    } else {
       guessedLetters.push(guess);
       console.log(guessedLetters);
       countGuesses(guess);
       updateLettersList();
       updateWordInProgress(guessedLetters);
    } 
 };

 // Update Guessed letter list
 const updateLettersList = function () {
   guessedLettersList.innerHTML = "";
   for (const letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = letter;
      guessedLettersList.append(li);
   }
 };

 // Update word in progress with correct guesses
 const updateWordInProgress = function (guessedLetters) {
   const wordUpper = word.toUpperCase();
   const wordArray = wordUpper.split("");
   console.log(wordArray);
   const revealWord = [];
   for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
         revealWord.push(letter.toUpperCase());
      } else {
         revealWord.push("●");
      }
   }
   console.log(revealWord);
   wordInProgress.innerText = revealWord.join("");
   checkIfWin();
 };

 // Count remaining guesses
const countGuesses = function (guess) {
   const upperWord = word.toUpperCase();
   if (!upperWord.includes(guess)) {
      message.innerText = `Sorry, the word has no ${guess}.`;
      remainingGuesses -= 1;
   } else {
      message.innerText = `You are correct! The word has the letter ${guess}`;
   }

   if (remainingGuesses === 0) {
      message.innerText = `Game over! The word was ${word}`;
   } else if (remainingGuesses === 1) {
      remainingGuessesText.innerText = `${remainingGuesses} guess left.`;
   } else {
      remainingGuessesText.innerText = `${remainingGuesses} guesses left`;
   }
};

 // Check if player guessed word correctly
 const checkIfWin = function () {
   if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
   } 
 };
