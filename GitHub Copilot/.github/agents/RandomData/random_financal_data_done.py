import random

def monthly_random_finances():
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return [
        {"month": m, "income": random.randint(10, 5000), "expense": random.randint(10, 5000)}
        for m in months
    ]

if __name__ == "__main__":
    print(monthly_random_finances())