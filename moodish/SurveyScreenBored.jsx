import React, { useState } from 'react';
import {View,Text,TouchableOpacity,Image,FlatList,StyleSheet,} from 'react-native';

const SurveyScreenBored = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // 음식 이미지 데이터
  const foodItems = [
    { id: '1', image: require('./assets/Soy Sauce Ribs.jpg') },
    { id: '2', image: require('./assets/Spam Kimchi Fried Rice.jpg') },
    { id: '3', image: require('./assets/Grilled Mushrooms with Soy Sauce and Butter.jpg') },
    { id: '4', image: require('./assets/Drug egg sauce.jpg') },
    { id: '5', image: require('./assets/Five-layer pork belly stew.jpg') },
    { id: '6', image: require('./assets/Bachelor Kimchi.jpg') },
    { id: '7', image: require('./assets/Daepae Samgyeopsal Soybean Sprout Bulgogi.jpg') },
    { id: '8', image: require('./assets/Chicken Galbi.jpg') },
    { id: '9', image: require('./assets/Tuna and Tofu Stew.jpg') },
    { id: '10', image: require('./assets/Pickled lettuce.jpg') },
    { id: '11', image: require('./assets/Stir-fried octopus.jpg') },
    { id: '12', image: require('./assets/Onion and cucumber salad.jpg') },
    { id: '13', image: require('./assets/Spam and Potato Stir-Fry.jpg') },
    { id: '14', image: require('./assets/Grilled chicken breast ribs.jpg') },
    { id: '15', image: require('./assets/Stir-fried pork belly kimchi roll.jpg') },
    { id: '16', image: require('./assets/Stir-fried pork neck with soy sauce.jpg') },
    { id: '17', image: require('./assets/Spicy noodle.jpg') },
    { id: '18', image: require('./assets/Spinach tofu soybean paste soup.jpg') },
    { id: '19', image: require('./assets/Detox juice.jpg') },
    { id: '20', image: require('./assets/Stir-fried squid and vegetables.jpg') },
  ];

  const toggleSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleNext = () => {
    if (selectedItems.length < 2) {
      alert('최소 2개를 선택해주세요!');
      return;
    }
    navigation.navigate('SurveyScreenTired'); // 다음 화면으로 이동
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleSelection(item.id)}
      style={
        selectedItems.includes(item.id)
          ? [styles.foodItem, styles.foodItemSelected]
          : styles.foodItem
      }
    >
      <Image source={item.image} style={styles.foodImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 질문 텍스트 */}
      <Text style={styles.questionText}>홍길동님은 <Text style={styles.highlight}>심심할</Text> 때 주로{'\n'} 어떤 음식을 먹나요?</Text>
      <Text style={styles.subtitle}>최소 2개 선택</Text>

      {/* 음식 이미지 그리드 */}
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.foodGrid}
      />

      {/* 다음 버튼 */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
    alignItems: 'center',

  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  highlight: {
    color: '#FA8815',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
  foodGrid: {
    justifyContent: 'center',
  },
  foodItem: {
    margin: 5,
    borderWidth: 4,
    borderColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  foodItemSelected: {
    borderColor: '#FF6B6B',
  },
  foodImage: {
    width: 70,
    height: 70,
  },
  nextButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 70,
    marginTop: -20,
    width: 200,
    alignItems: 'center', 
  },
  nextButtonText: {
    color: '#000',
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  navIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  navIcon1: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginTop: 5
  },
});

export default SurveyScreenBored;
