import cv2
from fer import FER
import numpy as np
import pandas as pd
from moodish import receiptForFlask
from flask import Flask, request, jsonify
from flask_cors import CORS
from data import Recommend
from FER import test_image
from scanning_receipt import receipt
from food_img import info
import traceback
import pytesseract
from moodish import webcamForFlask

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

#cd pra , npm start


app = Flask(__name__)
CORS(app)

#user_input 예시
user_preferences = {
    'user_id' : '',
    'Ingredient': '',
    'time': '120', #최소 5
    'difficult': '아무나',#초급 중급 고급 아무나
    'happy' : 1,
    'board' : 0,
    'tired' : 0,
    'stress' : 0,
    'sad' : 0,
}

def Emotion(img):
    if img is None:
        return {"error": "이미지를 불러오지 못했습니다. 경로를 확인하세요."}, 400

    detector = FER()
    results = detector.detect_emotions(img)

    if not results:
        return {"error": "얼굴을 탐지하지 못했거나 감정을 분석하지 못했습니다."}, 404

    response = []
    for face in results:
        response.append({
            "box": face['box'],
            "emotions": face['emotions']
        })

    return response, 200

#추천 시스템
@app.route('/recommend', methods=['POST'])
def recommend_data():
    data = request.get_json()  # 클라이언트에서 보낸 JSON 데이터 받기

    # 사용자가 보낸 입력값 받기
    user_input_username = data.get('username')
    user_input_ingre = data.get('userInput')
    user_input_time = data.get('userInput_time')
    user_input_diffi = data.get('userInput_diffi')
    
    # str로 받아오기
    user_input_emotion = data.get('userInput_emotion')

    user_preferences['Ingredient'] = user_input_ingre
    user_preferences['Ingredient'] = user_input_ingre
    user_preferences['time'] = user_input_time
    user_preferences['difficult'] = user_input_diffi

    user_preferences['happy'] = 0
    user_preferences['board'] = 0
    user_preferences['tired'] = 0
    user_preferences['stress']= 0
    user_preferences['sad'] = 0
 
    if(user_input_emotion == '기쁨' or user_input_emotion == '오늘은 행복한 하루네요 😊'):
        user_preferences['happy'] = 1
        
    elif(user_input_emotion == '심심' or user_input_emotion == '오늘은 좀 지루하신가봐요 😑'):
        user_preferences['board'] = 1
        
    elif(user_input_emotion == '피로감'or user_input_emotion == '오늘은 많이 피곤하신가봐요 🥱'):
        user_preferences['tired'] = 1
        
    elif(user_input_emotion == '분노/스트레스' or user_input_emotion == '오늘은 화나고 스트레스 받는 하루네요 😡'):
        user_preferences['stress'] = 1
        
    else:
        user_preferences['sad'] = 1
    

    result = Recommend.Recommend_Function(user_preferences)

    joined_string = '|'.join(result['name'].astype(str))
    print(joined_string)
    print("request check")
    return jsonify({'result': joined_string})


#데베에 데이터 넣기
@app.route('/insertDB', methods=['POST'])
def insertDB():
    data = request.get_json()  # 클라이언트에서 보낸 JSON 데이터 받기
    user_input_name = data.get('userInputname')
    user_input_recipe = data.get('userjnputrecipe')
    user_input_emotion = data.get('userInputemotion')
    user_input_rating = data.get('userInputrating')


    Recommend.UpdateRating(user_input_name,user_input_recipe,user_input_emotion,user_input_rating)
    return

#감정 분석
@app.route('/analyze_emotion_base64', methods=['POST'])

def analyze_emotion_base64():
    try:
        import base64
        print("==== 분석 요청 도착 ====")

        # 들어온 요청을 실제로 어떻게 Flask가 인식하는지 확인
        print("files:", request.files)
        print("form:", request.form)
        print("data:", request.data)
        # 요청 로그 출력
        print("Request received at /analyze_emotion")

        data = request.get_json()
        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        image_data = base64.b64decode(data['image'])
        np_arr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        results, status_code = Emotion(img)

        emotion_mapping = {
            'happy': '오늘은 행복한 하루네요 😊',
            'sad': '오늘은 슬픈 하루네요 😢',
            'angry': '오늘은 화나고 스트레스 받는 하루네요 😡',
            'fear': '오늘은 화나고 스트레스 받는 하루네요 😡',
            'neutral': '오늘은 좀 지루하신가봐요 😑',
            'disgust': '오늘은 많이 피곤하신가봐요 🥱'
        }

        if isinstance(results, list) and len(results) > 0:
            primary_result = results[0]
            emotions = primary_result.get('emotions', {})
            dominant_emotion = max(emotions, key=emotions.get)
            mapped_results = {
                "emotion": emotion_mapping.get(dominant_emotion, "unknown"),
            }
            return jsonify(mapped_results), 200
        else:
            return jsonify({"error": "감정 분석 결과 없음"}), 500

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"서버 에러: {str(e)}"}), 500

#영수증 인식
@app.route('/mainReceipt', methods=['POST'])
def upload_receipt():
    # 요청 로그 출력
    print("Request received at /receipt")

    # 이미지 파일이 요청에 포함되었는지 확인
    if 'image' not in request.files:
        return jsonify({"error": "이미지를 업로드하세요."}), 400

    file = request.files['image']
    print("Image received:", file.filename)

    # 이미지를 바로 추출 함수로 전달
    result = receiptForFlask.extract_ingredients(file)
    print("Extracted Ingredients:", result)
    
    username = request.form.get('username', 'guest')
    print("이미지 업로드 요청 - 사용자:", username)
    
    receiptForFlask.update_fridge_for_user(username, result)

    return jsonify({'rec_res': result})

#사진 이미지 반환
@app.route('/foodImg', methods=['POST'])
def process_food_image():
    data = request.get_json()  #음식 이름
    foodName_get = data.get('foodName')

    res = info.food_info(foodName_get)

    return jsonify({'img_link': res})

#데베에서 재료 받아오기
@app.route('/ingreFromDB', methods=['POST'])
def ingreFromDB():
    data = request.get_json()  # 클라이언트에서 보낸 JSON 데이터 받기
    user_input_name = data.get('userInputname')

    output = Recommend.ingreFromDB(user_input_name)
    print(output)
    return jsonify({'result': output})

#냉장고 사진 인식
@app.route('/webcam', methods=['POST'])
def upload_webcam():
    try:
        print("📸 [웹캠 요청 도착] /webcam")

        if 'image' not in request.files:
            return jsonify({"error": "이미지를 업로드하세요."}), 400

        file = request.files['image']
        username = request.form.get('username', 'guest')
        print("🖼️ 이미지 파일 수신:", file.filename)

        result = webcamForFlask.detect_ingredients(file, username)

        if isinstance(result, dict) and 'error' in result:
            print("❌ 인식 실패:", result['error'])
            return jsonify({"error": "인식 실패", "detail": result['error']}), 500

        print("✅ 재료 인식 완료:", result)
        return jsonify({'rec_res': result}), 200

    except Exception as e:
        print("❗서버 내부 오류:", str(e))
        return jsonify({"error": "서버 내부 오류 발생", "detail": str(e)}), 500

    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port = 5000)
