# main.py

from ocr_module import extract_ingredients
from db_module import update_fridge_for_user

image_path = '/Users/maylee/Desktop/Moodish_scan/scanning_receipt/image/receipt3.png'
ingredient_list_path = '/Users/maylee/Desktop/Moodish_scan/scanning_receipt/finalIngredientsList.txt'
username = "hello"

ingredients = extract_ingredients(image_path, ingredient_list_path)
print("추출된 식재료:", ingredients)

update_fridge_for_user(username, ingredients)
