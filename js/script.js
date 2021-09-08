// Unordered list where guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
// "Guess" button
const guessButton = document.querySelector(".guess");
// Input box where player enters a letter to guess
const letterInput = document.querySelector(".letter");
// Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph where remaining guesses appear
const remainingGuesses = document.querySelector(".remaining");
// Span element inside remaining guesses
const numGuesses = document.querySelector(".remaining span");
// Empty paragraph where messages appear when players guess a letter
const message = document.querySelector(".message");
// Hidden "play again" button
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; // test word

// Function to update innerText of "word-in-progress" paragraph 
 const placeholder = function (word) {
   const placeholderLetters = [];
   for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("●")
   } 
   wordInProgress.innerText = placeholderLetters.join("");
 };
 placeholder(word);

 // Click event for guessButton
 guessButton.addEventListener("click", function (e) {
   e.preventDefault();
   const inputValue = letterInput.value;
   console.log(inputValue);
   letterInput.value = "";
 });