var hangmanLifes = 7;
var lettersFound = 0;
var underlinedWord = "";
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //literele disponibile pt. gasirea cuvantului


var inputWord = document.getElementById("inputWord");
var inputLetter = document.getElementById("inputLetter");
var buttonWord = document.getElementById("buttonWord");
var buttonLetter = document.getElementById("buttonLetter");


function addWordToHangman() {
	word = inputWord.value;
	for (var i = 0; i < word.length; ++i) {
		underlinedWord += "_";
	}
	document.getElementById("messageOnPage").innerHTML = underlinedWord + " (You have " + hangmanLifes + " more tries)";

}

function searchLetters() {
	let letter = inputLetter.value;
	let found = "NO";
	if (alphabet.includes(letter)) {
		for (var i = 0; i < alphabet.length; ++i) {
			if (alphabet[i] == letter) {
				alphabet.splice(i, 1); // delete the letter that was used
			}
		}
		for (var i = 0; i < word.length; ++i) {
			if (letter == word[i]) {
				found = "YES";
				++lettersFound;

				String.prototype.replaceAt = function (index, replacement) {
					return this.substring(0, index) + replacement + this.substring(index + 1);
				} // extract the characters from position 0 to the 'index' position (but without it) then put the new character on the 'index' position, then continue with extracting the next characters from the 'index + 1' position to the end.
				let guessingWord = underlinedWord.replaceAt(i, letter); // we replace the character from position i with the letter character
				underlinedWord = guessingWord; //save the found letters
			}
		}
		if (found == "NO") {
			--hangmanLifes;
		}
	} else {
		alert("You already tried this letter before, type a new one.");
	}
	if (lettersFound == word.length) { //win game
		alert("Congratulations, you win!");
		location.reload();
	} else if (hangmanLifes == 0) { //lost game
		alert("You lost.\nThe word was: " + word + "\nTry again.");
		location.reload();
	}
	document.getElementById("messageOnPage").innerHTML = underlinedWord + " (You have " + hangmanLifes + " more tries)";
}