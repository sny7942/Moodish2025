import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileLayout = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        console.log("저장된 사용자 이름:", storedUsername);
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('사용자 이름을 불러오지 못했습니다.', error);
      }
    };
    fetchUsername();
  }, []);

  const handleEmotionRecognition = () => {
    navigation.navigate('MoodRecognitionScreen');
  };

  const handleEmotionSelection = () => {
    navigation.navigate('MoodSelectionScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('./assets/user.png')}
          style={styles.userImage}
        />
        <Text style={styles.username}>{username || '사용자'}</Text>
      </View>
    

      {/* 감정 입력 섹션 */}
      <Text style={styles.emotionTitle}>지금 내 감정은?</Text>

      <View style={styles.emotionExplanationContainer}>
        <View style={styles.explanationBlock}>
          <Text style={styles.explanationTitle}>얼굴표정 인식으로 자동 감정 분석</Text>
          <Text style={styles.explanationText}>얼굴인식 시스템으로 감정을 자동으로 분석해요.</Text>
          <TouchableOpacity style={styles.buttonBlue} onPress={handleEmotionRecognition}>
            <Text style={styles.buttonText}>감정 인식하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.explanationBlock}>
          <Text style={styles.explanationTitle}>이모티콘 선택으로 수동 감정 분석</Text>
          <Text style={styles.explanationText}>내 감정을 이모티콘을 통해 직접 선택할 수 있어요.</Text>
          <TouchableOpacity style={styles.buttonRed} onPress={handleEmotionSelection}>
            <Text style={styles.buttonText}>감정 선택하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.recipeTitle}>자주 쓰는 레시피</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipeContainer}>
        <Image
          source={require('./assets/pasta.png')}
          style={styles.recipeImage}
        />
        <Image
          source={require('./assets/sandwich.png')}
          style={styles.recipeImage}
        />
        <Image
          source={require('./assets/gimbap.png')}
          style={styles.recipeImage}
        />
      </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Webcam')}>
          <Image source={require('./assets/reading glasses.png')} style={styles.navIcon1} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('./assets/home.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RefrigeratorReceipt')}>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 40,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  questionText: {
    fontSize: 18,
    fontStyle: 'italic',
    marginVertical: 10,
  },
  emotionTitle: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  emotionExplanationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  explanationBlock: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  explanationText: {
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
    color: '#555',
  },
  buttonBlue: {
    backgroundColor: '#6C95F0',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonRed: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 25
  },
  recipeContainer: {
    flexDirection: 'row',
  },
  recipeImage: {
    width: 110,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 0,
  },
  navBar: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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

export default ProfileLayout;
