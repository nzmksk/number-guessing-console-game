# Create a game of number guessing, where the player only have 5 tries to guess the secret generated number ranging from 0 - 100.

# Random module to generate a random secret number
import random
# RegEx module to restrict user's input
import re


class NumberGuessing:
    def __init__(self):
        self.guess_count = 0
        # Guess limit is set to 5 for now. In future updates, the value is flexible, depending on the difficulty level selected by the user.
        self.guess_limit = 5
        # Generate a random number between 0 and 100
        self.secret_number = random.randint(0, 100)
        # Game ends when self.ends = True
        self.ends = False

    # This function is invoked when the player wants to restart the game.
    def start(self):
        self.secret_number = random.randint(0, 100)

    def restart(self):
        while True:
            # .upper() will convert lowercase letters to uppercase
            restart = input("Restart game? Y or N? > ").upper()
            if restart == 'Y':
                # Reset the guess count to 0 and generate a new secret number
                self.guess_count = 0
                self.start()
                break
            elif restart == 'N':
                print("Better luck next time!")
                # This will stop the game
                self.ends = True
                break
            # Restrict user's input to Y or N only
            elif not re.match("^[N,Y]*$", restart) or len(restart) > 1:
                print("Error! Please enter Y or N only!")


game = NumberGuessing()
while not game.ends:
    try:
        guess = int(input(
            f'Guess the secret number ranging from 0 to 100! You only have {game.guess_limit - game.guess_count} tries left! > '))
        game.guess_count += 1
        # If the guess is correct
        if guess == game.secret_number:
            print("Congratulations, you win!")
            game.restart()
        # If the guess is incorrect and guess count is reaching the guess limit, the player lose immediately
        elif game.guess_count >= game.guess_limit:
            print("Sorry, you lose!\n")
            game.restart()
        # If the guess is incorrect and the player still have more guesses, a hint will be given
        elif guess < game.secret_number:
            print("Hint: Your guess is lower than the secret number.\n")
        elif guess > game.secret_number:
            print("Hint: Your guess is higher than the secret number.\n")
    # This error will be raised when user's input is not a whole number
    except ValueError:
        print("Please insert whole number(s) only.\n")


# Notes on future development:
# - To add 4 different difficulty levels to the game and enable player to select them independently
    # Easy - 15 guesses
    # Medium - 10 guesses
    # Hard - 7 guesses
    # Extreme - 5 guesses
# - To set restrictions on user's input
    # Currently it accepts any integer, future update will restrict the input from 0 to 100 only
# - To add PvP mode
    # Guess limit will be removed. Instead, two players will alternate their turns trying to guess the secret number

# Feel free to fork if you want to contribute in the game development!
# You can also provide feedbacks such as:
# - do game testing and try to find some bugs. Report them if you find it.
# - provide commentaries on how the code structure or game algorithm can be improved.
# - or anything that you think can be beneficial. All contributions are welcome!