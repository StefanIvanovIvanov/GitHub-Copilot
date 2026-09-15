import random


def game_logic(score):
    choices = ("rock", "paper", "scissors")

    while True:
        user_choice = input("Choose rock, paper, or scissors (or 'quit' to stop): ").strip().lower()

        if user_choice == "quit":
            return None, score

        if user_choice not in choices:
            print("Invalid choice. Please try again.")
            continue

        opponent_choice = random.choice(choices)

        if user_choice == opponent_choice:
            score["tied"] += 1
            return f"Opponent chose {opponent_choice}. It's a tie!", score
        if (
            (user_choice == "rock" and opponent_choice == "scissors")
            or (user_choice == "paper" and opponent_choice == "rock")
            or (user_choice == "scissors" and opponent_choice == "paper")
        ):
            score["won"] += 1
            return f"Opponent chose {opponent_choice}. You win!", score

        score["lost"] += 1
        return f"Opponent chose {opponent_choice}. You lose!", score


if __name__ == "__main__":
    score = {"won": 0, "lost": 0, "tied": 0}
    while True:
        result, score = game_logic(score)
        if result is None:
            print("Thanks for playing!")
            break
        print(result)
        print(f"Score — Won: {score['won']}, Lost: {score['lost']}, Tied: {score['tied']}")