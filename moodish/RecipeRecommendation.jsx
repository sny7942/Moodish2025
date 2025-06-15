import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, ScrollView, Modal
} from 'react-native';

const RecipeRecommendation = ({ navigation,route }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);

  const [recipes, setRecipes] = useState([
        { id: 1, label: '', src: '' },
        { id: 2, label: '', src: '' },
        { id: 3, label: '', src: '' },
  ]);

  const { result_name } = route.params;
  const resultLines = result_name ? result_name.split('|') : [];

  useEffect(() => {
        // 비동기 함수 호출을 위해 Promise.all 사용
        console.log(result_name);
        const fetchImages = async () => {
            const updatedRecipes = await Promise.all(
                recipes.map(async (recipe, index) => {
                    if (resultLines[index]) {
                        recipe.label = resultLines[index];
                        const imgSrc = await callApi_img(recipe.label); // 이미지 받아오기
                        console.log(imgSrc)
                        return { ...recipe, src: imgSrc }; // 레시피에 이미지 src 추가
                    }
                    return recipe; // 레시피 그대로 반환
                })
            );
            setRecipes(updatedRecipes); // 모든 레시피 업데이트
        };

        fetchImages(); // 비동기 이미지 불러오기
    }, [result_name]); // result가 바뀔 때마다 실행

    // 이미지 요청 함수
    const callApi_img = async (foodname) => {
        try {
            const response = await fetch('http://172.30.1.8:5000/foodImg', { // 서버 IP 변경 필요
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    foodName: foodname,
                }),
            });
            const result = await response.json();
            return result.img_link; // 이미지 링크 반환
        } catch (error) {
            console.error('Error calling API:', error);
            return ''; // 오류 시 빈 문자열 반환
        }
    };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRatingModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleRating = (score) => {
    setRating(score);
 
    setTimeout(() => {
        setShowRatingModal(false);
        console.log(`${score}점으로 평가하였습니다.`);
      }, 1000);
  };

  const handleSelect = (recipe) => {
        setSelectedRecipe(recipe);
        navigation.navigate('RecipeDetail', { result_name : recipe.label }); // 레시피 세부정보 화면으로 이동
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>홍길동님에게 추천하는{'\n'} 3가지의 레시피입니다.</Text>
      <Text style={styles.subtitle}>다음 중 가장 선호하는 음식의 레시피를{'\n'} 한 가지 선택하세요.</Text>
      <ScrollView contentContainerStyle={styles.recipesContainer}>
        {recipes.map(recipe => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.recipeBox}
            onPress={() => handleSelect(recipe)}
          >
            <Image source={{uri :recipe.src}} style={styles.recipeImage} />
            <Text style={styles.recipeText}>{recipe.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 사용자 만족도 평가 */}
      <Modal
        visible={showRatingModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>레시피 추천은 만족스러우셨나요?</Text>
            <Text style={styles.modalSubtitle}>별점을 선택해주세요.</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(score => (
                <TouchableOpacity key={score} onPress={() => handleRating(score)}>
                  <Text style={[styles.star, rating >= score && styles.activeStar]}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* 하단 네비게이션 바 */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image source={require('./assets/reading glasses.png')} style={styles.navIcon1} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('./assets/home.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Save')}>
          <Image source={require('./assets/refrigerator.png')} style={styles.navIcon1} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
          <Image source={require('./assets/userIcon.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  recipesContainer: { alignItems: 'center', paddingBottom: 20 },
  recipeBox: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 150,
    backgroundColor: '#f9f9f9',
  },
  recipeImage: { width: 80, height: 80, marginBottom: 10 },
  recipeText: { fontSize: 16, textAlign: 'center' },
  navBar: {
    flexDirection: 'row', justifyContent: 'space-around',
    alignItems: 'center', backgroundColor: '#FFFFFF',
    borderTopWidth: 1, borderTopColor: '#E0E0E0',
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingVertical: 10
  },
  navIcon: { width: 30, height: 30, resizeMode: 'contain' },
  navIcon1: { width: 20, height: 20, resizeMode: 'contain', marginTop: 5 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff', padding: 20, borderRadius: 10,
    width: '80%', alignItems: 'center'
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalSubtitle: { fontSize: 14, marginBottom: 10 },
  ratingContainer: { flexDirection: 'row' },
  star: { fontSize: 32, color: '#ccc', marginHorizontal: 5 },
  activeStar: { color: '#FFD700' }
});

export default RecipeRecommendation;
