import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // 꼭 설치되어 있어야 함
import AsyncStorage from '@react-native-async-storage/async-storage';

const Webcam = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '이미지를 선택하려면 갤러리 접근 권한이 필요합니다.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        await uploadImage(imageUri); // ✅ 업로드 호출 추가
      }
    } catch (error) {
      console.error('이미지 선택 중 오류:', error);
      Alert.alert('오류', '이미지 선택에 실패했습니다.');
    }
  };

  const uploadImage = async (imageUri) => {
  try {
    const username = await AsyncStorage.getItem('username') || 'guest';
    console.log('🔐 AsyncStorage에서 불러온 username:', username);

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    formData.append('username', username);  // ✅ username 포함

    console.log('🚀 서버로 보낼 FormData 준비 완료:', formData);

    const response = await axios.post('http://172.30.1.8:5000/webcam', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('✅ API 응답 도착:', response.data);

    if (response.data) {
      Alert.alert('업로드 완료', '재료 인식이 완료되었습니다!');
      // 필요 시 결과 저장: setDetectedIngredients(response.data.rec_res) 등
    } else {
      Alert.alert('오류', '서버에서 유효한 응답을 받지 못했습니다.');
    }
  } catch (error) {
    console.error('❌ 이미지 업로드 중 오류:', error.message);
    Alert.alert('업로드 실패', `에러: ${error.message}`);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧊 냉장고 재료 등록 🧊</Text>
      <Text style={styles.subtitle}>냉장고 안의 재료들이 잘 보이도록 {"\n"}사진을 찍어주세요!</Text>

      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>사진 선택하기</Text>
      </Pressable>

      {selectedImage && (
        <View style={styles.imageCard}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Text style={styles.imageLabel}>✅ 선택된 사진입니다!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 28,
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#6C95F0',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  imageCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 16,
    marginBottom: 12,
  },
  imageLabel: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },
});

export default Webcam;
