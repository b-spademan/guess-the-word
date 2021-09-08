// Unordered list where guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");
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
const guessedLetters = []; 

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

 // Check if player guessed word correctly
 const checkIfWin = function () {
   if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
   } 
 };
