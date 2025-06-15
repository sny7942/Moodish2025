from flask import Flask, request, jsonify
from pymongo import MongoClient
from PIL import Image
import pytesseract
from konlpy.tag import Okt
import os

app = Flask(__name__)

# MongoDB 연결
uri = "mongodb+srv://moodish:U3Z1O83eGzTPQbrb@cluster0.n5s1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["test"]
collection = db["users"]

# 식재료 목록 로딩
with open('scanning_receipt/finalIngredientsList.txt', 'r', encoding='utf-8') as f:
    INGREDIENTS_LIST = [line.strip() for line in f.readlines()]

# 식재료 추출 함수
def extract_ingredients(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image, lang='kor')
    okt = Okt()
    words = [word for word, pos in okt.pos(text) if pos == 'Noun']
    return list({word.strip() for word in words if word.strip() in INGREDIENTS_LIST})

# MongoDB 업데이트 함수
def update_fridge_for_user(username, new_ingredients):
    
    user = collection.find_one({"name": username})
    if user is None:
        print(f"[에러] 사용자 '{username}'를 찾을 수 없습니다.")
        return

    current_fridge = user.get("fridge", [])
    updated_fridge = list(set(current_fridge + new_ingredients))

    collection.update_one(
        {"name": username},
        {"$set": {"fridge": updated_fridge}}
    )
        
    
    print(f"[업데이트 완료] {username}의 냉장고에 저장된 재료: {updated_fridge}")


@app.route('/receipt', methods=['POST'])
def handle_receipt():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    username = request.form.get('username', 'guest')

    # 파일 저장
    save_path = os.path.join('uploads', image_file.filename)
    image_file.save(save_path)

    # 식재료 추출
    ingredients = extract_ingredients(save_path)

    # 유저가 존재하면 업데이트, 아니면 에러 출력
    user = collection.find_one({"name": username})
    if not user:
        print(f"[에러] 사용자 '{username}'를 찾을 수 없습니다.")
        return jsonify({'error': f"User '{username}' not found"}), 404

    current_fridge = user.get("fridge", [])
    updated_fridge = list(set(current_fridge + ingredients))

    collection.update_one(
        {"name": username},
        {"$set": {"fridge": updated_fridge}}
    )

    return jsonify({'rec_res': ingredients})

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5000)
