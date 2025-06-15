# db_module.py

from pymongo import MongoClient

def update_fridge_for_user(username, new_ingredients):
    uri = "mongodb+srv://moodish:U3Z1O83eGzTPQbrb@cluster0.n5s1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(uri)
    db = client["test"]
    collection = db["users"]
    user = collection.find_one({"username": username})
    if user is None:
        print(f"[에러] 사용자 '{username}'를 찾을 수 없습니다.")
        return

    current_fridge = user.get("fridge", [])
    updated_fridge = list(set(current_fridge + new_ingredients))

    collection.update_one(
        {"username": username},
        {"$set": {"fridge": updated_fridge}}
    )
    print(f"[업데이트 완료] '{username}'의 냉장고 리스트:", updated_fridge)

