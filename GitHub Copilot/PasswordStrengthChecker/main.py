import string

def password_strength_checker(password: str) -> str:
    """Evaluates password strength and returns 'Weak', 'Medium', or 'Strong'."""
    if not password:
        return "Weak"

    length = len(password)
    has_lower = any(c.islower() for c in password)
    has_upper = any(c.isupper() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(c in string.punctuation for c in password)

    categories_count = sum([has_lower, has_upper, has_digit, has_special])

    if length >= 8 and categories_count == 4:
        return "Strong"
    elif length >= 6 and categories_count >= 3:
        return "Medium"
    else:
        return "Weak"

if __name__ == "__main__":
    user_password = input("Enter your password to check its strength: ")
    strength = password_strength_checker(user_password)
    print(f"Password strength: {strength}")


# #Generate aprpopriate code to replace the placeholder comments below:
# def password_strength_checker(password):
#     # the password strength checker should have 3 levels of strength
#     # weak, medium, and strong
#     # implement appropriate rules for each level of strength
#     return "";

# if __name__ == "__main__":
#     # prompt the user to input a password then pass the password to the
#     # password_strength_checker function
#     print(password_strength_checker())