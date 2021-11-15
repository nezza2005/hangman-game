//global variables.

//counter to display how many tries you have left at guessing correct characters.
var triesLeft = 5; //always stays as 5

//dom targets.
var guessCount = document.querySelector("#guesses, p"); //display how many tries you have left in dom target.
const resetButton = document.querySelector(".button"); // reset buton
const displayWord = document.getElementById("puzzle") //dom target to show random word

//arrays
var words = ["hello world", "happy birthday", "you got talent", "china town", "leap frog",
  "true lies", "artificial inteligence", "knoledge is power", "monday blues", "autonomous vehicles"];
const wrongGuess = [];

//pick a word randomly.
var randomiseWord = words[Math.floor(Math.random() * words.length)];
//hide all characters within [a-z] and replace with *.
var randomiseWordHide = randomiseWord.replace(/[a-z]/gi, '*'); // regular expression using regexp to find only a-z characters and replace with *.


function displayGame() {
//insert each character of the random word into a span tag hidden as *.
  for (var i = 0; i < randomiseWord.length; i++) {
    var spanTag = document.createElement("span");
    displayWord.appendChild(spanTag);
    spanTag.textContent = randomiseWordHide[i];
  }
  guessCount.textContent="Guesses left:" + " " + triesLeft;

};


function makeAGuess(event) { // NOTE! input requires an event.


//if correct guess, reveal characters,
  for (var j = 0; j < randomiseWord.length; j++) {
    if (randomiseWord[j] === event.key) {
      document.querySelectorAll("span")[j].textContent = event.key;
    }
  };

  //if incorrect guess, push to array to keep count. keep this out of the loop.
    if (!randomiseWord.includes(event.key)) {
      wrongGuess.push(event.key);
    }
};


function occurrences(event) {
  let count = 0;
  for (var a=0; a<wrongGuess.length; a++) {
      if (event.key == wrongGuess[a]) {
        count++
      }
      }

      if (count === 1) {
      guessCount.textContent = "Guesses left:" + " " + ((triesLeft) - wrongGuess.length);
    } else if (count > 1) {
      wrongGuess.pop(); //takes this wrong guess out of the array to correct the length for triesLeft
      guessCount.textContent = "Guesses left:" + " " + ((triesLeft) - (wrongGuess.length))
    }

  endResult();
}

function endResult() {
  //if word is guessed correctly before running out of guesses.
  const letters = document.querySelectorAll("span");
  let solved = true;

  for (let k = 0; k < letters.length; k++) {
    if (letters[k].textContent == "*") {
      solved = false;
      break;
    } else {
      solved = true;
    }
  }

  if (guessCount.textContent.slice(-1) <= 5 && solved) {
    document.querySelector("#guesses, p").textContent = "Well done, you guessed the word with " + (guessCount.textContent.slice(-1)) + " " + " tries left.";
    //if all guesses are used and word not complete.
  } else if (wrongGuess.length >= 5) {
    document.querySelector("#guesses, p").textContent = "Nice try, the word was " + '"' + randomiseWord.toUpperCase() + '".';
    document.removeEventListener("keydown", makeAGuess);
  }
};


//create a reload button that displays a new random word when clicked.
function reloadScreen() {
  reload = location.reload();
}


//listener for keydown
document.addEventListener("keydown", makeAGuess);// can also pass function from here.
document.addEventListener("keydown", occurrences);
//listener for reload button.
resetButton.addEventListener("click", reloadScreen, false);

//call functions.
displayGame();




//What i have learned.

//***How to replace characters within a string using replace().***
//the parameters are what you want to replace and what you want to replace it with.
//You can also use regular expressions using regexp where you can filter specific characters in or out like below.
//[^a-z] - this matches any character in the string that is not an alphabet from a-z
//[a-z] - this matches any character in the string that is an alphabet from a-z
//g - global, to make sure it checks the whole string
//i - insensitive, to make sure it doesn't bother about the case of the string

//***how to reveal a character within a string that matches the event of a keydown.****
//for(var j = 0; j<randomiseWord.length; j++) {
//if (randomiseWord[j] === event.key) {
//document.querySelectorAll("span")[j].textContent = event.key;

//***target last index of a string in the DOM***
//using domTarget.slice(-1), you can then use this to compare in aif statement.

//***Calling a funstion from event listener***
//no need to call a function that is already added to an event listener as it is called from there.

//***passing in Events***
//to pass the event listener in to another function that requires an event action like event.key, this.event etc pass event into the functions input appendChild
//make sure that function is called in the event listener.

//***calling functions and loops***
//Do not call a function from inside a loop.

//***includes() method***
//you can use include to see if an item in the index of a string exists and to do the opposite of this just negate it usieng !before the string,
//this say if does not include. NOTE: doesnt work at the beginning of a DOM target but does work for strings
