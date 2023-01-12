class NumberGuessingGame {
  constructor() {
    this.numberInMind;
    this.guess = 0;
    this.totalGuess = 0;
    this.timesPlayed = 0;
    this.averageRecord;
    this.currentRecord;
    this.bestRecord;
    this.foundCorrectNumber = false;
    this.prompt = require("prompt-sync")({ sigint: true });
  }

  // Print singular or plural text depending on the number of guess
  timeText = () => (this.guess == 1 ? "time" : "times");
  curRecordText = () => (this.currentRecord == 1 ? "guess" : "guesses");
  bestRecordText = () => (this.bestRecord == 1 ? "guess" : "guesses");

  // Generate a random number from 1 to 100
  generateNumber() {
    this.numberInMind = Math.floor(Math.random() * 100) + 1;
  }

  // Check if the guess is correct
  isValid(guess) {
    return guess == this.numberInMind;
  }

  // Initialize a new game
  startGame() {
    this.generateNumber();
    while (!this.foundCorrectNumber) {
      console.log(
        `Guess the secret number! (You have guessed ${
          this.guess
        } ${this.timeText()})`
      );
      let input = this.prompt(">>> ");

      // If guess is correct
      if (this.isValid(input)) {
        this.guess++;
        this.timesPlayed++;
        this.currentRecord = this.guess;
        this.totalGuess += this.currentRecord;
        this.averageRecord = (this.totalGuess / this.timesPlayed).toFixed(2);

        // Update best record if current record beats it
        if (
          this.bestRecord == undefined ||
          this.currentRecord < this.bestRecord
        ) {
          this.bestRecord = this.currentRecord;
          console.log("\n!!! NEW RECORD !!!");
        }

        // Score screen
        console.log(`
Congratulations, you have guessed the secret number correctly!
        
=+=+=+=+=+=+= Your Score =+=+=+=+=+=+=
#                                    #
#     Current record: ${this.currentRecord} ${this.curRecordText()}      #
#   Best personal record: ${this.bestRecord} ${this.bestRecordText()}  #
#    Average record: ${this.averageRecord} guesses    #
#                                    #
=+=+=+=+=+=+=+=+=+=+=+=+=+==+=+=+=+=+=
`);

        // Prompt player if they want to play again
        this.restart();
      }

      // If guess is incorrect
      else if (input < this.numberInMind) {
        this.guess++;
        console.log("\nHint: Your guess is lower than the secret number");
      } else {
        this.guess++;
        console.log("\nHint: Your guess is higher than the secret number");
      }
    }
  }

  // Restart game
  restart() {
    while (true) {
      console.log("Do you want to play again? Y or N?");
      let input = this.prompt(">>> ").toUpperCase();
      const regEx = /[N, Y]/;

      // Re-prompt if input doesn't match the character or length specified
      if (!input.match(regEx) || input.length > 1) {
        console.log("\nPlease enter Y (Yes) or N (No) only!");
      }

      // If player wants to play again, reset the game data except for the best and average record
      else if (input == "Y") {
        this.guess = 0;
        this.currentRecord = undefined;
        this.generateNumber();
        break;
      }

      // Stop the game if player doesn't want to play anymore
      else {
        this.foundCorrectNumber = true;
        console.log("\nThank you for playing!");
        break;
      }
    }
  }
}

game = new NumberGuessingGame();
game.startGame();
