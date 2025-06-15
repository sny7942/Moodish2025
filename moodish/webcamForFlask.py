from flask import Flask, request, jsonify
from pymongo import MongoClient
from roboflow import Roboflow
import os
import uuid
from datetime import datetime

app = Flask(__name__)

# MongoDB 연결
uri = "mongodb+srv://moodish:U3Z1O83eGzTPQbrb@cluster0.n5s1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["test"]
users_collection = db["users"]
ingredients_collection = db["ingredients"]  # 기록용 별도 컬렉션

# Roboflow 모델 초기화
rf = Roboflow(api_key="QtpItoawCYInLTjC6EwG")
project = rf.workspace("moodish").project("new-jh8da")
model = project.version(1).model

translation_dict = {
    "banana": "바나나",
    "cucumber": "오이",
    "orange": "오렌지",
    "tomato": "토마토",
    "apple": "사과",
    "asparagus": "아스파라거스",
    "avocado": "아보카도",
    "beef": "소고기",
    "bento": "벤토 도시락",
    "blueberries": "블루베리",
    "bread": "빵",
    "broccoli": "브로콜리",
    "butter": "버터",
    "carrot": "당근",
    "cheese": "치즈",
    "chicken": "닭고기",
    "corn": "옥수수",
    "chocolate": "초콜릿",
    "egg": "계란",
    "fish": "생선",
    "flour": "밀가루",
    "garlic": "마늘",
    "green_beans": "그린빈",
    "ground_beef": "다진 소고기",
    "guacamole": "과카몰리",
    "ham": "햄",
    "heavy_cream": "생크림",
    "humus": "후무스",
    "leek": "대파",
    "lemon": "레몬",
    "lettuce": "상추",
    "lime": "라임",
    "mango": "망고",
    "marmelade": "마멀레이드",
    "mayonaise": "마요네즈",
    "milk": "우유",
    "mushrooms": "버섯",
    "mustard": "머스터드",
    "nuts": "견과류",
    "onion": "양파",
    "pak_choi": "청경채",
    "paprica": "파프리카", 
    "paprika": "파프리카",
    "pear": "배",
    "pineapple": "파인애플",
    "potato": "감자",
    "pudding": "푸딩",
    "rice_ball": "주먹밥",
    "salad": "샐러드",
    "sandwich": "샌드위치",
    "sausage": "소시지",
    "shrimp": "새우",
    "smoothie": "스무디",
    "spinach": "시금치",
    "spring_onion": "쪽파",
    "strawberries": "딸기",
    "sugar": "설탕",
    "sweet_potato": "고구마",
    "tomato_sauce": "토마토소스",
    "tortillas": "또띠아",
    "turkey": "칠면조",
    "yogurt": "요거트"
}

@app.route('/webcam', methods=['POST'])
def detect_ingredients(image_file, username = 'guest'):
    try:
        # 파일 임시 저장
        ext = os.path.splitext(image_file.filename)[1]
        save_path = os.path.join('uploads', f"{uuid.uuid4().hex}{ext}")
        os.makedirs('uploads', exist_ok=True)
        image_file.save(save_path)

        # 모델 예측
        result = model.predict(save_path, confidence=50, overlap=30).json()

        predictions = [item["class"] for item in result.get("predictions", [])]
        ingredients = list(set(predictions))

        korean_ingredients = [translation_dict.get(i, i) for i in ingredients]

        # DB 기록 저장
        ingredients_collection.insert_one({
            "name": username,
            "ingredients": korean_ingredients,
            "raw_classes": predictions,
            "timestamp": datetime.utcnow()
        })

        # 사용자 냉장고 업데이트
        user = users_collection.find_one({"name": username})
        if not user:
            return {"error": f"User '{username}' not found"}

        current_fridge = user.get("fridge", [])
        updated_fridge = list(set(current_fridge + korean_ingredients))
        users_collection.update_one({"name": username}, {"$set": {"fridge": updated_fridge}})

        os.remove(save_path)
        return korean_ingredients

    except Exception as e:
        if os.path.exists(save_path):
            os.remove(save_path)
        return {"error": str(e)}

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5000)
