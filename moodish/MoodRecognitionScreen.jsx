import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodRecognitionScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [emotionResult, setEmotionResult] = useState(null);

  const pickFromImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '이미지 선택을 위해 갤러리 접근 권한이 필요합니다.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true, // ✅ base64 포함
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        const base64 = result.assets[0].base64;
        setSelectedImage(selectedUri);
        analyzeEmotion(base64);
      } else {
        console.log('이미지 선택 취소됨');
      }
    } catch (error) {
      console.error('이미지 선택 중 오류:', error);
    }
  };

  const pickFromCamera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('권한 필요', '카메라 접근 권한이 필요합니다.');
    return;
  }

  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // ✅ base64 포함
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;
      const base64 = result.assets[0].base64;
      setSelectedImage(selectedUri);
      analyzeEmotion(base64);
    } else {
      console.log('카메라 촬영 취소됨');
    }
  } catch (error) {
    console.error('카메라 촬영 중 오류:', error);
  }
};
  
  const analyzeEmotion = async (base64Data) => {
    try {
      const response = await axios.post('http://172.30.1.8:5000/analyze_emotion_base64', {
        image: base64Data,
      });

      console.log('응답:', response.data);
      setEmotionResult(response.data);
    } catch (error) {
      console.error('감정 분석 오류:', error.response?.data || error.message);
      setEmotionResult(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Recognition</Text>

      <TouchableOpacity style={styles.button} onPress={pickFromImage}>
        <Text style={styles.buttonText}>🖼️ 갤러리에서 이미지 선택</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={pickFromCamera}>
        <Text style={styles.buttonText}>📸 카메라로 촬영</Text>
      </TouchableOpacity>

      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

      {emotionResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>감정 분석 결과</Text>
          <Text style={styles.resultText}>감정 : {emotionResult.emotion}</Text>
          <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate('MoodSelectionScreen')}
        >
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            감정 수정하기
          </Text>
        </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.homeButton}
        onPress={async () => {
          if (emotionResult && emotionResult.emotion) {
            try {
              await AsyncStorage.setItem('ferResult', emotionResult.emotion);
              navigation.replace('DesiredCookingTime', {
                emotionId: emotionResult.emotion,
              });
            } catch (e) {
              console.error('감정 저장 실패:', e);
            }
          } else {
            alert('감정을 먼저 인식해주세요.');
          }
        }}
      >
        <Text style={styles.homeButtonText}>선택하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginVertical: 5,
  },
  homeButton: {
    marginTop: 30,
    backgroundColor: '#6C95F0',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoodRecognitionScreen;
